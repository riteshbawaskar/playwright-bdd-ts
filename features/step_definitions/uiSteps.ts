import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { ENV } from '../../src/utils/envHelper';
import { LoginPage } from '../../src/pages/loginPage';
import { getPage } from '../support/world';

Given('I am logged into the application', async function () {
  await this.init(); // ensure browser/page is ready
  const page: Page = this.page;
  const login = new LoginPage(page);
  await login.goto();
  await login.login(ENV.USERNAME, ENV.PASSWORD);
});

Given('I am on the {string} page', async function (formName: string) {
  const page: Page = this.page;
  const path = `/${formName.replace(/\s+/g, '')}`;
  await page.goto(ENV.BASE_URL + path);
});

Then('the following fields should be visible:', async function (dataTable: DataTable) {
  const page: Page = this.page;
  for (const row of dataTable.hashes()) {
    const el = page.locator(row.Selector);
    await expect(el, `${row.FieldName} should be visible`).toBeVisible();
  }
});

Then('the field {string} should be required with message {string}', async function (fieldName: string, message: string) {
  const page: Page = this.page;
  const selectorMap: Record<string, string> = {
    'Employee Name': '#empName'
  };
  const input = page.locator(selectorMap[fieldName]);
  await input.fill('');
  await page.keyboard.press('Tab');
  await expect(page.locator(`text=${message}`)).toBeVisible();
});

When('I check the select field {string}', async function (_: string) {
  // placeholder
});

Then('it should contain the following options:', async function (dataTable: DataTable) {
  const page: Page = this.page;
  const select = page.locator('#department');
  const options = await select.locator('option').allInnerTexts();
  const expected = dataTable.raw().flat();
  for (const val of expected) expect(options).toContain(val);
});

When('I select {string} from {string}', async function (value: string, fieldName: string) {
  const page: Page = this.page;
  const selectorMap: Record<string, string> = {
    Department: '#department'
  };
  await page.selectOption(selectorMap[fieldName], value);
});

Then('the following fields should be visible:', async function (dataTable: DataTable) {
  const page: Page = this.page;
  for (const row of dataTable.hashes()) {
    await expect(page.locator(row.Selector), `${row.FieldName} should be visible`).toBeVisible();
  }
});
