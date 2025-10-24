// src/setup/global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { config } from '../config/config';

async function globalSetup(config: FullConfig) {
  console.log('\n' + '='.repeat(80));
  console.log('🔐 Starting Global Authentication Setup...');
  console.log('='.repeat(80) + '\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to login page
    console.log(`➤ Navigating to: ${config.baseUrl}`);
    await page.goto(config.baseUrl);

    // Perform login
    console.log('➤ Entering credentials...');
    await page.fill('#username', config.username); // Update selectors
    await page.fill('#password', config.password);
    
    console.log('➤ Clicking login button...');
    await page.click('#login-button');
    
    // Wait for successful login (adjust selector as needed)
    await page.waitForSelector('#dashboard', { timeout: 10000 });
    console.log('✓ Login successful!');

    // Save authentication state
    const authDir = path.join(__dirname, '../../auth');
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    const storageStatePath = path.join(authDir, 'state.json');
    await context.storageState({ path: storageStatePath });
    
    console.log(`✓ Authentication state saved to: ${storageStatePath}`);
    console.log('\n' + '='.repeat(80));
    console.log('✅ Global Authentication Setup Complete!');
    console.log('='.repeat(80) + '\n');

  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

export default globalSetup;