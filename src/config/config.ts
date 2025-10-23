import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  baseUrl: process.env.BASE_URL || 'https://example.com',
  username: process.env.USERNAME || 'testuser',
  password: process.env.PASSWORD || 'testpassword',
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS === 'true',
  timeout: parseInt(process.env.TIMEOUT || '30000'),
  parallelWorkers: parseInt(process.env.PARALLEL_WORKERS || '2'),
  reportPath: process.env.REPORT_PATH || 'reports/cucumber-report.html'
};