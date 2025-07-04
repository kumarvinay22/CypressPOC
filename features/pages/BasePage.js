/**
 * Base page object using the test adapter pattern
 * This file should only contain Cypress-compatible code
 */
class BasePage {
    /**
     * Navigate to a URL
     * @param {string} url - The URL to navigate to
     */
    async navigate(url) {
        cy.visit(url);
    }
    
    /**
     * Legacy method for backward compatibility
     * @param {string} url - The URL to navigate to
     */
    async visit(url) {
        cy.visit(url);
    }
    
    /**
     * Type text into an element
     * @param {string} selector - CSS selector
     * @param {string} text - Text to enter
     */
    async type(selector, text) {
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
     */
    async shouldBeVisible(selector) {
        cy.get(selector).should('be.visible');
    }

    /**
     * Check if text exists on the page
     * @param {string} selector - CSS selector
     * @param {string} text - Text to look for
     */
    async shouldContainText(selector, text) {
        if (selector === 'body') {
            cy.contains(text).should('be.visible');
        } else {
            cy.get(selector).should('contain', text);
        }
    }

    /**
     * Check if URL contains text
     * @param {string} urlPart - Text that should be in the URL
     */
    async shouldHaveUrl(urlPart) {
        cy.url().should('include', urlPart);
    }

    /**
     * Check if page title contains text
     * @param {string} expectedTitle - Text that should be in the title
     */
    async getTitle(expectedTitle) {
        cy.title().should('include', expectedTitle);
    }
    
    /**
     * Check current URL
     * @returns {Promise<string>} The current URL
     */
    async getCurrentUrl() {
        return cy.url();
    }
    
    /**
     * Find a non-existent element (for screenshot testing)
     * @param {string} selector - Element ID/selector
     */
    async findNonExistentElement(selector) {
        cy.get(`#${selector}`).should('be.visible');
    }
}

module.exports = BasePage;
