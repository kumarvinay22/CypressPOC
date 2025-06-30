/**
 * Factory for creating the appropriate test adapter based on environment
 * This file should NOT import Playwright or any Node.js modules directly
 */

const CypressAdapter = require('../pages/CypressAdapter');

/**
 * Creates the appropriate test adapter based on the current test environment
 * @returns {Object} The test adapter instance
 */
function createAdapter() {
    // Determine if we're in Cypress or not
    if (typeof Cypress !== 'undefined') {
        return new CypressAdapter();
    }
    
    // If we're not in Cypress, dynamically load the Playwright adapter
    // This prevents Cypress from bundling Playwright code
    try {
        // We use require here dynamically, so it's not part of the static imports
        // This ensures Cypress won't try to bundle the PlaywrightAdapter
        const PlaywrightAdapter = require('../pages/PlaywrightAdapter');
        return new PlaywrightAdapter();
    } catch (e) {
        console.error('Failed to load Playwright adapter:', e);
        throw new Error('Unable to create test adapter for current environment');
    }
}

module.exports = createAdapter;
