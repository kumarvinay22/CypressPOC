/**
 * Adapter factory for Cypress testing
 * Simplified from the original hybrid implementation
 */

// Keep a singleton instance of the adapter
let adapterInstance = null;

/**
 * Creates the Cypress test adapter
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
    
    // Always use CypressAdapter in this simplified version
    const CypressAdapter = require('../adapters/CypressAdapter');
    adapterInstance = new CypressAdapter();
    
    return adapterInstance;
}

/**
 * Get the current adapter instance
 * @returns {Object} The adapter instance
 */
function getAdapter() {
    return createAdapter();
}

module.exports = createAdapter;
module.exports.getAdapter = getAdapter;
