/**
 * Shared setup and utility functions for both Cypress and Playwright
 * This file doesn't import any runner-specific code, making it safe to use anywhere
 */

// Determine which test runner is active
function getTestRunner() {
    if (typeof Cypress !== 'undefined') {
        return 'cypress';
    } else if (process.env.TEST_RUNNER === 'playwright') {
        return 'playwright';
    } else {
        // Default to playwright if can't determine
        return 'playwright';
    }
}

// Expose some common utilities
module.exports = {
    getTestRunner,
    
    // Helper to check if we're using a specific runner
    isCypress: () => getTestRunner() === 'cypress',
    isPlaywright: () => getTestRunner() === 'playwright',
    
    // Helper for conditional execution
    runnerSpecific: (cypressImpl, playwrightImpl) => {
        const runner = getTestRunner();
        return runner === 'cypress' ? cypressImpl : playwrightImpl;
    },
    
    // Helper to load runner-specific module only when needed
    requireAdapter: (adapterName) => {
        if (getTestRunner() === 'cypress') {
            return require(`../adapters/CypressAdapter`);
        } else {
            // Dynamically load the Playwright adapter only when needed
            return require(`../adapters/PlaywrightAdapter`);
        }
    }
};
