#!/usr/bin/env node

/**
 * Enhanced Test Runner
 * Reads configuration from test.config.js and runs tests accordingly
 */

const { execSync } = require('child_process');
const testConfig = require('./test.config');
const path = require('path');

// Function to display current configuration
function displayConfig() {
    console.log('\n🔧 Current Test Configuration:');
    console.log('=====================================');
    console.log(`Browser: ${testConfig.runner.browser}`);
    console.log(`Mode: ${testConfig.runner.mode}`);
    console.log(`Device: ${testConfig.device.type}`);
    console.log(`Tags: ${testConfig.testing.tags}`);
    console.log(`Retries: ${testConfig.runner.retries.runMode} (run), ${testConfig.runner.retries.openMode} (open)`);
    console.log(`Video: ${testConfig.reporting.video ? '✅' : '❌'}`);
    console.log(`Screenshots: ${testConfig.reporting.screenshots ? '✅' : '❌'}`);
    
    if (testConfig.device.customViewport.enabled) {
        console.log(`Custom Viewport: ${testConfig.device.customViewport.width}x${testConfig.device.customViewport.height}`);
    }
    
    if (testConfig.testing.features.length > 0) {
        console.log(`Features: ${testConfig.testing.features.join(', ')}`);
    } else {
        console.log('Features: All (features/**/*.feature)');
    }
    console.log('=====================================\n');
}

// Function to build Cypress command
function buildCypressCommand(runMode = 'run') {
    let command = `cross-env TEST_RUNNER=cypress CYPRESS_PREPROCESSOR=esbuild`;
    
    // Add environment variables
    command += ` BROWSER=${testConfig.runner.browser}`;
    command += ` DEVICE=${testConfig.device.type}`;
    command += ` TAGS="${testConfig.testing.tags}"`;
    
    // Add cypress command
    if (runMode === 'open') {
        command += ` cypress open`;
    } else {
        command += ` cypress run`;
        command += ` --browser ${testConfig.runner.browser}`;
        
        // Add headed/headless mode
        if (testConfig.runner.mode === 'headed') {
            command += ' --headed';
        }
        
        // Add specific features if configured
        if (testConfig.testing.features.length > 0) {
            const specs = testConfig.testing.features.join(',');
            command += ` --spec "${specs}"`;
        }
    }
    
    return command;
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'run';

// Handle different commands
switch (command) {
    case 'run':
        displayConfig();
        console.log('🚀 Running tests...\n');
        try {
            const cypressCommand = buildCypressCommand('run');
            console.log(`Command: ${cypressCommand}\n`);
            execSync(`${cypressCommand} && npm run report:debug`, { stdio: 'inherit' });
            console.log('\n✅ Tests completed successfully!');
        } catch (error) {
            console.error('\n❌ Tests failed!');
            process.exit(1);
        }
        break;
        
    case 'open':
        displayConfig();
        console.log('🔍 Opening Cypress Test Runner...\n');
        try {
            const cypressCommand = buildCypressCommand('open');
            console.log(`Command: ${cypressCommand}\n`);
            execSync(cypressCommand, { stdio: 'inherit' });
        } catch (error) {
            console.error('\n❌ Failed to open Cypress!');
            process.exit(1);
        }
        break;
        
    case 'config':
        displayConfig();
        break;
        
    case 'help':
        console.log('\n📖 Test Runner Commands:');
        console.log('========================');
        console.log('node run-tests.js run     - Run tests according to test.config.js');
        console.log('node run-tests.js open    - Open Cypress Test Runner');
        console.log('node run-tests.js config  - Display current configuration');
        console.log('node run-tests.js help    - Show this help message');
        console.log('\n💡 Edit test.config.js to change test parameters');
        console.log('💡 Environment variables override config file settings\n');
        break;
        
    default:
        console.error(`❌ Unknown command: ${command}`);
        console.log('Use "node run-tests.js help" for available commands');
        process.exit(1);
}
