/**
 * Simple Central Test Configuration
 * Edit this file to control test execution
 */

module.exports = {
  // Browser: 'chrome', 'firefox', 'edge'
  browser: 'chrome',

  // Headed mode: true = headed, false = headless
  headed: true,

  // Device: 'desktop', 'iPhone', 'pixel', 'iPad', 'androidTablet'
  device: 'desktop',

  // Cucumber tags to run (e.g. '@smoke', '@regression', '')
  tags: '@smoke',

  // Number of retries for failed tests
  retries: 0,

  // Enable or disable mock data
  mockEnabled: false
};