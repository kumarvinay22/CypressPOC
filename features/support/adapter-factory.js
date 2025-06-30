/**
 * Adapter factory that works with both Cypress and Playwright
 * This file avoids direct imports of test runner specific code
 */
const { getTestRunner } = require('../support/shared-setup');

// Keep a singleton instance of the adapter
let adapterInstance = null;

/**
 * Creates the appropriate test adapter based on the current test environment
 * This function doesn't directly import Playwright to stay compatible with Cypress
 * 
 * @param {Object} options - Factory options
 * @param {boolean} options.forceNew - Force creation of a new adapter instance
 * @returns {Object} The test adapter instance
 */
function createAdapter(options = {}) {
    const { forceNew = false } = options;
    
    // Return existing instance unless forced to create new one
    if (adapterInstance && !forceNew) {
        return adapterInstance;
    }
    
    const runner = getTestRunner();
    
    if (runner === 'cypress') {
        // Safe to directly require the CypressAdapter
        const CypressAdapter = require('../adapters/CypressAdapter');
        adapterInstance = new CypressAdapter();
    } else {
        // Dynamically load the PlaywrightAdapter
        try {
            // Use dynamic require to avoid static imports
            const PlaywrightAdapter = require('../adapters/PlaywrightAdapter');
            adapterInstance = new PlaywrightAdapter();
        } catch (e) {
            console.error('Failed to load Playwright adapter:', e);
            throw new Error(`Unable to create test adapter: ${e.message}`);
        }
    }
    
    return adapterInstance;
}

/**
 * Updates the page object in the adapter
 * This is useful when the page object is created after the adapter
 * 
 * @param {Object} page - The page object from Playwright
 */
function updateAdapterPage(page) {
    if (adapterInstance && adapterInstance.driver === 'playwright') {
        adapterInstance.page = page;
    }
}

function getAdapter() {
    return createAdapter();
}

module.exports = createAdapter;
module.exports.updateAdapterPage = updateAdapterPage;
module.exports.getAdapter = getAdapter;
