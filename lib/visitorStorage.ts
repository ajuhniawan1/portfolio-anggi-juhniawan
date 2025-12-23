import fs from 'fs';
import path from 'path';

export interface VisitorLog {
  ip: string;
  userAgent?: string;
  referrer?: string;
  pages: { [page: string]: number }; // page: visit count
  firstVisit: string;
  lastVisit: string;
  country?: string;
  city?: string;
}

const LOG_FILE = path.join(process.cwd(), 'logs', 'visitors.json');

// In-memory cache for Vercel serverless (since file system is read-only)
let inMemoryLogs: { [ip: string]: VisitorLog } = {};

// Check if running in Vercel production (read-only file system)
const isVercelProduction = process.env.VERCEL === '1';

// Ensure logs directory exists
function ensureLogDir() {
  if (isVercelProduction) return; // Skip in Vercel
  
  try {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  } catch (error) {
    // Silently fail in read-only environments
    console.log('Could not create log directory (read-only filesystem)');
  }
}

// Read visitor logs
export function readVisitorLogs(): { [ip: string]: VisitorLog } {
  // In Vercel, use in-memory cache
  if (isVercelProduction) {
    return inMemoryLogs;
  }
  
  try {
    ensureLogDir();
    
    if (!fs.existsSync(LOG_FILE)) {
      return {};
    }
    
    const data = fs.readFileSync(LOG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading visitor logs:', error);
    return {};
  }
}

// Write visitor logs
export function writeVisitorLogs(logs: { [ip: string]: VisitorLog }) {
  // In Vercel, update in-memory cache only
  if (isVercelProduction) {
    inMemoryLogs = logs;
    return;
  }
  
  try {
    ensureLogDir();
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing visitor logs:', error);
  }
}

// Add or update visitor
// Returns true if this is a new IP (first visit), false if returning visitor
export function logVisitor(
  ip: string,
  page: string,
  userAgent?: string,
  referrer?: string,
  country?: string,
  city?: string
): boolean {
  const logs = readVisitorLogs();
  const now = new Date().toISOString();
  const isNewVisitor = !logs[ip];
  
  if (logs[ip]) {
    // Update existing visitor
    logs[ip].pages[page] = (logs[ip].pages[page] || 0) + 1;
    logs[ip].lastVisit = now;
    logs[ip].userAgent = userAgent || logs[ip].userAgent;
    logs[ip].referrer = referrer || logs[ip].referrer;
    if (country) logs[ip].country = country;
    if (city) logs[ip].city = city;
  } else {
    // New visitor
    logs[ip] = {
      ip,
      userAgent,
      referrer,
      pages: { [page]: 1 },
      firstVisit: now,
      lastVisit: now,
      country,
      city,
    };
  }
  
  writeVisitorLogs(logs);
  return isNewVisitor;
}

// Get visitor data by IP
export function getVisitorByIP(ip: string): VisitorLog | null {
  const logs = readVisitorLogs();
  return logs[ip] || null;
}

// Clear logs (after sending notification)
export function clearVisitorLogs() {
  ensureLogDir();
  writeVisitorLogs({});
}

// Get summary statistics
export function getVisitorSummary() {
  const logs = readVisitorLogs();
  const visitors = Object.values(logs);
  
  const totalVisitors = visitors.length;
  const newVisitors = visitors.filter(v => v.firstVisit === v.lastVisit).length;
  const returningVisitors = totalVisitors - newVisitors;
  
  const pageVisits: { [page: string]: number } = {};
  visitors.forEach(visitor => {
    Object.entries(visitor.pages).forEach(([page, count]) => {
      pageVisits[page] = (pageVisits[page] || 0) + count;
    });
  });
  
  const countries: { [country: string]: number } = {};
  visitors.forEach(visitor => {
    if (visitor.country) {
      countries[visitor.country] = (countries[visitor.country] || 0) + 1;
    }
  });
  
  return {
    totalVisitors,
    newVisitors,
    returningVisitors,
    pageVisits,
    countries,
    visitors,
  };
}
