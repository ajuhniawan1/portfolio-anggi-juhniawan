import type { NextApiRequest, NextApiResponse } from 'next';
import { logVisitor, getVisitorByIP } from '../../lib/visitorStorage';
import { sendVisitorNotification } from '../../lib/telegramService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { page } = req.body;

    // Get visitor information
    const ip = getClientIP(req);
    const userAgent = req.headers['user-agent'];
    const referrer = req.headers['referer'] || 'direct';

    // Get location data from IP (using ipapi.co - free tier)
    let country, city;
    if (ip && ip !== '::1' && ip !== '127.0.0.1') {
      try {
        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        if (locationResponse.ok) {
          const locationData = await locationResponse.json();
          country = locationData.country_name;
          city = locationData.city;
        }
      } catch (error) {
        console.log('Could not fetch location data:', error);
      }
    }

    // Store visitor data
    const isNewVisitor = logVisitor(ip, page, userAgent, referrer, country, city);

    // Always send notification for every activity
    const visitorData = getVisitorByIP(ip);
    if (visitorData) {
      // Send notification (don't wait for it)
      sendVisitorNotification(visitorData, isNewVisitor).catch(console.error);
    }

    res.status(200).json({ message: 'Tracked successfully' });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded
    ? (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0])
    : req.socket.remoteAddress || 'Unknown';

  return ip;
}
