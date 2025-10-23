import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BrowserManager } from '../utils/browserManager';
import { CommonPage } from '../pages/commonPage';

When('user selects {string} from {string} dropdown', async function (value: string, selector: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Selecting value from dropdown: ${selector}`);
  await commonPage.selectDropdownByValue(selector, value);
  
  this.attach(`Selected "${value}" from dropdown: ${selector}`, 'text/plain');
  console.log(`   ✓ Selected "${value}" from dropdown: ${selector}`);
});

When('user selects option with label {string} from {string} dropdown', async function (label: string, selector: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Selecting option by label from dropdown: ${selector}`);
  await commonPage.selectDropdownByLabel(selector, label);
  
  this.attach(`Selected option with label "${label}" from dropdown: ${selector}`, 'text/plain');
  console.log(`   ✓ Selected option with label "${label}" from dropdown: ${selector}`);
});

Then('the {string} dropdown should contain the following options:', async function (selector: string, dataTable) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Validating dropdown options: ${selector}`);
  const actualOptions = await commonPage.getDropdownOptions(selector);
  const expectedOptions = dataTable.raw().flat();
  
  this.attach(`Actual options: ${actualOptions.join(', ')}`, 'text/plain');
  this.attach(`Expected options: ${expectedOptions.join(', ')}`, 'text/plain');
  
  for (const expectedOption of expectedOptions) {
    expect(actualOptions).toContain(expectedOption);
    console.log(`   ✓ Option "${expectedOption}" found in dropdown`);
  }
});

Then('the {string} dropdown should have {string} selected', async function (selector: string, expectedValue: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Verifying selected value in dropdown: ${selector}`);
  const selectedValue = await commonPage.getSelectedDropdownValue(selector);
  
  this.attach(`Selected value: "${selectedValue}"`, 'text/plain');
  this.attach(`Expected value: "${expectedValue}"`, 'text/plain');
  expect(selectedValue).toBe(expectedValue);
  
  console.log(`   ✓ Dropdown "${selector}" has "${selectedValue}" selected`);
});

Then('the {string} dropdown should have {int} options', async function (selector: string, expectedCount: number) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Counting dropdown options: ${selector}`);
  const options = await commonPage.getDropdownOptions(selector);
  
  this.attach(`Actual option count: ${options.length}`, 'text/plain');
  this.attach(`Expected option count: ${expectedCount}`, 'text/plain');
  this.attach(`Options: ${options.join(', ')}`, 'text/plain');
  expect(options.length).toBe(expectedCount);
  
  console.log(`   ✓ Dropdown "${selector}" has ${options.length} options`);
});

Then('the {string} dropdown should contain option {string}', async function (selector: string, option: string) {
  const page = BrowserManager.getPage();
  const commonPage = new CommonPage(page);
  
  console.log(`   ➤ Checking if dropdown contains option: ${selector}`);
  const options = await commonPage.getDropdownOptions(selector);
  
  this.attach(`Looking for option: "${option}"`, 'text/plain');
  this.attach(`Available options: ${options.join(', ')}`, 'text/plain');
  expect(options).toContain(option);
  
  console.log(`   ✓ Dropdown "${selector}" contains option: "${option}"`);
});
