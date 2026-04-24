import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

// In-memory store for history and stats
let requestHistory: any[] = [];
let stats = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  avgResponseTime: 0,
};

export const executeProxy = async (req: Request, res: Response, next: NextFunction) => {
  const { url, method = 'GET', headers = {}, body = null } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Basic SSRF Protection: Prevent localhost/private IP access
  try {
    const parsedUrl = new URL(url);
    if (['localhost', '127.0.0.1', '0.0.0.0'].includes(parsedUrl.hostname)) {
       return res.status(403).json({ error: 'Access to local resources is forbidden' });
    }
  } catch (e) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const startTime = Date.now();
  stats.totalRequests++;

  try {
    const response = await axios({
      url,
      method,
      headers: {
        ...headers,
        'User-Agent': 'Monitoring-Hub-Proxy/1.0',
      },
      data: body,
      validateStatus: () => true, // Don't throw on error status
      timeout: 10000, // 10s timeout
    });

    const duration = Date.now() - startTime;
    const logEntry = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      method,
      status: response.status,
      timestamp: Date.now(),
      duration,
      responseSize: JSON.stringify(response.data).length,
    };

    requestHistory.unshift(logEntry);
    if (requestHistory.length > 50) requestHistory.pop();

    if (response.status >= 200 && response.status < 300) {
      stats.successfulRequests++;
    } else {
      stats.failedRequests++;
    }

    // Update avgResponseTime
    stats.avgResponseTime = (stats.avgResponseTime * (stats.totalRequests - 1) + duration) / stats.totalRequests;

    res.json({
      status: response.status,
      headers: response.headers,
      body: response.data,
      duration,
    });
  } catch (error: any) {
    stats.failedRequests++;
    const duration = Date.now() - startTime;
    
    const logEntry = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      method,
      status: 500,
      timestamp: Date.now(),
      duration,
      error: error.message,
    };
    requestHistory.unshift(logEntry);

    res.status(500).json({
      error: 'Proxy request failed',
      message: error.message,
      duration,
    });
  }
};

export const getHistory = (req: Request, res: Response) => {
  res.json(requestHistory);
};

export const getStats = (req: Request, res: Response) => {
  res.json(stats);
};
