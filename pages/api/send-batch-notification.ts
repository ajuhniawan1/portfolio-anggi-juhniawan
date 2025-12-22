import type { NextApiRequest, NextApiResponse } from 'next';
import { getVisitorSummary, clearVisitorLogs } from '../../lib/visitorStorage';
import { sendBatchTelegramNotification } from '../../lib/telegramService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify secret token to prevent unauthorized access
  const authToken = req.headers.authorization?.replace('Bearer ', '');
  const expectedToken = process.env.BATCH_NOTIFICATION_SECRET;
  
  if (!expectedToken || authToken !== expectedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const summary = getVisitorSummary();
    
    // Only send if there are visitors
    if (summary.totalVisitors > 0) {
      await sendBatchTelegramNotification(summary);
      
      // Clear logs after successful notification
      clearVisitorLogs();
      
      res.status(200).json({ 
        message: 'Batch notification sent successfully',
        summary: {
          totalVisitors: summary.totalVisitors,
          newVisitors: summary.newVisitors,
          returningVisitors: summary.returningVisitors,
        }
      });
    } else {
      res.status(200).json({ message: 'No visitors to report' });
    }
  } catch (error) {
    console.error('Error sending batch notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
