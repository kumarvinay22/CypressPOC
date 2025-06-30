// Custom commands for Cypress tests
const browsers = require('../../config/browsers');

const getDeviceConfig = (browserName) => {
    // Normalize browser name for config lookup
    let normalized = 'chrome';
    if (typeof browserName === 'string') {
        const name = browserName.toLowerCase();
        if (name.includes('chrome')) normalized = 'chrome';
        // Add more mappings if you add more browsers to browsers.cypress
    }
    const deviceType = Cypress.env('DEVICE') || 'desktop';
    return browsers.cypress[normalized][deviceType];
};

before(() => {
    const browserName = Cypress.browser.name.toLowerCase();
    const config = getDeviceConfig(browserName);
    
    if (config) {
        cy.viewport(config.viewportWidth, config.viewportHeight);
    }
});
