/**
 * World object for Cucumber with Playwright
 * This file sets up the world object with a page instance
 */
const { setWorldConstructor } = require('@cucumber/cucumber');
const playwright = require('playwright');
const browserConfig = require('../../config/browsers');

class PlaywrightWorld {
    constructor(options) {
        this.browser = null;
        this.context = null;
        this.page = null;
        this.attach = options && options.attach ? options.attach : () => {};
    }

    async init() {
        // Initialize browser and page if not already done
        if (!this.browser) {
            const browserType = (process.env.BROWSER || 'chrome').toLowerCase();
            const deviceType = process.env.DEVICE || 'desktop';
            const config = browserConfig.playwright[browserType]?.devices[deviceType];
            if (!config) {
                throw new Error(`Device type ${deviceType} not found in configuration for browser ${browserType}`);
            }
            let browserLauncher;
            if (browserType === 'chrome' || browserType === 'edge') {
                browserLauncher = playwright.chromium;
            } else if (browserType === 'firefox') {
                browserLauncher = playwright.firefox;
            } else if (browserType === 'webkit') {
                browserLauncher = playwright.webkit;
            } else {
                throw new Error(`Unsupported browser: ${browserType}`);
            }
            this.browser = await browserLauncher.launch({
                headless: process.env.HEADED !== 'true'
            });
            this.context = await this.browser.newContext({
                viewport: config.viewport,
                userAgent: config.userAgent,
                deviceScaleFactor: config.deviceScaleFactor,
                isMobile: config.isMobile,
                recordVideo: {
                    dir: 'reports/videos',
                    size: { width: 1280, height: 720 }
                }
            });
            this.page = await this.context.newPage();
            
            // Make the page available globally for the adapter
            global.playwrightPage = this.page;
            
            // Update the adapter with this page if needed
            try {
                const adapterFactory = require('./adapter-factory');
                adapterFactory.updateAdapterPage(this.page);
            } catch (e) {
                console.warn('Could not update adapter page:', e.message);
            }
        }
    }

    async close() {
        // Close browser context and browser
        if (this.page) {
            try {
                await this.page.close();
            } catch (e) {
                // Ignore errors on close
            }
            this.page = null;
        }
        
        if (this.context) {
            try {
                await this.context.close();
            } catch (e) {
                // Ignore errors on close
            }
            this.context = null;
        }
        
        if (this.browser) {
            try {
                await this.browser.close();
            } catch (e) {
                // Ignore errors on close
            }
            this.browser = null;
        }
    }
}

setWorldConstructor(PlaywrightWorld);
