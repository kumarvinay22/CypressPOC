#!/usr/bin/env node

/**
 * Configuration Switcher
 * Quickly switch between different test configurations
 */

const fs = require('fs');
const path = require('path');
const templates = require('./test.config.templates');

const configFile = path.join(__dirname, 'test.config.js');

function showAvailableConfigs() {
    console.log('\n📋 Available Configurations:');
    console.log('============================');
    console.log('1. desktop-smoke     - Desktop Chrome, Smoke tests');
    console.log('2. iphone-regression - iPhone, Regression tests');
    console.log('3. debug            - Debug mode, Single feature');
    console.log('4. ci               - CI/CD optimized');
    console.log('5. multi-device     - Template for device testing');
    console.log('6. custom           - Create custom configuration');
    console.log('============================\n');
}

function writeConfig(configName, config) {
    const configContent = `/**
 * Central Test Configuration File
 * Control all test execution parameters from this single file
 * Current configuration: ${configName}
 */

module.exports = ${JSON.stringify(config, null, 2)};`;

    fs.writeFileSync(configFile, configContent);
    console.log(`✅ Configuration switched to: ${configName}`);
    console.log(`📁 Updated: ${configFile}\n`);
}

function createCustomConfig() {
    console.log('\n🔧 Custom Configuration Creator');
    console.log('==============================');
    
    // For now, just copy the desktop smoke config as a starting point
    const customConfig = { ...templates.desktopSmokeConfig };
    customConfig.testing.tags = '@custom';
    
    writeConfig('custom', customConfig);
    console.log('💡 Edit test.config.js to customize your configuration');
}

const args = process.argv.slice(2);
const configType = args[0];

if (!configType) {
    showAvailableConfigs();
    console.log('Usage: node switch-config.js <config-name>');
    console.log('Example: node switch-config.js desktop-smoke');
    process.exit(0);
}

switch (configType) {
    case 'desktop-smoke':
    case '1':
        writeConfig('Desktop Smoke Tests', templates.desktopSmokeConfig);
        break;
        
    case 'iphone-regression':
    case '2':
        writeConfig('iPhone Regression Tests', templates.iPhoneRegressionConfig);
        break;
        
    case 'debug':
    case '3':
        writeConfig('Debug Mode', templates.debugConfig);
        break;
        
    case 'ci':
    case '4':
        writeConfig('CI/CD Mode', templates.ciConfig);
        break;
        
    case 'multi-device':
    case '5':
        writeConfig('Multi-Device Template', templates.multiDeviceConfig);
        break;
        
    case 'custom':
    case '6':
        createCustomConfig();
        break;
        
    case 'list':
        showAvailableConfigs();
        break;
        
    default:
        console.error(`❌ Unknown configuration: ${configType}`);
        showAvailableConfigs();
        process.exit(1);
}
