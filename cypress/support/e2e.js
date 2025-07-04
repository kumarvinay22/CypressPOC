// Cypress e2e support file
import './commands';
import { Before } from '@badeball/cypress-cucumber-preprocessor';
const browserConfig = require('../../config/browsers');
import testConfig from '../../test.config';

// Set a global flag that can be checked to confirm we're in Cypress
window.RUNNER_TYPE = 'cypress';

// Polyfill for node built-in modules in Cypress
// This helps with the "Could not resolve node:util" error
window.process = window.process || require('process');
window.Buffer = window.Buffer || require('buffer').Buffer;

// Add a global variable that Cypress step definitions can check
window.isCypress = true;
window.isPlaywright = false;

before(() => {
    const browserType = 'chrome'; // We're using Chrome for all device testing
    const deviceType = Cypress.env('DEVICE') || 'iPhone';
    
    const config = browserConfig.cypress[browserType].devices[deviceType];
    if (!config) {
        throw new Error(`Device type ${deviceType} not found in configuration`);
    }
    
    Cypress.config('viewportWidth', config.viewportWidth);
    Cypress.config('viewportHeight', config.viewportHeight);

    // Set user agent via Cypress.on('before:browser:launch')
    if (config.userAgent) {
        Cypress.on('before:browser:launch', (browser, launchOptions) => {
            if (browser.name === 'chrome') {
                launchOptions.args.push(`--user-agent="${config.userAgent}"`);
            }
            return launchOptions;
        });
    }
});

if (testConfig.mockEnabled) {
  const baseUrl = 'practicetestautomation.com';
  const mocks = require(`../mocks/${baseUrl}.js`);

  beforeEach(() => {
    // Mock login API (example: adjust endpoint as needed)
    cy.intercept('POST', '**/api/login', (req) => {
      if (req.body.password === 'Password123') {
        req.reply(mocks.login.success);
      } else {
        req.reply(mocks.login.failure);
      }
    });
    // Add more intercepts for other endpoints as needed
  });
}
