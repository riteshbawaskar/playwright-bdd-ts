const report = require('multiple-cucumber-html-reporter');
const fs = require('fs-extra');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m'
};

// Print colored console messages
function printColor(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function printSeparator() {
  console.log('='.repeat(80));
}

function printHeader(title) {
  printSeparator();
  printColor(`  ${title}`, colors.bright + colors.cyan);
  printSeparator();
}

// Get metadata for the report
function getMetadata() {
  const platform = process.platform;
  const browserType = process.env.BROWSER || 'chromium';
  const environment = process.env.TEST_ENV || 'TEST';
  const buildNumber = process.env.BUILD_NUMBER || 'Local';
  
  return {
    'App Name': process.env.APP_NAME || 'Test Application',
    'App Version': process.env.APP_VERSION || '1.0.0',
    'Test Environment': environment,
    'Browser': browserType.charAt(0).toUpperCase() + browserType.slice(1),
    'Platform': platform,
    'Node Version': process.version,
    'Build Number': buildNumber,
    'Parallel': process.env.PARALLEL_WORKERS || '2',
    'Executed By': process.env.USER || process.env.USERNAME || 'Unknown',
    'Execution Type': process.env.CI ? 'CI/CD' : 'Local'
  };
}

// Get custom data for the report
function getCustomData() {
  const now = new Date();
  
  return {
    title: 'Execution Info',
    data: [
      { 
        label: 'Project', 
        value: process.env.PROJECT_NAME || 'Playwright Cucumber Framework' 
      },
      { 
        label: 'Release', 
        value: process.env.RELEASE_VERSION || '1.0.0' 
      },
      { 
        label: 'Test Cycle', 
        value: process.env.TEST_CYCLE || 'Regression' 
      },
      { 
        label: 'Execution Start Time', 
        value: now.toLocaleString('en-US', { 
          timeZone: 'UTC',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      },
      {
        label: 'Test Suite',
        value: process.env.TEST_SUITE || 'All Tests'
      },
      {
        label: 'Tags',
        value: process.env.CUCUMBER_TAGS || 'All'
      }
    ]
  };
}

// Analyze test results from JSON
function analyzeResults(jsonPath) {
  try {
    const data = fs.readFileSync(jsonPath, 'utf8');
    const results = JSON.parse(data);
    
    let totalScenarios = 0;
    let passedScenarios = 0;
    let failedScenarios = 0;
    let skippedScenarios = 0;
    let totalSteps = 0;
    let passedSteps = 0;
    let failedSteps = 0;
    let skippedSteps = 0;
    let totalDuration = 0;
    
    results.forEach(feature => {
      feature.elements?.forEach(scenario => {
        totalScenarios++;
        
        let scenarioPassed = true;
        let scenarioSkipped = false;
        
        scenario.steps?.forEach(step => {
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
        
        if (!scenarioPassed && failedSteps > 0) {
          failedScenarios++;
        } else if (scenarioSkipped) {
          skippedScenarios++;
        } else {
          passedScenarios++;
        }
      });
    });
    
    const passPercentage = totalScenarios > 0 
      ? ((passedScenarios / totalScenarios) * 100).toFixed(2) 
      : 0;
    
    return {
      totalScenarios,
      passedScenarios,
      failedScenarios,
      skippedScenarios,
      totalSteps,
      passedSteps,
      failedSteps,
      skippedSteps,
      totalDuration: (totalDuration / 1000000000).toFixed(2), // Convert to seconds
      passPercentage
    };
  } catch (error) {
    printColor(`⚠️  Warning: Could not analyze results - ${error.message}`, colors.yellow);
    return null;
  }
}

// Print test summary
function printSummary(stats) {
  if (!stats) return;
  
  console.log('');
  printHeader('TEST EXECUTION SUMMARY');
  console.log('');
  
  console.log(`  📊 Scenarios:`);
  console.log(`     Total:   ${stats.totalScenarios}`);
  printColor(`     Passed:  ${stats.passedScenarios}`, colors.green);
  printColor(`     Failed:  ${stats.failedScenarios}`, stats.failedScenarios > 0 ? colors.red : colors.green);
  printColor(`     Skipped: ${stats.skippedScenarios}`, colors.yellow);
  console.log('');
  
  console.log(`  📝 Steps:`);
  console.log(`     Total:   ${stats.totalSteps}`);
  printColor(`     Passed:  ${stats.passedSteps}`, colors.green);
  printColor(`     Failed:  ${stats.failedSteps}`, stats.failedSteps > 0 ? colors.red : colors.green);
  printColor(`     Skipped: ${stats.skippedSteps}`, colors.yellow);
  console.log('');
  
  console.log(`  ⏱️  Duration: ${stats.totalDuration} seconds`);
  
  const passPercentage = parseFloat(stats.passPercentage);
  const percentColor = passPercentage >= 90 ? colors.green : 
                       passPercentage >= 70 ? colors.yellow : colors.red;
  printColor(`  ✓ Pass Rate: ${stats.passPercentage}%`, percentColor);
  console.log('');
  printSeparator();
}

// Main function to generate report
function generateReport() {
  try {
    printHeader('CUCUMBER HTML REPORT GENERATOR');
    console.log('');
    
    // Define paths
    const reportsDir = path.resolve(__dirname, '../../reports');
    const jsonReport = path.join(reportsDir, 'cucumber-report.json');
    
    // Check if reports directory exists
    if (!fs.existsSync(reportsDir)) {
      printColor('❌ Error: Reports directory not found!', colors.red);
      console.log(`   Expected: ${reportsDir}`);
      console.log('   Please run tests first: npm test');
      process.exit(1);
    }
    
    // Check if JSON report exists
    if (!fs.existsSync(jsonReport)) {
      printColor('❌ Error: cucumber-report.json not found!', colors.red);
      console.log(`   Expected: ${jsonReport}`);
      console.log('   Please run tests first: npm test');
      process.exit(1);
    }
    
    // Analyze results
    printColor('📊 Analyzing test results...', colors.cyan);
    const stats = analyzeResults(jsonReport);
    
    // Generate HTML report
    printColor('🔨 Generating HTML report...', colors.cyan);
    
    report.generate({
      jsonDir: reportsDir,
      reportPath: reportsDir,
      reportName: 'Cucumber Test Execution Report',
      pageTitle: 'Test Automation Report',
      displayDuration: true,
      displayReportTime: true,
      metadata: getMetadata(),
      customData: getCustomData(),
      customStyle: `
        .cucumber-report {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .navbar-brand {
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
        }
        .passed {
          color: #27ae60 !important;
        }
        .failed {
          color: #e74c3c !important;
        }
        .skipped {
          color: #f39c12 !important;
        }
        .chart-container {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .scenario-container {
          border-left: 4px solid #3498db;
          padding-left: 15px;
          margin: 15px 0;
        }
        .step-passed {
          background-color: #d4edda;
          border-left: 3px solid #28a745;
        }
        .step-failed {
          background-color: #f8d7da;
          border-left: 3px solid #dc3545;
        }
        .step-skipped {
          background-color: #fff3cd;
          border-left: 3px solid #ffc107;
        }
        img {
          max-width: 100%;
          height: auto;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 5px;
          margin: 10px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .screenshot-container {
          margin: 15px 0;
          text-align: center;
        }
        .screenshot-label {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }
      `,
      pageFooter: '<div style="text-align: center; padding: 20px; color: #7f8c8d;"><p>Generated by Playwright Cucumber Framework</p><p>© 2025 - Automated Test Execution Report</p></div>',
      openReportInBrowser: false,
      disableLog: true
    });
    
    console.log('');
    printColor('✅ HTML Report Generated Successfully!', colors.green);
    printSeparator();
    
    // Print file locations
    console.log('');
    console.log('📁 Report Files:');
    console.log(`   Main Report:  ${path.join(reportsDir, 'index.html')}`);
    console.log(`   JSON Report:  ${jsonReport}`);
    console.log('');
    
    console.log('🌐 View Report:');
    const reportPath = path.join(reportsDir, 'index.html');
    console.log(`   file://${reportPath}`);
    console.log('');
    
    printSeparator();
    console.log('');
    console.log('✨ Report Features:');
    console.log('   ✓ Standalone HTML file (shareable)');
    console.log('   ✓ Step-by-step execution logs');
    console.log('   ✓ Screenshots embedded in report');
    console.log('   ✓ Failure analysis with full details');
    console.log('   ✓ Detailed metadata and timings');
    console.log('   ✓ Pass/Fail statistics with charts');
    console.log('   ✓ Browser, platform, and environment info');
    console.log('');
    printSeparator();
    
    // Print summary
    printSummary(stats);
    
    // Exit with appropriate code
    if (stats && stats.failedScenarios > 0) {
      printColor('\n⚠️  Some tests failed. Please review the report.', colors.yellow);
      process.exit(0); // Don't fail on report generation
    } else if (stats && stats.passedScenarios > 0) {
      printColor('\n🎉 All tests passed!', colors.green);
      process.exit(0);
    }
    
  } catch (error) {
    console.error('');
    printColor('❌ Error generating report:', colors.red);
    console.error(`   ${error.message}`);
    console.error('');
    
    if (error.stack) {
      console.error('Stack trace:');
      console.error(error.stack);
    }
    
    console.error('');
    printColor('💡 Troubleshooting:', colors.yellow);
    console.error('   1. Make sure tests have run at least once');
    console.error('   2. Check if cucumber-report.json exists in reports folder');
    console.error('   3. Verify JSON report is valid (not corrupted)');
    console.error('   4. Run: npm test (to generate fresh test results)');
    console.error('');
    
    process.exit(1);
  }
}

// Execute report generation
generateReport();