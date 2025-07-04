// Account Opening steps for Cypress
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

const AutomationPracticePage = require('../pages/BankingPage');
const automationPracticePage = new AutomationPracticePage();

Given('I am on {string}', function (url) {
  cy.visit(url);
});

When('I click on {string}', function (buttonText) {
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
});

Then('I should see the result', function () {
  // Example assertion: check for a visible heading or result message
  cy.get('h1, h2, .result, .success, .main-content').should('be.visible');
});
