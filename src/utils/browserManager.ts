// src/utils/browserManager.ts
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { config } from '../config/config';
import * as path from 'path';
import * as fs from 'fs';

export class BrowserManager {
  private static browser: Browser;
  private static context: BrowserContext;
  private static page: Page;

  static async launchBrowser(useStoredState: boolean = true): Promise<void> {
    const browserType = config.browser.toLowerCase();
    
    // Launch browser
    switch (browserType) {
      case 'firefox':
        this.browser = await firefox.launch({ headless: config.headless });
        break;
      case 'webkit':
        this.browser = await webkit.launch({ headless: config.headless });
        break;
      default:
        this.browser = await chromium.launch({ headless: config.headless });
    }

    // Create context with or without stored state
    const contextOptions: any = {
      viewport: { width: 1920, height: 1080 }
    };

    if (useStoredState) {
      const storageStatePath = path.join(__dirname, '../../auth/state.json');
      
      if (fs.existsSync(storageStatePath)) {
        console.log('   ➤ Loading authentication state from file...');
        contextOptions.storageState = storageStatePath;
      } else {
        console.log('   ⚠️  No authentication state found, will need to login');
      }
    }

    this.context = await this.browser.newContext(contextOptions);
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(config.timeout);
  }

  static async closeBrowser(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }

  static getPage(): Page {
    return this.page;
  }

  static getBrowser(): Browser {
    return this.browser;
  }

  static getContext(): BrowserContext {
    return this.context;
  }

  // Save current state
  static async saveState(filepath?: string): Promise<void> {
    const savePath = filepath || path.join(__dirname, '../../auth/state.json');
    await this.context.storageState({ path: savePath });
    console.log(`   ✓ State saved to: ${savePath}`);
  }
}