/**
 * Playwright-specific implementation of the test adapter
 * This file should never be imported directly by any Cypress code
 */
const TestAdapter = require('./TestAdapter');

class PlaywrightAdapter extends TestAdapter {
    constructor() {
        super();
        this.driver = 'playwright';
        this._page = null;

        // We'll lazily initialize the page when needed
        // This allows the Before hook to set up global.playwrightPage
    }

    /**
     * Getter for page with lazy initialization and retries
     * This ensures we get the page when it's available
     */
    get page() {
        if (this._page) {
            return this._page;
        }
        
        // Check if the global playwrightPage is available
        if (typeof global !== 'undefined' && global.playwrightPage) {
            this._page = global.playwrightPage;
            return this._page;
        } else {
            throw new Error('Playwright page object is not available. Make sure Playwright has been initialized.');
        }
    }

    /**
     * Setter for page
     */
    set page(page) {
        this._page = page;
    }

    async goto(url) {
        const fullUrl = url.startsWith('http') ? url : `https://practicetestautomation.com${url}`;
        return this.page.goto(fullUrl, { waitUntil: 'networkidle' });
    }

    async title() {
        return this.page.title();
    }

    async find(selector) {
        return this.page.locator(selector);
    }

    async fill(selector, text) {
        await this.page.fill(selector, text);
    }

    async click(selector) {
        await this.page.click(selector);
    }

    async isVisible(selector) {
        const element = this.page.locator(selector);
        return element.isVisible();
    }

    async waitFor(selector, options = {}) {
        const timeout = options.timeout || 10000;
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }

    async containsText(selector, text) {
        if (selector === 'body') {
            await this.page.waitForSelector(`text=${text}`, { state: 'visible' });
        } else {
            const element = this.page.locator(selector);
            const content = await element.textContent();
            if (!content || !content.includes(text)) {
                throw new Error(`Expected text "${text}" not found in "${content}"`);
            }
        }
    }
    
    async getCurrentUrl() {
        return this.page.url();
    }
    
    async findNonExistentElement(selector) {
        // This method is meant to fail for screenshot testing
        try {
            await this.page.waitForSelector(`#${selector}`, { timeout: 2000 });
        } catch (e) {
            throw new Error(`Expected to find element "${selector}" but it was not present on the page`);
        }
    }
}

module.exports = PlaywrightAdapter;
