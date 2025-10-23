import { Page } from '@playwright/test';

export class FormPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/employee');
  }
}
