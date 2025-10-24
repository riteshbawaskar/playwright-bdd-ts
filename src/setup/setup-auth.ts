// src/setup/setup-auth.ts
import { chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function setupAuthentication() {
  console.log('\n' + '='.repeat(80));
  console.log('🔐 Setting Up Authentication State...');
  console.log('='.repeat(80) + '\n');

  const baseUrl = process.env.BASE_URL;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log(`➤ Navigating to: ${baseUrl}`);
    await page.goto(baseUrl);

    console.log('➤ Entering credentials...');
    await page.fill('#username', username); // Update selectors
    await page.fill('#password', password);
    
    console.log('➤ Clicking login button...');
    await page.click('#login-button');
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle');
    
    // Verify login successful (adjust selector)
    try {
      await page.waitForSelector('#dashboard', { timeout: 10000 });
      console.log('✓ Login successful!');
    } catch {
      console.log('⚠️  Could not verify login - proceeding anyway');
    }

    // Create auth directory
    const authDir = path.join(__dirname, '../../auth');
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    // Save authentication state
    const storageStatePath = path.join(authDir, 'state.json');
    await context.storageState({ path: storageStatePath });
    
    console.log(`✓ Authentication state saved to: ${storageStatePath}`);
    console.log('\n' + '='.repeat(80));
    console.log('✅ Authentication Setup Complete!');
    console.log('='.repeat(80) + '\n');

  } catch (error) {
    console.error('\n❌ Authentication setup failed:');
    console.error(error);
    process.exit(1);
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

// Run setup
setupAuthentication();