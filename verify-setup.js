#!/usr/bin/env node

/**
 * Framework Setup Verification Script
 * This script checks if all dependencies and configurations are properly set up
 */

const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(80));
console.log('🔍 Playwright Cucumber Framework - Setup Verification');
console.log('='.repeat(80) + '\n');

let allChecksPass = true;

// Check functions
function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  console.log(exists ? '✅' : '❌', description);
  if (!exists) allChecksPass = false;
  return exists;
}

function checkNodeModules() {
  const exists = fs.existsSync('node_modules');
  console.log(exists ? '✅' : '❌', 'Dependencies installed (node_modules)');
  if (!exists) {
    console.log('   ⚠️  Run: npm install');
    allChecksPass = false;
  }
  return exists;
}

function checkPackage(packageName) {
  try {
    require.resolve(packageName);
    console.log('✅', `Package installed: ${packageName}`);
    return true;
  } catch (e) {
    console.log('❌', `Package missing: ${packageName}`);
    allChecksPass = false;
    return false;
  }
}

function checkEnvFile() {
  const exists = fs.existsSync('.env');
  console.log(exists ? '✅' : '❌', '.env file exists');
  
  if (exists) {
    const content = fs.readFileSync('.env', 'utf8');
    const requiredVars = ['BASE_URL', 'USERNAME', 'PASSWORD', 'BROWSER'];
    const missingVars = requiredVars.filter(varName => !content.includes(varName));
    
    if (missingVars.length > 0) {
      console.log('   ⚠️  Missing environment variables:', missingVars.join(', '));
      allChecksPass = false;
    } else {
      console.log('   ✓ All required environment variables present');
    }
  } else {
    console.log('   ⚠️  Create .env file with your configuration');
    allChecksPass = false;
  }
  
  return exists;
}

function checkDirectoryStructure() {
  const dirs = [
    'src/config',
    'src/pages',
    'src/steps',
    'src/hooks',
    'src/utils',
    'src/reports',
    'features'
  ];
  
  let allExist = true;
  dirs.forEach(dir => {
    const exists = fs.existsSync(dir);
    if (!exists) {
      console.log('❌', `Directory missing: ${dir}`);
      allChecksPass = false;
      allExist = false;
    }
  });
  
  if (allExist) {
    console.log('✅', 'All directories present');
  }
  
  return allExist;
}

function checkTypeScriptSetup() {
  const tsconfig = checkFile('tsconfig.json', 'TypeScript configuration (tsconfig.json)');
  
  if (tsconfig) {
    try {
      const config = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      if (config.compilerOptions && config.compilerOptions.target) {
        console.log('   ✓ TypeScript configured correctly');
      }
    } catch (e) {
      console.log('   ⚠️  tsconfig.json may have syntax errors');
      allChecksPass = false;
    }
  }
  
  return tsconfig;
}

function checkCucumberSetup() {
  const cucumber = checkFile('cucumber.js', 'Cucumber configuration (cucumber.js)');
  return cucumber;
}

function checkReportsDirectory() {
  if (!fs.existsSync('reports')) {
    fs.mkdirSync('reports', { recursive: true });
    console.log('✅', 'Reports directory created');
  } else {
    console.log('✅', 'Reports directory exists');
  }
  return true;
}

// Run all checks
console.log('📋 Checking Project Structure...\n');
checkDirectoryStructure();

console.log('\n📦 Checking Dependencies...\n');
checkNodeModules();
checkPackage('@cucumber/cucumber');
checkPackage('@playwright/test');
checkPackage('typescript');
checkPackage('dotenv');
checkPackage('multiple-cucumber-html-reporter');

console.log('\n⚙️  Checking Configuration Files...\n');
checkTypeScriptSetup();
checkCucumberSetup();
checkEnvFile();
checkFile('package.json', 'Package configuration (package.json)');

console.log('\n📁 Checking Source Files...\n');
checkFile('src/config/config.ts', 'Configuration loader');
checkFile('src/utils/browserManager.ts', 'Browser manager');
checkFile('src/pages/loginPage.ts', 'Login page object');
checkFile('src/pages/commonPage.ts', 'Common page object');
checkFile('src/hooks/hooks.ts', 'Cucumber hooks');
checkFile('src/steps/loginSteps.ts', 'Login step definitions');
checkFile('src/steps/controlSteps.ts', 'Control step definitions');
checkFile('src/steps/dropdownSteps.ts', 'Dropdown step definitions');
checkFile('src/reports/generate-report.js', 'Report generator');

console.log('\n🧪 Checking Test Files...\n');
checkFile('features/uiValidation.feature', 'UI validation feature file');
checkFile('features/dropdownValidation.feature', 'Dropdown validation feature file');

console.log('\n📊 Checking Reports Setup...\n');
checkReportsDirectory();

console.log('\n' + '='.repeat(80));

if (allChecksPass) {
  console.log('✅ All checks passed! Framework is ready to use.');
  console.log('='.repeat(80));
  console.log('\n🚀 Next Steps:');
  console.log('   1. Update .env file with your application details');
  console.log('   2. Update login selectors in src/pages/loginPage.ts');
  console.log('   3. Run: npm test');
  console.log('   4. Generate report: npm run report');
  console.log('   5. View report: open reports/index.html\n');
  process.exit(0);
} else {
  console.log('❌ Some checks failed. Please fix the issues above.');
  console.log('='.repeat(80));
  console.log('\n🔧 Common Fixes:');
  console.log('   • Run: npm install');
  console.log('   • Run: npx playwright install');
  console.log('   • Create .env file from .env.example');
  console.log('   • Ensure all source files are present\n');
  process.exit(1);
}
