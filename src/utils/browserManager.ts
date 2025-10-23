import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { config } from '../config/config';

export class BrowserManager {
  private static browser: Browser;
  private static context: BrowserContext;
  private static page: Page;

  static async launchBrowser(): Promise<void> {
    const browserType = config.browser.toLowerCase();
    
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

    this.context = await this.browser.newContext();
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
}