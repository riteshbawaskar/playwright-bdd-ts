# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

```bash
# Install Node.js packages
npm install

# Install Playwright browsers
npx playwright install
```

### Step 2: Configure Your Application (1 minute)

Edit the `.env` file:

```env
BASE_URL=https://your-application-url.com
USERNAME=your_username
PASSWORD=your_password
BROWSER=chromium
HEADLESS=false
```

### Step 3: Update Login Selectors (1 minute)

Edit `src/pages/loginPage.ts`:

```typescript
// Update these selectors to match your login page
private usernameInput = '#username';      // Your username field selector
private passwordInput = '#password';      // Your password field selector
private loginButton = '#login-button';    // Your login button selector
```

### Step 4: Run Your First Test (1 minute)

```bash
# Run tests
npm test

# Generate HTML report
npm run report
```

### Step 5: View the Report

Open `reports/index.html` in your browser!

---

## 📝 Create Your First Test

### 1. Create a Feature File

Create `features/myFirstTest.feature`:

```gherkin
Feature: My First Test

  Background: User Login
    Given user is logged into the application

  Scenario: Verify homepage elements
    Then user should see the "#logo" control
    And user should see the "#menu" control
```

### 2. Run the Test

```bash
npm test
```

### 3. Check the Results

```bash
npm run report
open reports/index.html
```

---

## 🎯 Common Use Cases

### Verify Element Visibility

```gherkin
Scenario: Check if elements are visible
  Then user should see the "#header" control
  And user should see the "#footer" control
  And user should not see the "#admin-panel" control
```

### Validate Dropdown Options

```gherkin
Scenario: Validate country dropdown
  When user navigates to "https://myapp.com/settings"
  Then the "#country-dropdown" dropdown should contain the following options:
    | USA    |
    | Canada |
    | UK     |
```

### Fill Form and Submit

```gherkin
Scenario: Submit contact form
  When user navigates to "https://myapp.com/contact"
  And user enters "John Doe" in "#name" field
  And user enters "john@example.com" in "#email" field
  And user clicks on "#submit-button" control
  Then user should see the "#success-message" control
```

### Verify Button States

```gherkin
Scenario: Verify submit button is disabled
  When user navigates to "https://myapp.com/form"
  Then the "#submit-button" control should be disabled
  When user enters "Test" in "#required-field" field
  Then the "#submit-button" control should be enabled
```

---

## 🔧 Configuration Options

### Browser Selection

In `.env`:
```env
BROWSER=chromium    # or firefox, webkit
```

### Headless Mode

```env
HEADLESS=true    # Run without UI (faster)
HEADLESS=false   # Run with browser UI (debugging)
```

### Parallel Execution

```env
PARALLEL_WORKERS=2    # Number of parallel tests
```

### Timeout Settings

```env
TIMEOUT=30000    # 30 seconds (in milliseconds)
```

---

## 📊 Understanding the Report

### Report Dashboard
- Shows overall pass/fail statistics
- Execution duration
- Visual charts

### Feature View
- Lists all features executed
- Status for each feature
- Scenarios within features

### Scenario Details
- Step-by-step execution
- Screenshots for each step
- Logs and error messages
- Execution time per step

### Attachments
- Screenshots (embedded)
- Console logs
- Error traces
- HTML content (on failure)

---

## 🐛 Debugging Tips

### See What's Happening

Run in non-headless mode:
```env
HEADLESS=false
```

### Check Screenshots

All screenshots are in the HTML report at:
```
reports/index.html
```

### Review Console Logs

The framework prints detailed logs during execution:
```
🎬 Starting Scenario: My Test
📍 Step: Given user is logged into the application
   ➤ Logging into the application...
   ✓ User logged in successfully
   ✅ Screenshot captured
```

### Slow Down Execution

Add waits in your page objects:
```typescript
await page.waitForTimeout(2000);  // Wait 2 seconds
```

---

## 📦 Project Structure at a Glance

```
your-project/
├── features/              # Your test scenarios (.feature files)
├── src/
│   ├── pages/            # Page objects (login, common, etc.)
│   ├── steps/            # Step definitions
│   ├── hooks/            # Before/After hooks
│   └── utils/            # Helper utilities
├── reports/              # Generated HTML reports
└── .env                  # Configuration
```

---

## ✅ Checklist: Before Running Tests

- [ ] `npm install` completed
- [ ] `npx playwright install` completed
- [ ] `.env` file updated with your app URL
- [ ] Login selectors updated in `loginPage.ts`
- [ ] Feature files created
- [ ] Selectors in tests match your application

---

## 🚦 Next Steps

### 1. Add More Tests
Create more `.feature` files in the `features/` folder

### 2. Create Page Objects
Add new page objects in `src/pages/` for different pages

### 3. Add Custom Step Definitions
Create new step definitions in `src/steps/`

### 4. Customize Reporting
Edit `src/reports/generate-report.js` to add custom metadata

### 5. Set Up CI/CD
Integrate with Jenkins, GitLab, or GitHub Actions

---

## 🆘 Getting Help

### Check the Documentation
- `README.md` - Complete framework documentation
- `REPORT_DOCUMENTATION.md` - HTML report details

### Common Issues

**Tests not running?**
- Check if dependencies are installed
- Verify .env configuration
- Ensure Playwright browsers are installed

**Login not working?**
- Verify selectors in `loginPage.ts`
- Check if credentials in `.env` are correct
- Run in non-headless mode to see what's happening

**Report not generating?**
- Ensure tests have run at least once
- Check if `cucumber-report.json` exists in reports folder
- Run `npm run report` manually

**Screenshots not showing?**
- Screenshots are automatically captured
- Check HTML report: `reports/index.html`
- Verify hooks are properly configured

---

## 🎓 Learning Resources

### Playwright
- [Official Docs](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

### Cucumber
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)
- [Best Practices](https://cucumber.io/docs/bdd/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎉 You're Ready!

You now have a fully functional test automation framework. Start writing tests and happy testing! 🚀

```bash
# Quick command reference
npm test              # Run tests
npm run test:parallel # Run in parallel
npm run report        # Generate HTML report
npm run test:report   # Run tests + generate report
```
