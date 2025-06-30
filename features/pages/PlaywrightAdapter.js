/**
 * Playwright specific implementation of the test adapter
 * This file should NEVER be imported by Cypress
 */
class PlaywrightAdapter {
    constructor() {
        this.driver = 'playwright';
        
        // Access Playwright page from global context
        if (typeof global !== 'undefined' && global.playwrightPage) {
            this.page = global.playwrightPage;
        } else {
            // Try to access the page from the current Cucumber World instance
            try {
                const { currentWorld } = require('@cucumber/cucumber/lib/support_code_library_builder/world');
                if (currentWorld && currentWorld.page) {
                    this.page = currentWorld.page;
                } else {
                    throw new Error('Playwright page object not found in World');
                }
            } catch (e) {
                throw new Error('Playwright page object is not available. Make sure Playwright is initialized properly.');
            }
        }
        
        // Get the expect function from Node's assert
        try {
            const assert = require('assert');
            this.assert = assert;
            // Create a simple expect function that uses assert
            this.expect = (actual) => ({
                toContainText: (expected) => assert(actual.toString().includes(expected), 
                    `Expected "${actual}" to contain "${expected}"`),
                toBeVisible: async () => assert(await actual.isVisible(), 
                    'Expected element to be visible'),
                toHaveValue: (expected) => assert(actual === expected, 
                    `Expected "${actual}" to equal "${expected}"`)
            });
        } catch (e) {
            // Fallback
            console.warn('Failed to load assert module:', e);
            this.expect = (actual) => ({
                toContainText: (expected) => console.log(`Asserting ${actual} contains ${expected}`),
                toBeVisible: async () => console.log('Asserting element is visible'),
                toHaveValue: (expected) => console.log(`Asserting ${actual} equals ${expected}`)
            });
        }
    }

    /**
     * Navigate to a URL
     * @param {string} url - The URL to navigate to 
     */
    async goto(url) {
        await this.page.goto(url);
    }

    /**
     * Get page title
     * @returns {Promise<string>} The page title
     */
    async title() {
        return await this.page.title();
    }

    /**
     * Find an element by selector
     * @param {string} selector - CSS selector
     * @returns {Object} Element handle
     */
    async find(selector) {
        return this.page.locator(selector);
    }

    /**
     * Fill an input field
     * @param {string} selector - CSS selector
     * @param {string} text - Text to enter
     */
    async fill(selector, text) {
        await this.page.fill(selector, text);
    }

    /**
     * Click an element
     * @param {string} selector - CSS selector
     */
    async click(selector) {
        await this.page.click(selector);
    }

    /**
     * Check if element is visible
     * @param {string} selector - CSS selector
     * @returns {Promise<boolean>} True if element is visible
     */
    async isVisible(selector) {
        const element = this.page.locator(selector);
        return await element.isVisible();
    }

    /**
     * Wait for element to be visible
     * @param {string} selector - CSS selector
     * @param {number} timeout - Timeout in ms
     */
    async waitFor(selector, timeout = 10000) {
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }

    /**
     * Check if text exists on page
     * @param {string} selector - CSS selector
     * @param {string} text - Text to look for
     */
    async containsText(selector, text) {
        const element = this.page.locator(selector);
        await this.expect(element).toContainText(text);
    }

    /**
     * Assert that title contains text
     * @param {string} text - Text the title should contain
     */
    async titleShouldContain(text) {
        const title = await this.page.title();
        expect(title).toContain(text);
    }

    /**
     * Assert that current URL contains text
     * @param {string} text - Text the URL should contain
     */
    async urlShouldContain(text) {
        const url = this.page.url();
        expect(url).toContain(text);
    }
}

module.exports = PlaywrightAdapter;
