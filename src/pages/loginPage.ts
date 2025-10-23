import { Page, expect } from '@playwright/test';
import { ENV } from '../utils/envHelper';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(ENV.BASE_URL + '/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('#loginButton');
    await expect(this.page.locator('text=Employee Form')).toBeVisible({ timeout: 10000 });
  }
}
