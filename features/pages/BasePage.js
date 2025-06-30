/**
 * Base page object using the test adapter pattern
 * This file should NOT import Playwright or any Node.js modules directly
 */
const createAdapter = require('../support/adapter-factory');

class BasePage {
    constructor() {
        this._adapter = null;
        this._driver = null;
    }

    /**
     * Getter for adapter with lazy initialization
     * This ensures the adapter is only created when actually needed,
     * after browser setup is complete
     */
    get adapter() {
        if (!this._adapter) {
            this._adapter = createAdapter();
            this._driver = this._adapter.driver;
        }
        return this._adapter;
    }

    /**
     * Getter for driver name
     */
    get driver() {
        // Make sure adapter is initialized
        return this.adapter.driver;
    }
    
    /**
     * Navigate to a URL
     * @param {string} url - The URL to navigate to
     */
    async navigate(url) {
        await this.adapter.goto(url);
    }
    
    /**
     * Legacy method for backward compatibility
     * @param {string} url - The URL to navigate to
     */
    async visit(url) {
        await this.adapter.goto(url);
    }
    
    /**
     * Type text into an element
     * @param {string} selector - CSS selector
     * @param {string} text - Text to enter
     */
    async type(selector, text) {
        await this.adapter.fill(selector, text);
    }

    /**
     * Click an element
     * @param {string} selector - CSS selector
     */
    async click(selector) {
        await this.adapter.click(selector);
    }

    /**
     * Check if element is visible
     * @param {string} selector - CSS selector 
     */
    async shouldBeVisible(selector) {
        await this.adapter.isVisible(selector);
    }

    /**
     * Check if text exists on the page
     * @param {string} selector - CSS selector
     * @param {string} text - Text to look for
     */
    async shouldContainText(selector, text) {
        await this.adapter.containsText(selector, text);
    }

    /**
     * Check if URL contains text
     * @param {string} urlPart - Text that should be in the URL
     */
    async shouldHaveUrl(urlPart) {
        await this.adapter.urlShouldContain(urlPart);
    }

    /**
     * Check if page title contains text
     * @param {string} expectedTitle - Text that should be in the title
     */
    async getTitle(expectedTitle) {
        const title = await this.adapter.title();
        if (!title.includes(expectedTitle)) {
            throw new Error(`Expected page title to contain "${expectedTitle}" but got "${title}"`);
        }
    }
    
    /**
     * Check current URL
     * @returns {Promise<string>} The current URL
     */
    async getCurrentUrl() {
        return this.adapter.getCurrentUrl();
    }
    
    /**
     * Find a non-existent element (for screenshot testing)
     * @param {string} selector - Element ID/selector
     */
    async findNonExistentElement(selector) {
        await this.adapter.findNonExistentElement(selector);
    }
}

module.exports = BasePage;
