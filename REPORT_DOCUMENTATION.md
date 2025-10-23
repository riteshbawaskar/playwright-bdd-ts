# HTML Report Documentation

## Overview

The framework uses **multiple-cucumber-html-reporter** to generate comprehensive, standalone HTML reports that can be easily shared with stakeholders.

## Report Features

### 1. Standalone HTML Report
- **Single File**: The report is generated as a standalone HTML file (index.html)
- **Shareable**: Can be attached to emails, uploaded to cloud storage, or shared via any file sharing service
- **No Dependencies**: Opens in any modern web browser without requiring a server
- **Self-Contained**: All screenshots and attachments are embedded in the report

### 2. Step-by-Step Execution Logs
Every step in your test scenarios is logged with:
- Step description
- Execution status (Passed/Failed/Skipped)
- Execution duration
- Screenshots captured during execution
- Custom attachments (logs, HTML content, etc.)

### 3. Screenshots
The framework captures screenshots:
- **After every step** - Normal viewport screenshot
- **On step failure** - Full page screenshot
- **On scenario failure** - Additional full page screenshot + HTML content

### 4. Report Sections

#### Dashboard
- Total scenarios executed
- Pass/Fail statistics
- Overall execution time
- Visual charts and graphs

#### Features
- List of all feature files executed
- Scenarios within each feature
- Status indicators for each scenario

#### Scenarios
- Detailed view of each scenario
- Step-by-step breakdown
- Screenshots for each step
- Logs and attachments
- Execution timings

#### Metadata
- Application version
- Test environment
- Browser used
- Platform details
- Execution date/time

## Report Generation Process

1. **During Test Execution**:
   - Cucumber generates `cucumber-report.json` with all test data
   - Screenshots are captured and attached to the JSON
   - Logs are added as text attachments

2. **After Test Execution**:
   - Run `npm run report`
   - The script reads `cucumber-report.json`
   - Processes all attachments and embeds them in HTML
   - Generates `index.html` in the reports folder

## Viewing the Report

### Local Viewing
```bash
# Option 1: Open directly
open reports/index.html

# Option 2: Using a simple HTTP server
npx http-server reports -o
```

### Sharing the Report

#### Method 1: Email Attachment
Simply attach the `reports/index.html` file to your email

#### Method 2: Cloud Storage
Upload to:
- Google Drive
- Dropbox
- OneDrive
- AWS S3
- Any file hosting service

#### Method 3: CI/CD Integration
- Configure your CI/CD pipeline to archive the reports folder
- Most CI tools (Jenkins, GitLab CI, GitHub Actions) have artifact storage
- Reports can be accessed directly from build results

## Report Customization

### Metadata Customization
Edit `src/reports/generate-report.js`:

```javascript
metadata: {
  'App Name': 'Your App Name',
  'App Version': '2.0.0',
  'Test Environment': 'STAGING',
  'Browser': 'Chrome',
  'Platform': 'Windows',
  // Add more custom metadata
}
```

### Custom Data Section
Add additional information:

```javascript
customData: {
  title: 'Run Info',
  data: [
    { label: 'Project', value: 'Your Project' },
    { label: 'Sprint', value: 'Sprint 23' },
    { label: 'Release', value: '2.1.0' },
    { label: 'Team', value: 'QA Team Alpha' }
  ]
}
```

### Custom Styling
Add custom CSS in `generate-report.js`:

```javascript
customStyle: `
  .navbar-brand {
    font-size: 24px;
    font-weight: bold;
    color: #007bff;
  }
  .chart-container {
    background: #f8f9fa;
  }
`
```

## Report Structure

```
reports/
├── index.html                    # Main report (open this)
├── features/
│   ├── feature-1.html           # Individual feature reports
│   └── feature-2.html
└── cucumber-report.json          # Raw JSON data
```

## Best Practices

1. **Always generate reports after test execution**
   ```bash
   npm run test:report
   ```

2. **Archive reports with timestamps**
   ```bash
   mv reports/index.html reports/report-$(date +%Y%m%d-%H%M%S).html
   ```

3. **Clean old reports periodically**
   ```bash
   rm -rf reports/*.json reports/*.html
   ```

4. **Add report generation to CI/CD**
   ```yaml
   # Example for GitHub Actions
   - name: Generate Report
     run: npm run report
   
   - name: Upload Report
     uses: actions/upload-artifact@v3
     with:
       name: test-report
       path: reports/index.html
   ```

5. **Review reports after every test run** to catch issues early

## Troubleshooting

### Issue: Report is empty
**Solution**: Ensure tests ran and generated `cucumber-report.json`

### Issue: Screenshots not showing
**Solution**: Check if screenshots are being captured in hooks

### Issue: Report file is too large
**Solution**: 
- Reduce screenshot quality
- Capture screenshots only on failure
- Clean up old screenshots

### Issue: Cannot share report
**Solution**: 
- Check if index.html is in reports folder
- Try zipping the entire reports folder
- Use cloud storage for large files

## Example Report Sections

### Dashboard View
- ✅ Total Scenarios: 10
- ✅ Passed: 8
- ❌ Failed: 2
- ⏭️ Skipped: 0
- ⏱️ Duration: 2m 30s

### Feature View
```
Feature: Application UI Validation
  Scenarios: 5
  Status: ✅ Passed
  Duration: 1m 15s
```

### Scenario View
```
Scenario: Verify control visibility
  Status: ✅ Passed
  Duration: 15s
  
  Steps:
  ✅ Given user is logged into the application (5s)
     📸 Screenshot attached
  ✅ Then user should see the "#submit-button" control (3s)
     📸 Screenshot attached
  ✅ And the "#submit-button" control should be enabled (2s)
     📸 Screenshot attached
```

## Advanced Features

### Parallel Execution Support
Reports from parallel test runs are automatically merged into a single report

### Retry Support
Failed scenarios can be retried, and the report shows all attempts

### Tag Filtering
Reports show which tags were used in test execution

### Device/Browser Matrix
If running tests on multiple browsers, report shows results for each

## Report Analytics

The report provides insights into:
- Most common failures
- Slowest scenarios
- Test execution trends
- Pass rate over time (if historical data available)

## Integration Examples

### Jenkins Integration
```groovy
post {
  always {
    publishHTML([
      reportDir: 'reports',
      reportFiles: 'index.html',
      reportName: 'Test Execution Report'
    ])
  }
}
```

### GitLab CI Integration
```yaml
artifacts:
  when: always
  paths:
    - reports/index.html
  expire_in: 30 days
```

### GitHub Actions Integration
```yaml
- name: Upload Test Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: cucumber-report
    path: reports/index.html
    retention-days: 30
```

## Conclusion

The HTML report is a powerful tool for:
- Debugging test failures
- Sharing results with team members
- Tracking test execution history
- Identifying flaky tests
- Demonstrating test coverage

Keep the report accessible and review it regularly to maintain test quality!
