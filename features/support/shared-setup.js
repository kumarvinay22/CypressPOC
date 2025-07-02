/**
 * Shared setup and utility functions for Cypress
 * Simplified from the original hybrid implementation
 */

// Always return cypress as the test runner
function getTestRunner() {
    return 'cypress';
}

// Expose utilities
module.exports = {
    getTestRunner,
    
    // Helper to check if we're using Cypress (always true now)
    isCypress: () => true,
    isPlaywright: () => false,
    
    // Helper for conditional execution (always returns cypressImpl)
    runnerSpecific: (cypressImpl, playwrightImpl) => {
        return cypressImpl;
    }
};
