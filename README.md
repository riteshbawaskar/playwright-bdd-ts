# Playwright Cucumber Test Automation Framework

A comprehensive test automation framework using Playwright, TypeScript, and Cucumber BDD with advanced HTML reporting capabilities.

## Features

- ✅ **Playwright 1.56** for browser automation
- ✅ **TypeScript 5.6.3** for type safety
- ✅ **Cucumber 11.3** BDD framework
- ✅ **Background scenario** for login
- ✅ **Parallel test execution** support
- ✅ **Page Object Model** design pattern
- ✅ **Advanced HTML reporting** with step-by-step logs
- ✅ **Screenshots** for every step and on failure
- ✅ **Standalone HTML report** (can be shared/attached)
- ✅ **Detailed logging** with emojis for better readability
- ✅ **Environment configuration** via .env file
- ✅ **Generic step definitions** for UI validation
- ✅ **Dropdown validation** support

## Project Structure

```
playwright-cucumber-framework/
├── features/
│   ├── uiValidation.feature          # Cucumber feature files
│   └── dropdownValidation.feature    # Dropdown test scenarios
├── src/
│   ├── config/
│   │   └── config.ts                 # Configuration loader
│   ├── hooks/
│   │   └── hooks.ts                  # Cucumber hooks (BeforeStep, AfterStep)
│   ├── pages/
│   │   ├── loginPage.ts              # Login page object
│   │   └── commonPage.ts             # Common page actions
│   ├── steps/
│   │   ├── loginSteps.ts             # Login step definitions
│   │   ├── controlSteps.ts           # Control verification steps
│   │   └── dropdownSteps.ts          # Dropdown validation steps
│   ├── utils/
│   │   ├── browserManager.ts         # Browser management
│   │   └── logger.ts                 # Logging utility
│   └── reports/
│       └── generate-report.js        # Report generation script
├── reports/                           # Generated reports directory
├── .env                               # Environment variables
├── cucumber.js                        # Cucumber configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies

```

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Install Playwright browsers:**
```bash
npx playwright install
```

## Configuration

Update the `.env` file with your application details:

```env
BASE_URL=https://your-application-url.com
USERNAME=your_username
PASSWORD=your_password
BROWSER=chromium
HEADLESS=false
TIMEOUT=30000
PARALLEL_WORKERS=2
```

## Usage

### Run Tests (Sequential)
```bash
npm test
```

### Run Tests (Parallel)
```bash
npm run test:parallel
```

### Run Tests and Generate Report
```bash
npm run test:report
```

### Generate HTML Report Only
```bash
npm run report
```

## HTML Report Features

The framework generates a **comprehensive standalone HTML report** using `multiple-cucumber-html-reporter` with:

✅ **Standalone HTML** - Single file that can be shared via email or attachment  
✅ **Step-by-step logs** - Detailed logs for every step execution  
✅ **Screenshots** - Captured after every step  
✅ **Failure analysis** - Full page screenshots and HTML on failure  
✅ **Execution metadata** - Browser, platform, environment details  
✅ **Timings** - Duration for each scenario and step  
✅ **Pass/Fail statistics** - Visual charts and summaries  
✅ **Attachments** - All screenshots and logs embedded in report  

### Report Location
After running tests, the report is available at:
```
reports/index.html
```

You can open it in any browser or share it with your team!

## Writing Tests

### Feature File Example

```gherkin
Feature: Application UI Validation

  Background: User Login
    Given user is logged into the application

  Scenario: Verify control visibility
    Then user should see the "#submit-button" control
    And the "#submit-button" control should be enabled
```

### Available Step Definitions

#### Login Steps
- `Given user is logged into the application`
- `Given user navigates to "URL"`

#### Control Verification Steps
- `Then user should see the "SELECTOR" control`
- `Then user should not see the "SELECTOR" control`
- `Then the "SELECTOR" control should be enabled`
- `Then the "SELECTOR" control should be disabled`
- `Then the "SELECTOR" control should have text "TEXT"`
- `When user clicks on "SELECTOR" control`
- `When user enters "VALUE" in "SELECTOR" field`

#### Dropdown Steps
- `When user selects "VALUE" from "SELECTOR" dropdown`
- `When user selects option with label "LABEL" from "SELECTOR" dropdown`
- `Then the "SELECTOR" dropdown should contain option "OPTION"`
- `Then the "SELECTOR" dropdown should have "VALUE" selected`
- `Then the "SELECTOR" dropdown should have NUMBER options`
- `Then the "SELECTOR" dropdown should contain the following options:`

## Logging Features

The framework includes comprehensive logging:

- 🎬 Scenario start/end markers
- 📍 Step execution details
- ✅ Step success indicators
- ❌ Failure messages with details
- 📸 Screenshot capture notifications
- 🔗 URL and navigation logging
- ⚠️ Warning messages
- ℹ️ Information messages

### Console Output Example
```
================================================================================
🎬 Starting Scenario: Verify control visibility
================================================================================

📍 Step: Given user is logged into the application
   ➤ Logging into the application...
   ✓ User logged in successfully
   ✅ Screenshot captured
   ✅ Step PASSED

📍 Step: Then user should see the "#submit-button" control
   ➤ Checking visibility of control: #submit-button
   ✓ Control "#submit-button" is visible
   ✅ Screenshot captured
   ✅ Step PASSED

================================================================================
✅ Scenario "Verify control visibility" PASSED
================================================================================
```

## Parallel Execution

Parallel execution is configured in `cucumber.js`:

```javascript
parallel: 2  // Number of parallel workers
```

Or via `.env`:
```env
PARALLEL_WORKERS=2
```

Adjust based on your machine's capacity.

## Reports Directory Structure

After test execution:
```
reports/
├── cucumber-report.json          # Raw JSON report
├── cucumber-report.html          # Basic HTML report
├── index.html                    # Main report (multiple-cucumber-html-reporter)
├── features/                     # Feature-wise reports
└── screenshots/                  # All captured screenshots
```

## Customization

### Update Locators

Update the locators in `src/pages/loginPage.ts`:

```typescript
private usernameInput = '#your-username-selector';
private passwordInput = '#your-password-selector';
private loginButton = '#your-login-button-selector';
```

### Add New Page Objects

Create new page objects in `src/pages/` directory following the existing pattern.

### Add New Step Definitions

Create new step definition files in `src/steps/` directory.

### Customize Report Metadata

Edit `src/reports/generate-report.js` to customize:
- Report title
- Metadata fields
- Custom data
- Report styling

## Screenshot Configuration

Screenshots are captured:
- ✅ After every step (normal screenshot)
- ✅ On step failure (full page screenshot)
- ✅ On scenario failure (full page + HTML content)

To modify screenshot behavior, edit `src/hooks/hooks.ts`

## Troubleshooting

### Issue: Browser not launching
**Solution:** Run `npx playwright install`

### Issue: Module not found errors
**Solution:** Run `npm install`

### Issue: TypeScript errors
**Solution:** Check `tsconfig.json` configuration

### Issue: Tests not running in parallel
**Solution:** Check `cucumber.js` parallel configuration

### Issue: Report not generating
**Solution:** 
1. Ensure tests have run at least once
2. Check if `reports/cucumber-report.json` exists
3. Run `npm run report` manually

### Issue: Screenshots not in report
**Solution:** Ensure steps are using `this.attach()` method in hooks

## Best Practices

1. ✅ Use meaningful selector IDs for better maintainability
2. ✅ Keep step definitions generic and reusable
3. ✅ Use the Background feature for common setup steps
4. ✅ Use data tables for multiple test data scenarios
5. ✅ Review generated HTML reports after each test run
6. ✅ Share standalone HTML reports with stakeholders
7. ✅ Use consistent naming conventions
8. ✅ Add meaningful console logs for debugging
9. ✅ Capture screenshots for important steps
10. ✅ Keep page objects focused and cohesive

## Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Playwright | 1.56.0 | Browser automation |
| Cucumber | 11.3.0 | BDD framework |
| TypeScript | 5.6.3 | Type safety |
| Node.js | 18+ | Runtime environment |
| multiple-cucumber-html-reporter | 3.8.0 | HTML reporting |

## Support

For issues and questions, refer to:
- [Playwright Documentation](https://playwright.dev/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)

## License

ISC
