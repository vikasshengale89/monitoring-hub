import express, { Request, Response } from 'express';
// @ts-ignore
import cors from 'cors';
import helmet from 'helmet';
// @ts-ignore
import morgan from 'morgan';
import dotenv from 'dotenv';
import proxyRoutes from './routes/proxy.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

// Security and Logging
app.use(helmet({
  contentSecurityPolicy: false, // For easier testing of various APIs
}));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || 'http://localhost:4200',
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1', proxyRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

export default app;
