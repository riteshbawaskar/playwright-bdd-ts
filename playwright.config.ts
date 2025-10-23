import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: process.env.HEADLESS === 'true',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  timeout: 15000
});
