/**
 * Step definitions for Cypress testing with Cucumber BDD
 * Simplified from the original hybrid implementation
 */

// Use Cypress Cucumber API
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// Import shared page objects
const LoginPage = require('../pages/LoginPage');
const loginPage = new LoginPage();

Given('I am on the practice test login page', function() {
    loginPage.navigate();
});

Then('I should see the login form', function() {
    loginPage.verifyLoginFormVisible();
});

Then('the page title should contain {string}', function(expectedTitle) {
    loginPage.verifyTitleContains(expectedTitle);
});

When('I enter {string} as username', function(username) {
    loginPage.enterUsername(username);
});

When('I enter {string} as password', function(password) {
    loginPage.enterPassword(password);
});

When('I enter username {string}', function(username) {
    loginPage.enterUsername(username);
});

When('I enter password {string}', function(password) {
    loginPage.enterPassword(password);
});

When('I click the submit button', function() {
    loginPage.clickSubmit();
});

When('I click the login button', function() {
    loginPage.clickSubmit();
});

Then('I should be redirected to the success page', function() {
    loginPage.verifySuccessfulLogin();
});

Then('I should see {string} text', function(expectedText) {
    loginPage.shouldContainText('body', expectedText);
});

Then('I should see an error message', function() {
    loginPage.verifyErrorMessageVisible();
});

Then('I should remain on the login page', function() {
    loginPage.getCurrentUrl().then((currentUrl) => {
        if (!currentUrl.includes('practice-test-login')) {
            throw new Error(`Expected to remain on login page, but was on: ${currentUrl}`);
        }
    });
});

Then('I should see an element with id {string}', function(elementId) {
    loginPage.findNonExistentElement(elementId);
});

Then('I should see the {string} icon which does not exist', function(iconName) {
    loginPage.findNonExistentElement(`${iconName}-icon`);
});

Then('I should see the {string} button which does not exist', function(buttonName) {
    loginPage.findNonExistentElement(`${buttonName}-button`);
});

Then('I should see the {string} panel which does not exist', function(panelName) {
    loginPage.findNonExistentElement(`${panelName}-panel`);
});

module.exports = {
    Given,
    When,
    Then,
    loginPage
};
