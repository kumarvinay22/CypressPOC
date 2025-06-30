/**
 * Base TestAdapter for unified test automation (Cypress & Playwright)
 * Provides common interface and utility methods for adapters.
 */
class TestAdapter {
    constructor() {
        // Common properties for all adapters
    }

    // Example: navigation method (to be overridden)
    async navigate(url) {
        throw new Error('navigate() must be implemented by subclass');
    }

    // Example: get page title (to be overridden)
    async getTitle() {
        throw new Error('getTitle() must be implemented by subclass');
    }

    // Add more shared interface methods as needed
}

module.exports = TestAdapter;
