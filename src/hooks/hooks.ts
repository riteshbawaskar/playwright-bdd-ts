// src/hooks/hooks.ts
import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { BrowserManager } from '../utils/browserManager';
import { AuthHelper } from '../utils/authHelper';

BeforeAll(async function () {
  console.log('='.repeat(80));
  console.log('Starting test execution...');
  console.log('='.repeat(80));
});

Before(async function ({ pickle }) {
  // Launch browser with stored authentication state
  await BrowserManager.launchBrowser(true);
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🎬 Starting Scenario: ${pickle.name}`);
  console.log(`${'='.repeat(80)}\n`);
  
  // Verify if authentication is still valid
  const page = BrowserManager.getPage();
  const isLoggedIn = await AuthHelper.isLoggedIn(page);
  
  if (!isLoggedIn) {
    console.log('   ⚠️  Authentication expired, re-authenticating...');
    const context = BrowserManager.getContext();
    await AuthHelper.loginAndSaveState(page, context);
  } else {
    console.log('   ✓ Using stored authentication state');
  }
  
  this.attach(`Scenario: ${pickle.name}`, 'text/plain');
  this.attach(`Tags: ${pickle.tags.map(tag => tag.name).join(', ')}`, 'text/plain');
});

BeforeStep(async function ({ pickleStep }) {
  const stepText = pickleStep.text;
  console.log(`📍 Step: ${pickleStep.keyword}${stepText}`);
  this.attach(`${pickleStep.keyword}${stepText}`, 'text/plain');
});

AfterStep(async function ({ pickleStep, result }) {
  const page = BrowserManager.getPage();
  const stepText = pickleStep.text;
  
  // Capture screenshot after every step
  try {
    const screenshot = await page.screenshot({ 
      type: 'png',
      fullPage: false 
    });
    this.attach(screenshot, 'image/png');
    console.log(`   ✅ Screenshot captured for step: ${stepText}`);
  } catch (error) {
    console.log(`   ⚠️ Could not capture screenshot: ${error}`);
  }
  
  // Log step result
  if (result.status === Status.PASSED) {
    console.log(`   ✅ Step PASSED\n`);
    this.attach(`Step Status: PASSED`, 'text/plain');
  } else if (result.status === Status.FAILED) {
    console.log(`   ❌ Step FAILED: ${result.message}\n`);
    this.attach(`Step Status: FAILED\nError: ${result.message}`, 'text/plain');
  }
});

After(async function ({ pickle, result }) {
  console.log(`\n${'='.repeat(80)}`);
  
  if (result?.status === Status.FAILED) {
    const page = BrowserManager.getPage();
    
    try {
      const screenshot = await page.screenshot({ 
        type: 'png',
        fullPage: true 
      });
      this.attach(screenshot, 'image/png');
      console.log(`📸 Full page screenshot captured`);
    } catch (error) {
      console.log(`Could not capture screenshot: ${error}`);
    }
    
    console.log(`❌ Scenario "${pickle.name}" FAILED`);
  } else if (result?.status === Status.PASSED) {
    console.log(`✅ Scenario "${pickle.name}" PASSED`);
  }
  
  console.log(`${'='.repeat(80)}\n`);
  
  await BrowserManager.closeBrowser();
});

AfterAll(async function () {
  console.log('='.repeat(80));
  console.log('Test execution completed!');
  console.log('='.repeat(80));
});