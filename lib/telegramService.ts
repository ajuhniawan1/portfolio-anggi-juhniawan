export interface VisitorData {
  ip?: string;
  userAgent?: string;
  referrer?: string;
  page?: string;
  timestamp: string;
  country?: string;
  city?: string;
}

export async function sendTelegramNotification(visitorData: VisitorData): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured');
    return;
  }

  const message = formatVisitorMessage(visitorData);

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
    }
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

function formatVisitorMessage(data: VisitorData): string {
  const { ip, userAgent, referrer, page, timestamp, country, city } = data;

  // Parse user agent for better readability
  const browser = parseBrowser(userAgent);
  const os = parseOS(userAgent);
  const device = parseDevice(userAgent);

  let message = `🔔 <b>New Portfolio Visitor!</b>\n\n`;
  message += `📅 <b>Time:</b> ${new Date(timestamp).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}\n`;
  message += `📄 <b>Page:</b> ${page || 'Unknown'}\n\n`;

  message += `🌐 <b>Location:</b>\n`;
  if (country) message += `   • Country: ${country}\n`;
  if (city) message += `   • City: ${city}\n`;
  if (ip) message += `   • IP: ${ip}\n`;

  message += `\n💻 <b>Device Info:</b>\n`;
  message += `   • Browser: ${browser}\n`;
  message += `   • OS: ${os}\n`;
  message += `   • Device: ${device}\n`;

  if (referrer && referrer !== 'direct') {
    message += `\n🔗 <b>Referrer:</b> ${referrer}`;
  }

  return message;
}

function parseBrowser(userAgent?: string): string {
  if (!userAgent) return 'Unknown';
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
  
  return 'Unknown';
}

function parseOS(userAgent?: string): string {
  if (!userAgent) return 'Unknown';
  
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  
  return 'Unknown';
}

function parseDevice(userAgent?: string): string {
  if (!userAgent) return 'Unknown';
  
  if (userAgent.includes('Mobile')) return 'Mobile';
  if (userAgent.includes('Tablet') || userAgent.includes('iPad')) return 'Tablet';
  
  return 'Desktop';
}

// New visitor notification with aggregated page views
interface VisitorLog {
  ip: string;
  userAgent?: string;
  referrer?: string;
  pages: { [page: string]: number };
  firstVisit: string;
  lastVisit: string;
  country?: string;
  city?: string;
}

export async function sendVisitorNotification(visitor: VisitorLog, isNewVisitor: boolean = true): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured');
    return;
  }

  const message = formatNewVisitorMessage(visitor, isNewVisitor);

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
    }
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

function formatNewVisitorMessage(visitor: VisitorLog, isNewVisitor: boolean): string {
  const { ip, userAgent, referrer, pages, firstVisit, lastVisit, country, city } = visitor;

  const browser = parseBrowser(userAgent);
  const os = parseOS(userAgent);
  const device = parseDevice(userAgent);
  const totalPageViews = Object.values(pages).reduce((a, b) => a + b, 0);

  // Get last visited page (most recent activity)
  const sortedPages = Object.entries(pages)
    .sort((a, b) => b[1] - a[1]);
  
  const lastPage = Object.keys(pages)[Object.keys(pages).length - 1];

  let message = isNewVisitor 
    ? `🆕 <b>New Visitor Detected!</b>\n\n`
    : `🔄 <b>Visitor Activity!</b>\n\n`;
  
  message += `📅 <b>${isNewVisitor ? 'First' : 'Last'} Visit:</b> ${new Date(isNewVisitor ? firstVisit : lastVisit).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}\n`;
  message += `📄 <b>Current Page:</b> ${lastPage}\n\n`;

  message += `🌐 <b>Location:</b>\n`;
  if (country) message += `   • Country: ${country}\n`;
  if (city) message += `   • City: ${city}\n`;
  message += `   • IP: ${ip}\n\n`;

  message += `💻 <b>Device Info:</b>\n`;
  message += `   • Browser: ${browser}\n`;
  message += `   • OS: ${os}\n`;
  message += `   • Device: ${device}\n\n`;

  message += `📊 <b>Activity:</b>\n`;
  message += `   • Total Page Views: ${totalPageViews}\n`;
  
  message += `   • Pages Visited:\n`;
  sortedPages.forEach(([page, count]) => {
    message += `      - ${page} (${count}x)\n`;
  });

  if (referrer && referrer !== 'direct') {
    message += `\n🔗 <b>Referrer:</b> ${referrer}`;
  }

  return message;
}

// Batch notification interface
interface VisitorSummary {
  totalVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  pageVisits: { [page: string]: number };
  countries: { [country: string]: number };
  visitors: Array<{
    ip: string;
    userAgent?: string;
    pages: { [page: string]: number };
    firstVisit: string;
    lastVisit: string;
    country?: string;
    city?: string;
  }>;
}

export async function sendBatchTelegramNotification(summary: VisitorSummary): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured');
    return;
  }

  const message = formatBatchMessage(summary);

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
    }
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

function formatBatchMessage(summary: VisitorSummary): string {
  const now = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  
  let message = `📊 <b>Portfolio Visitor Report</b>\n`;
  message += `📅 ${now}\n\n`;
  
  // Summary stats
  message += `👥 <b>Total Visitors:</b> ${summary.totalVisitors}\n`;
  message += `   • New: ${summary.newVisitors}\n`;
  message += `   • Returning: ${summary.returningVisitors}\n\n`;
  
  // Top pages
  const topPages = Object.entries(summary.pageVisits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  if (topPages.length > 0) {
    message += `📄 <b>Top Pages:</b>\n`;
    topPages.forEach(([page, count]) => {
      message += `   • ${page}: ${count} views\n`;
    });
    message += `\n`;
  }
  
  // Countries
  const topCountries = Object.entries(summary.countries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  if (topCountries.length > 0) {
    message += `🌍 <b>Top Countries:</b>\n`;
    topCountries.forEach(([country, count]) => {
      message += `   • ${country}: ${count} visitors\n`;
    });
    message += `\n`;
  }
  
  // Individual visitors (up to 5)
  if (summary.visitors.length > 0) {
    message += `👤 <b>Visitor Details:</b>\n\n`;
    const visitorsList = summary.visitors.slice(0, 5);
    
    visitorsList.forEach((visitor, index) => {
      const browser = parseBrowser(visitor.userAgent);
      const os = parseOS(visitor.userAgent);
      const totalPageViews = Object.values(visitor.pages).reduce((a, b) => a + b, 0);
      const isNew = visitor.firstVisit === visitor.lastVisit;
      
      message += `${index + 1}. ${isNew ? '🆕' : '🔄'} ${visitor.ip}\n`;
      if (visitor.country) message += `   📍 ${visitor.city ? visitor.city + ', ' : ''}${visitor.country}\n`;
      message += `   💻 ${browser} on ${os}\n`;
      message += `   📊 ${totalPageViews} page views\n`;
      
      const topVisitedPages = Object.entries(visitor.pages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      message += `   📄 Pages: ${topVisitedPages.map(([page, count]) => `${page} (${count})`).join(', ')}\n\n`;
    });
    
    if (summary.visitors.length > 5) {
      message += `... and ${summary.visitors.length - 5} more visitors\n`;
    }
  }
  
  return message;
}
