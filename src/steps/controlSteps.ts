import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BrowserManager } from '../utils/browserManager';
import { CommonPage } from '../pages/commonPage';

Then('user should see the {string} control', async function (selector: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Checking visibility of control: ${selector}`);
  const isVisible = await commonPage.isElementVisible(selector);
  
  this.attach(`Control "${selector}" visibility: ${isVisible}`, 'text/plain');
  expect(isVisible).toBeTruthy();
  
  console.log(`   ✓ Control "${selector}" is visible`);
});

Then('user should not see the {string} control', async function (selector: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Verifying control is not visible: ${selector}`);
  const isVisible = await commonPage.isElementVisible(selector);
  
  this.attach(`Control "${selector}" visibility: ${isVisible}`, 'text/plain');
  expect(isVisible).toBeFalsy();
  
  console.log(`   ✓ Control "${selector}" is not visible`);
});

Then('the {string} control should be enabled', async function (selector: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Checking if control is enabled: ${selector}`);
  const isEnabled = await commonPage.isElementEnabled(selector);
  
  this.attach(`Control "${selector}" enabled state: ${isEnabled}`, 'text/plain');
  expect(isEnabled).toBeTruthy();
  
  console.log(`   ✓ Control "${selector}" is enabled`);
});

Then('the {string} control should be disabled', async function (selector: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Checking if control is disabled: ${selector}`);
  const isEnabled = await commonPage.isElementEnabled(selector);
  
  this.attach(`Control "${selector}" enabled state: ${isEnabled}`, 'text/plain');
  expect(isEnabled).toBeFalsy();
  
  console.log(`   ✓ Control "${selector}" is disabled`);
});

Then('the {string} control should have text {string}', async function (selector: string, expectedText: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Verifying text content of control: ${selector}`);
  const actualText = await commonPage.getElementText(selector);
  
  this.attach(`Control "${selector}" text: "${actualText}"`, 'text/plain');
  this.attach(`Expected text: "${expectedText}"`, 'text/plain');
  expect(actualText.trim()).toContain(expectedText);
  
  console.log(`   ✓ Control "${selector}" has text: "${actualText}"`);
});

When('user clicks on {string} control', async function (selector: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Clicking on control: ${selector}`);
  await commonPage.clickElement(selector);
  
  this.attach(`Clicked on control: ${selector}`, 'text/plain');
  console.log(`   ✓ Clicked on control: ${selector}`);
});

When('user enters {string} in {string} field', async function (value: string, selector: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Entering value in field: ${selector}`);
  await commonPage.fillInput(selector, value);
  
  this.attach(`Entered "${value}" in field: ${selector}`, 'text/plain');
  console.log(`   ✓ Entered "${value}" in field: ${selector}`);
});
