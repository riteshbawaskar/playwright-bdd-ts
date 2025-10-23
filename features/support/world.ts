import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { ENV } from '../../src/utils/envHelper';

class PlaywrightWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor() {}

  async init() {
    this.browser = await chromium.launch({ headless: ENV.HEADLESS });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async close() {
    try {
      await this.context?.close();
      await this.browser?.close();
    } catch (e) {
      // ignore
    }
  }
}

setWorldConstructor(PlaywrightWorld);

export function getPage(world: any): Page {
  return world.page;
}
