/**
 * Cypress-specific implementation of the test adapter
 */
const TestAdapter = require('./TestAdapter');

class CypressAdapter extends TestAdapter {
    constructor() {
        super();
        this.driver = 'cypress';
    }

    async goto(url) {
        cy.visit(url);
        return Promise.resolve();
    }

    async title() {
        return cy.title().then(title => title);
    }

    async find(selector) {
        return cy.get(selector);
    }

    async fill(selector, text) {
        cy.get(selector).clear().type(text);
        return Promise.resolve();
    }

    async click(selector) {
        cy.get(selector).click();
        return Promise.resolve();
    }

    async isVisible(selector) {
        cy.get(selector).should('be.visible');
        return Promise.resolve(true);
    }

    async waitFor(selector, options = {}) {
        const timeout = options.timeout || 10000;
        cy.get(selector, { timeout: timeout }).should('be.visible');
        return Promise.resolve();
    }

    async containsText(selector, text) {
        if (selector === 'body') {
            cy.contains(text).should('be.visible');
        } else {
            cy.get(selector).should('contain', text);
        }
        return Promise.resolve();
    }
    
    async getCurrentUrl() {
        return cy.url().then(url => url);
    }
    
    async findNonExistentElement(selector) {
        // This method is meant to fail for screenshot testing
        cy.get(`#${selector}`).should('be.visible');
        return Promise.resolve();
    }
}

module.exports = CypressAdapter;
