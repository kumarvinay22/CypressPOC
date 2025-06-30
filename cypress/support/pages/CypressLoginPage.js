/**
 * Cypress-specific implementation of the LoginPage
 * This file contains only Cypress code and has no references to Playwright
 */
class CypressLoginPage {
    constructor() {
        // Base URL for the login page
        this.baseUrl = '/practice-test-login/';
        
        // Selectors
        this.selectors = {
            username: '#username',
            password: '#password',
            submitButton: '#submit',
            loginForm: '#login',
            successMessage: '.post-title',
            errorMessage: '#error'
        };
    }

    /**
     * Navigate to login page
     */
    navigate() {
        cy.visit(this.baseUrl);
    }

    /**
     * Get page title and verify it contains expected text
     * @param {string} expectedTitle - Expected title text
     */
    getTitle(expectedTitle) {
        cy.title().should('contain', expectedTitle);
    }

    /**
     * Verify login form is visible
     */
    verifyLoginFormVisible() {
        cy.get(this.selectors.loginForm).should('be.visible');
    }

    /**
     * Enter username
     * @param {string} username - Username to enter
     */
    enterUsername(username) {
        cy.get(this.selectors.username).clear().type(username);
    }

    /**
     * Enter password
     * @param {string} password - Password to enter
     */
    enterPassword(password) {
        cy.get(this.selectors.password).clear().type(password);
    }

    /**
     * Click submit button
     */
    clickSubmit() {
        cy.get(this.selectors.submitButton).click();
    }

    /**
     * Verify success message is displayed
     * @param {string} expectedMessage - Expected success message
     */
    verifySuccessMessage(expectedMessage) {
        cy.get(this.selectors.successMessage).should('contain', expectedMessage);
    }

    /**
     * Verify error message is displayed
     * @param {string} expectedMessage - Expected error message
     */
    verifyErrorMessage(expectedMessage) {
        cy.get(this.selectors.errorMessage).should('contain', expectedMessage);
    }

    /**
     * Complete login process
     * @param {string} username - Username to enter
     * @param {string} password - Password to enter
     */
    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickSubmit();
    }
}

module.exports = CypressLoginPage;
