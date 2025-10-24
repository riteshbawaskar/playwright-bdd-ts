// src/utils/authHelper.ts
import { Page, BrowserContext } from '@playwright/test';
import { config } from '../config/config';
import * as path from 'path';
import * as fs from 'fs';

export class AuthHelper {
  
  // Check if authentication state exists
  static hasStoredAuth(): boolean {
    const storageStatePath = path.join(__dirname, '../../auth/state.json');
    return fs.existsSync(storageStatePath);
  }

  // Perform login and save state
  static async loginAndSaveState(page: Page, context: BrowserContext): Promise<void> {
    console.log('   ➤ Performing login...');
    
    // Navigate to login page
    await page.goto(config.baseUrl);
    
    // Enter credentials (update selectors for your app)
    await page.fill('#username', config.username);
    await page.fill('#password', config.password);
    await page.click('#login-button');
    
    // Wait for successful login
    await page.waitForLoadState('networkidle');
    
    // Save state
    const authDir = path.join(__dirname, '../../auth');
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }
    
    const storageStatePath = path.join(authDir, 'state.json');
    await context.storageState({ path: storageStatePath });
    
    console.log('   ✓ Login successful and state saved');
  }

  // Clear stored authentication state
  static clearStoredAuth(): void {
    const storageStatePath = path.join(__dirname, '../../auth/state.json');
    if (fs.existsSync(storageStatePath)) {
      fs.unlinkSync(storageStatePath);
      console.log('   ✓ Authentication state cleared');
    }
  }

  // Verify if user is logged in
  static async isLoggedIn(page: Page, checkSelector: string = '#user-menu'): Promise<boolean> {
    try {
      await page.waitForSelector(checkSelector, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // Login with different user
  static async loginAs(
    page: Page, 
    context: BrowserContext, 
    username: string, 
    password: string,
    stateFileName?: string
  ): Promise<void> {
    console.log(`   ➤ Logging in as: ${username}`);
    
    await page.goto(config.baseUrl);
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('#login-button');
    await page.waitForLoadState('networkidle');
    
    // Save with custom filename if provided
    if (stateFileName) {
      const authDir = path.join(__dirname, '../../auth');
      const storageStatePath = path.join(authDir, `${stateFileName}.json`);
      await context.storageState({ path: storageStatePath });
      console.log(`   ✓ State saved as: ${stateFileName}.json`);
    }
  }

  // Load specific user state
  static getStatePath(stateFileName: string = 'state'): string {
    return path.join(__dirname, `../../auth/${stateFileName}.json`);
  }
}