// src/steps/loginSteps.ts
import { Given } from '@cucumber/cucumber';
import { BrowserManager } from '../utils/browserManager';
import { AuthHelper } from '../utils/authHelper';
import { LoginPage } from '../pages/loginPage';

// This step now just verifies authentication, doesn't login again
Given('user is logged into the application', async function () {
  const page = BrowserManager.getPage();
  
  console.log('   ➤ Verifying authentication...');
  const isLoggedIn = await AuthHelper.isLoggedIn(page);
  
  if (isLoggedIn) {
    console.log('   ✓ User is already authenticated');
    this.attach('User authenticated via stored state', 'text/plain');
  } else {
    console.log('   ➤ Authentication required, logging in...');
    const context = BrowserManager.getContext();
    await AuthHelper.loginAndSaveState(page, context);
    this.attach('User logged in and state saved', 'text/plain');
  }
  
  this.attach(`Current URL: ${page.url()}`, 'text/plain');
});

Given('user logs in as {string} with password {string}', async function (username: string, password: string) {
  const page = BrowserManager.getPage();
  const context = BrowserManager.getContext();
  
  console.log(`   ➤ Logging in as: ${username}`);
  await AuthHelper.loginAs(page, context, username, password);
  
  this.attach(`Logged in as: ${username}`, 'text/plain');
  console.log(`   ✓ Successfully logged in as: ${username}`);
});

Given('user clears authentication and logs in fresh', async function () {
  const page = BrowserManager.getPage();
  const context = BrowserManager.getContext();
  
  console.log('   ➤ Clearing authentication state...');
  AuthHelper.clearStoredAuth();
  
  console.log('   ➤ Performing fresh login...');
  await AuthHelper.loginAndSaveState(page, context);
  
  this.attach('Fresh login completed', 'text/plain');
  console.log('   ✓ Fresh login successful');
});

Given('user navigates to {string}', async function (url: string) {
  const page = BrowserManager.getPage();
  
  console.log(`   ➤ Navigating to: ${url}`);
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  
  this.attach(`Navigated to: ${url}`, 'text/plain');
  this.attach(`Current URL: ${page.url()}`, 'text/plain');
  
  console.log(`   ✓ Successfully navigated to: ${url}`);
});