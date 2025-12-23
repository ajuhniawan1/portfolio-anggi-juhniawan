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

// In-memory cache for serverless environments (fallback when filesystem is unavailable)
let inMemoryLogs: { [ip: string]: VisitorLog } = {};
let useFileSystem = true; // Try filesystem first, fallback to memory if it fails

// Read visitor logs
export function readVisitorLogs(): { [ip: string]: VisitorLog } {
  // If filesystem is known to be unavailable, use memory immediately
  if (!useFileSystem) {
    return inMemoryLogs;
  }
  
  try {
    if (!fs.existsSync(LOG_FILE)) {
      // Try to ensure directory exists
      const logDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      return {};
    }
    
    const data = fs.readFileSync(LOG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Filesystem not available (e.g., Vercel serverless) - switch to memory mode
    console.log('Using in-memory storage (filesystem unavailable)');
    useFileSystem = false;
    return inMemoryLogs;
  }
}

// Write visitor logs
export function writeVisitorLogs(logs: { [ip: string]: VisitorLog }) {
  // If filesystem is known to be unavailable, use memory immediately
  if (!useFileSystem) {
    inMemoryLogs = logs;
    return;
  }
  
  try {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (error) {
    // Filesystem not available - switch to memory mode
    console.log('Switching to in-memory storage (filesystem unavailable)');
    useFileSystem = false;
    inMemoryLogs = logs;
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
  if (!useFileSystem) {
    inMemoryLogs = {};
    return;
  }
  
  try {
    writeVisitorLogs({});
  } catch (error) {
    console.error('Error clearing visitor logs:', error);
    inMemoryLogs = {};
  }
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
