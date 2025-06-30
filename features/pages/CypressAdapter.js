/**
 * Cypress specific implementation of the test adapter
 */
class CypressAdapter {
    constructor() {
        this.driver = 'cypress';
    }

    /**
     * Navigate to a URL
     * @param {string} url - The URL to navigate to 
     */
    async goto(url) {
        cy.visit(url);
    }

    /**
     * Get page title
     * @returns {Promise<string>} The page title
     */
    async title() {
        return cy.title();
    }

    /**
     * Find an element by selector
     * @param {string} selector - CSS selector
     * @returns {Object} Element handle
     */
    async find(selector) {
        return cy.get(selector);
    }

    /**
     * Fill an input field
     * @param {string} selector - CSS selector
     * @param {string} text - Text to enter
     */
    async fill(selector, text) {
        cy.get(selector).clear().type(text);
    }

    /**
     * Click an element
     * @param {string} selector - CSS selector
     */
    async click(selector) {
        cy.get(selector).click();
    }

    /**
     * Check if element is visible
     * @param {string} selector - CSS selector
     * @returns {Promise<boolean>} True if element is visible
     */
    async isVisible(selector) {
        return cy.get(selector).should('be.visible');
    }

    /**
     * Wait for element to be visible
     * @param {string} selector - CSS selector
     * @param {number} timeout - Timeout in ms
     */
    async waitFor(selector, timeout = 10000) {
        return cy.get(selector, { timeout }).should('be.visible');
    }

    /**
     * Check if text exists on page
     * @param {string} selector - CSS selector
     * @param {string} text - Text to look for
     */
    async containsText(selector, text) {
        return cy.get(selector).should('contain', text);
    }

    /**
     * Assert that title contains text
     * @param {string} text - Text the title should contain
     */
    async titleShouldContain(text) {
        return cy.title().should('include', text);
    }

    /**
     * Assert that current URL contains text
     * @param {string} text - Text the URL should contain
     */
    async urlShouldContain(text) {
        return cy.url().should('include', text);
    }
}

module.exports = CypressAdapter;
