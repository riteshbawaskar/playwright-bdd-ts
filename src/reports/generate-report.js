const reporter = require('cucumber-html-reporter');
const path = require('path');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-html-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '1.0.0',
    'Test Environment': 'TEST',
    'Browser': 'Chrome',
    'Platform': 'Windows 10',
    'Parallel': 'Scenarios',
    'Executed': 'Local'
  },
  failedSummaryReport: true,
};

try {
  reporter.generate(options);
  console.log('HTML Report generated successfully!');
  console.log(`Report location: ${path.resolve(options.output)}`);
} catch (error) {
  console.error('Error generating report:', error);
}
