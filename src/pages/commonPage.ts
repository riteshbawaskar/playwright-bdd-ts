import { Page } from '@playwright/test';

export class CommonPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isElementVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isVisible();
    } catch {
      return false;
    }
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    try {
      return await this.page.locator(selector).isEnabled();
    } catch {
      return false;
    }
  }

  async getElementText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }

  async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  async selectDropdownByValue(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  async selectDropdownByLabel(selector: string, label: string): Promise<void> {
    await this.page.selectOption(selector, { label });
  }

  async getDropdownOptions(selector: string): Promise<string[]> {
    const options = await this.page.locator(`${selector} option`).allTextContents();
    return options;
  }

  async getSelectedDropdownValue(selector: string): Promise<string> {
    return await this.page.locator(selector).inputValue();
  }

  async waitForElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  async getElementCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }
}
