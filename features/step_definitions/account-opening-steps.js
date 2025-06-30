// Account Opening steps for both Cypress and Playwright
const { getTestRunner } = require('../support/shared-setup');
const isCypress = typeof Cypress !== 'undefined' || process.env.TEST_RUNNER === 'cypress';

let Given, When, Then;
if (isCypress) {
  ({ Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor'));
} else {
  ({ Given, When, Then } = require('@cucumber/cucumber'));
  // Only import and set timeout in Node/Playwright
  const { setDefaultTimeout } = require('@cucumber/cucumber');
  setDefaultTimeout(30000); // 30 seconds for all steps
}

const { getAdapter } = require('../support/adapter-factory');
const AutomationPracticePage = require('../pages/BankingPage');
const automationPracticePage = new AutomationPracticePage();

Given('I am on {string}', function (url) {
  if (isCypress) {
    cy.visit(url);
  } else {
    // Playwright/Node.js
    const adapter = getAdapter();
    return adapter.goto(url);
  }
});

When('I click on {string}', function (buttonText) {
  if (isCypress) {
    if (buttonText.toLowerCase() === 'login') {
      cy.wait(5000);
      cy.contains('button, a, input', 'Login', { matchCase: false }).first().click({force:true});
    } else if (buttonText.toLowerCase() === 'signup') {
      cy.wait(5000);
      cy.contains('button, a, input', 'Signup', { matchCase: false }).first().click({force:true});
    } else {
      cy.wait(2000);
      cy.contains('button, a, span, div', buttonText).click();
    }
  } else {
    // Playwright/Node.js
    if (buttonText.toLowerCase() === 'login') {
      return automationPracticePage.clickLogin();
    }
    if (buttonText.toLowerCase() === 'signup') {
      return automationPracticePage.clickSignup();
    }
    const adapter = getAdapter();
    return adapter.wait ? adapter.wait(2000).then(() => {
      return adapter.clickByText ? adapter.clickByText(buttonText) : adapter.click(buttonText);
    }) : (adapter.clickByText ? adapter.clickByText(buttonText) : adapter.click(buttonText));
  }
});

Then('I should see the result', function () {
  if (isCypress) {
    cy.wait(1000);
  } else {
    const adapter = getAdapter();
    return adapter.wait ? adapter.wait(1000) : null;
  }
});
