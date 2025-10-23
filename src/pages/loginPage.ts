import { Page } from '@playwright/test';
import { config } from '../config/config';

export class LoginPage {
  private page: Page;

  // Locators
  private usernameInput = '#username';
  private passwordInput = '#password';
  private loginButton = '#login-button';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToApp(): Promise<void> {
    await this.page.goto(config.baseUrl);
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.click(this.loginButton);
  }

  async login(username?: string, password?: string): Promise<void> {
    await this.navigateToApp();
    await this.enterUsername(username || config.username);
    await this.enterPassword(password || config.password);
    await this.clickLoginButton();
    await this.page.waitForLoadState('networkidle');
  }
}
