/**
 * Common step definitions to be used by both Cypress and Playwright
 * This file provides a unified implementation by dynamically loading the correct
 * Cucumber API based on the runtime environment.
 */

// Use the correct Cucumber API depending on the environment
let Given, When, Then;

// Determine which test runner is active
const { getTestRunner } = require('../support/shared-setup');
const isCypress = getTestRunner() === 'cypress';

if (isCypress) {
    // Cypress runtime
    ({ Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor'));
} else {
    // Playwright or Node.js runtime
    ({ Given, When, Then } = require('@cucumber/cucumber'));
}

// Import shared page objects
const LoginPage = require('../pages/LoginPage');
const loginPage = new LoginPage();

// Helper to branch step logic
function step(fnCypress, fnPlaywright) {
    return isCypress ? fnCypress : fnPlaywright;
}

Given('I am on the practice test login page', step(
    function() {
        loginPage.navigate(); // CypressAdapter uses cy.visit internally
    },
    async function() {
        await loginPage.navigate();
    }
));

Then('I should see the login form', step(
    function() {
        loginPage.verifyLoginFormVisible();
    },
    async function() {
        await loginPage.verifyLoginFormVisible();
    }
));

Then('the page title should contain {string}', step(
    function(expectedTitle) {
        loginPage.getTitle(expectedTitle);
    },
    async function(expectedTitle) {
        await loginPage.getTitle(expectedTitle);
    }
));

When('I enter {string} as username', step(
    function(username) {
        loginPage.enterUsername(username);
    },
    async function(username) {
        await loginPage.enterUsername(username);
    }
));

When('I enter {string} as password', step(
    function(password) {
        loginPage.enterPassword(password);
    },
    async function(password) {
        await loginPage.enterPassword(password);
    }
));

When('I click the submit button', step(
    function() {
        loginPage.clickSubmit();
    },
    async function() {
        await loginPage.clickSubmit();
    }
));

Then('I should be redirected to the success page', step(
    function() {
        loginPage.verifySuccessfulLogin();
    },
    async function() {
        await loginPage.verifySuccessfulLogin();
    }
));

Then('I should see {string} text', step(
    function(expectedText) {
        loginPage.shouldContainText('body', expectedText);
    },
    async function(expectedText) {
        await loginPage.shouldContainText('body', expectedText);
    }
));

Then('I should see an error message', step(
    function() {
        loginPage.verifyErrorMessageVisible();
    },
    async function() {
        await loginPage.verifyErrorMessageVisible();
    }
));

Then('I should remain on the login page', step(
    function() {
        loginPage.getCurrentUrl().then((currentUrl) => {
            if (!currentUrl.includes('practice-test-login')) {
                throw new Error(`Expected to remain on login page, but was on: ${currentUrl}`);
            }
        });
    },
    async function() {
        const currentUrl = await loginPage.getCurrentUrl();
        if (!currentUrl.includes('practice-test-login')) {
            throw new Error(`Expected to remain on login page, but was on: ${currentUrl}`);
        }
    }
));

Then('I should see an element with id {string}', step(
    function(elementId) {
        loginPage.findNonExistentElement(elementId);
    },
    async function(elementId) {
        try {
            await loginPage.findNonExistentElement(elementId);
        } catch (error) {
            throw error;
        }
    }
));

Then('I should see the {string} icon which does not exist', step(
    function(iconName) {
        loginPage.findNonExistentElement(`${iconName}-icon`);
    },
    async function(iconName) {
        await loginPage.findNonExistentElement(`${iconName}-icon`);
    }
));

Then('I should see the {string} button which does not exist', step(
    function(buttonName) {
        loginPage.findNonExistentElement(`${buttonName}-button`);
    },
    async function(buttonName) {
        await loginPage.findNonExistentElement(`${buttonName}-button`);
    }
));

Then('I should see the {string} panel which does not exist', step(
    function(panelName) {
        loginPage.findNonExistentElement(`${panelName}-panel`);
    },
    async function(panelName) {
        await loginPage.findNonExistentElement(`${panelName}-panel`);
    }
));

module.exports = {
    Given,
    When,
    Then,
    loginPage
};
