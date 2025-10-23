import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { BrowserManager } from '../utils/browserManager';

BeforeAll(async function () {
  console.log('Starting test execution...');
});

Before(async function () {
  await BrowserManager.launchBrowser();
  console.log('Browser launched successfully');
});

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    const page = BrowserManager.getPage();
    const screenshot = await page.screenshot({ type: 'png' });
    this.attach(screenshot, 'image/png');
    console.log(`Scenario "${pickle.name}" failed. Screenshot attached.`);
  }
  
  await BrowserManager.closeBrowser();
  console.log('Browser closed');
});

AfterAll(async function () {
  console.log('Test execution completed!');
});
