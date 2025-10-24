const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(80));
console.log('📊 Cucumber HTML Reporter v7.1.0 (Advanced)');
console.log('='.repeat(80) + '\n');

const reportsDir = path.resolve(__dirname, '../../reports');
const jsonFile = path.join(reportsDir, 'cucumber-report.json');
const htmlFile = path.join(reportsDir, 'cucumber-report-advanced.html');

// Check if JSON exists
if (!fs.existsSync(jsonFile)) {
  console.error('❌ Error: cucumber-report.json not found!');
  console.error(`Expected: ${jsonFile}\n`);
  console.error('Please run tests first: npm test\n');
  process.exit(1);
}

console.log('✅ JSON report found');
console.log('🔨 Generating advanced HTML report...\n');

// Advanced options for cucumber-html-reporter@7.1.0
const options = {
  // Input/Output
  theme: 'bootstrap',  // Options: 'bootstrap', 'hierarchy', 'foundation', 'simple'
  jsonFile: jsonFile,
  output: htmlFile,
  
  // Report Settings
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  
  // Metadata
  metadata: {
    'App Name': process.env.APP_NAME || 'Playwright Cucumber Framework',
    'App Version': process.env.APP_VERSION || '1.0.0',
    'Test Environment': process.env.TEST_ENV || 'TEST',
    'Browser': process.env.BROWSER || 'chromium',
    'Platform': process.platform,
    'Node Version': process.version,
    'Parallel Execution': 'Yes (2 workers)',
    'Build Number': process.env.BUILD_NUMBER || 'Local',
    'Executed By': process.env.USER || process.env.USERNAME || 'Tester',
    'Execution Type': process.env.CI ? 'CI/CD Pipeline' : 'Local Development'
  },
  
  // Custom Data
  customData: {
    title: 'Test Execution Info',
    data: [
      {label: 'Project', value: 'Playwright + Cucumber BDD'},
      {label: 'Release', value: process.env.RELEASE || '1.0.0'},
      {label: 'Cycle', value: process.env.TEST_CYCLE || 'Regression'},
      {label: 'Execution Start Time', value: new Date().toLocaleString()},
      {label: 'Test Type', value: 'End-to-End Automation'}
    ]
  },
  
  // Failure Screenshot (if you add screenshots)
  storeScreenshots: false,
  screenshotsDirectory: path.join(reportsDir, 'screenshots'),
  noInlineScreenshots: false,
  
  // Additional options
  columnLayout: 1,  // 1 or 2 column layout
  ignoreBadJsonFile: false
};

try {
  reporter.generate(options);
  
  console.log('✅ HTML Report Generated Successfully!\n');
  console.log('='.repeat(80));
  console.log('📁 Report Details:');
  console.log(`   Location: ${htmlFile}`);
  
  if (fs.existsSync(htmlFile)) {
    const reportStats = fs.statSync(htmlFile);
    console.log(`   Size: ${(reportStats.size / 1024).toFixed(2)} KB`);
  }
  
  console.log('\n🌐 View Report:');
  console.log(`   file://${htmlFile}`);
  
  // Auto-open option
  if (process.argv.includes('--open')) {
    console.log('\n🚀 Opening report in browser...');
    const { exec } = require('child_process');
    const command = process.platform === 'darwin' ? 'open' : 
                    process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${command} ${htmlFile}`);
  }
  
  console.log('='.repeat(80));
  
  // Read JSON to show detailed stats
  try {
    const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    
    let totalFeatures = jsonData.length;
    let totalScenarios = 0;
    let passedScenarios = 0;
    let failedScenarios = 0;
    let skippedScenarios = 0;
    let totalSteps = 0;
    let passedSteps = 0;
    let failedSteps = 0;
    let skippedSteps = 0;
    let totalDuration = 0;
    
    jsonData.forEach(feature => {
      if (feature.elements) {
        feature.elements.forEach(scenario => {
          totalScenarios++;
          let scenarioPassed = true;
          let scenarioSkipped = false;
          
          if (scenario.steps) {
            scenario.steps.forEach(step => {
              totalSteps++;
              
              if (step.result) {
                totalDuration += step.result.duration || 0;
                
                if (step.result.status === 'passed') {
                  passedSteps++;
                } else if (step.result.status === 'failed') {
                  failedSteps++;
                  scenarioPassed = false;
                } else if (step.result.status === 'skipped') {
                  skippedSteps++;
                  scenarioSkipped = true;
                }
              }
            });
          }
          
          if (!scenarioPassed) {
            failedScenarios++;
          } else if (scenarioSkipped) {
            skippedScenarios++;
          } else {
            passedScenarios++;
          }
        });
      }
    });
    
    const durationSeconds = (totalDuration / 1000000000).toFixed(2);
    const passPercentage = totalScenarios > 0 ? ((passedScenarios / totalScenarios) * 100).toFixed(2) : 0;
    
    console.log('\n📊 Detailed Test Summary:');
    console.log('─'.repeat(80));
    console.log('Features:');
    console.log(`   Total:            ${totalFeatures}`);
    console.log('');
    console.log('Scenarios:');
    console.log(`   Total:            ${totalScenarios}`);
    console.log(`   ✅ Passed:        ${passedScenarios} (${passPercentage}%)`);
    console.log(`   ❌ Failed:        ${failedScenarios}`);
    console.log(`   ⏭️  Skipped:       ${skippedScenarios}`);
    console.log('');
    console.log('Steps:');
    console.log(`   Total:            ${totalSteps}`);
    console.log(`   ✅ Passed:        ${passedSteps}`);
    console.log(`   ❌ Failed:        ${failedSteps}`);
    console.log(`   ⏭️  Skipped:       ${skippedSteps}`);
    console.log('');
    console.log('Performance:');
    console.log(`   Total Duration:   ${durationSeconds}s`);
    console.log(`   Avg per Scenario: ${totalScenarios > 0 ? (durationSeconds / totalScenarios).toFixed(2) : 0}s`);
    console.log('─'.repeat(80) + '\n');
    
    if (failedScenarios > 0) {
      console.log('⚠️  Tests completed with failures.');
      console.log(`   Failed: ${failedScenarios} out of ${totalScenarios} scenarios`);
      console.log('   Review the HTML report for details.\n');
      process.exit(1);
    } else if (skippedScenarios > 0) {
      console.log('⚠️  Tests completed with skipped scenarios.');
      console.log(`   Skipped: ${skippedScenarios} out of ${totalScenarios} scenarios\n`);
      process.exit(0);
    } else {
      console.log('🎉 All tests passed!\n');
      process.exit(0);
    }
  } catch (err) {
    console.log('\n');
    process.exit(0);
  }
  
} catch (error) {
  console.error('\n❌ Error generating report:');
  console.error(`   ${error.message}\n`);
  
  if (error.stack) {
    console.error('Stack trace:');
    console.error(error.stack);
    console.error('');
  }
  
  console.error('💡 Troubleshooting:');
  console.error('   1. Verify cucumber-html-reporter@7.1.0 is installed');
  console.error('   2. Check JSON report structure is valid');
  console.error('   3. Ensure tests completed successfully');
  console.error('   4. Run: npm list cucumber-html-reporter\n');
  
  process.exit(1);
}