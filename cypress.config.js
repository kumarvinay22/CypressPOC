const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const browserConfig = require('./config/browsers');
const testConfig = require('./test.config');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    specPattern: 'features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://practicetestautomation.com',
    video: true,
    screenshotOnRunFailure: true,
    videosFolder: 'reports/videos',
    screenshotsFolder: 'reports/screenshots',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    retries: testConfig.retries,
    stepDefinitions: [
      'features/step_definitions/*.js'
    ],
    excludeSpecPattern: [
      '**/node_modules/**'
    ],
    async setupNodeEvents(on, config) {
      process.env.TEST_RUNNER = 'cypress';
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [
            createEsbuildPlugin(config),
            {
              name: 'node-polyfills',
              setup(build) {
                build.onResolve({ filter: /^(fs|path|crypto|http|https|stream|util|os|tls|zlib|net|dns|child_process|module|readline|constants|inspector|async_hooks|http2|v8|node:.*|chromium-bidi.*|worker_threads)$/ }, (args) => {
                  return { path: args.path, external: true };
                });
                build.initialOptions.platform = 'browser';
                build.initialOptions.target = ['chrome100', 'firefox100', 'safari15'];
              }
            }
          ]
        })
      );
      // Device emulation
      const browser = process.env.BROWSER || testConfig.browser;
      const device = process.env.DEVICE || testConfig.device;
      const headed = typeof process.env.HEADED !== 'undefined' ? process.env.HEADED === 'true' : testConfig.headed;
      console.log(`\n[DEBUG] Using browser: ${browser}, device: ${device}, headed: ${headed}`);
      if (browserConfig.cypress[browser]?.devices?.[device]) {
        const deviceConfig = browserConfig.cypress[browser].devices[device];
        console.log(`[DEBUG] Device config:`, deviceConfig);
        config.viewportWidth = deviceConfig.viewportWidth;
        config.viewportHeight = deviceConfig.viewportHeight;
        config.userAgent = deviceConfig.userAgent;
        config.isMobile = deviceConfig.isMobile;
        config.deviceScaleFactor = deviceConfig.deviceScaleFactor;
      }
      // Set environment variables for tags
      config.env = {
        ...config.env,
        TAGS: process.env.TAGS || testConfig.tags
      };
      // Set headed/headless mode for Cypress CLI
      if (!headed) {
        config.browser = browser;
        config.headless = true;
      } else {
        config.browser = browser;
        config.headless = false;
      }
      return config;
    },
  },
});
