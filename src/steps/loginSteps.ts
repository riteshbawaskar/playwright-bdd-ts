import { Given } from '@cucumber/cucumber';
import { BrowserManager } from '../utils/browserManager';
import { LoginPage } from '../pages/loginPage';

Given('user is logged into the application', async function () {
  const page = BrowserManager.getPage();
  const loginPage = new LoginPage(page);
  await loginPage.login();
  console.log('User logged in successfully');
});

Given('user navigates to {string}', async function (url: string) {
  const page = BrowserManager.getPage();
  await page.goto(url);
  console.log(`Navigated to: ${url}`);
});
