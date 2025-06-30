const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const browserConfig = require('./config/browsers');
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
    retries: {
      runMode: 2,
      openMode: 0
    },
    stepDefinitions: [
      'features/step_definitions/*.js'
    ],
    excludeSpecPattern: [
      '**/node_modules/**',
      'features/step_definitions/**',     // Exclude Playwright step definitions
      'features/step_implementations/**', // Exclude shared implementations
      'features/support/**',             // Exclude Playwright support files
      'playwright/**',                   // Exclude all Playwright-specific folders
      'cypress/support/step_definitions/temp/**' // Exclude temporary directory
    ],
    async setupNodeEvents(on, config) {
      // Override cucumber preprocessor configuration to ensure ONLY our specific steps are loaded
      config.env = config.env || {};
      
      // Explicitly set TEST_RUNNER for our adapter pattern
      process.env.TEST_RUNNER = 'cypress';
      
      // Ensure only the single unified step definitions file is loaded
      config.env.stepDefinitions = ['features/step_definitions/*.js'];
      
      // Remove any paths that might come from other configs
      if (config.env.commonStepDefinitions) {
        delete config.env.commonStepDefinitions;
      }
      
      // Apply the cucumber plugin with our configuration
      await addCucumberPreprocessorPlugin(on, config);
      
      on(
        'file:preprocessor',
        createBundler({
          plugins: [
            createEsbuildPlugin(config),
            {
              name: 'node-polyfills',
              setup(build) {
                // Mark node builtin modules as external to prevent esbuild from trying to bundle them
                build.onResolve({ filter: /^(fs|path|crypto|http|https|stream|util|os|tls|zlib|net|dns|child_process|module|readline|constants|inspector|async_hooks|http2|v8|node:.*|chromium-bidi.*|worker_threads)$/ }, (args) => {
                  return { path: args.path, external: true };
                });
                
                // Map Playwright adapter and step files to empty module
                build.onResolve({ filter: /PlaywrightAdapter\.js|features[\/\\]step_definitions\/playwright/ }, (args) => {
                  return { path: require.resolve(path.resolve(__dirname, 'cypress/support/empty-module.js')) };
                });
                
                // Replace any dynamic imports of Playwright with empty module
                build.onResolve({ filter: /playwright/ }, (args) => {
                  return { path: require.resolve(path.resolve(__dirname, 'cypress/support/empty-module.js')) };
                });
                
                // Configure esbuild to understand we're targeting the browser
                build.initialOptions.platform = 'browser';
                build.initialOptions.target = ['chrome100', 'firefox100', 'safari15'];
              }
            }
          ]
        })
      );
      // Device emulation
      const browser = process.env.BROWSER || 'chrome';
      const device = process.env.DEVICE || 'iPhone';
      console.log('[CYPRESS CONFIG] Resolved browser:', browser);
      console.log('[CYPRESS CONFIG] Resolved device:', device);
      if (browserConfig.cypress[browser]?.devices?.[device]) {
        const deviceConfig = browserConfig.cypress[browser].devices[device];
        config.viewportWidth = deviceConfig.viewportWidth;
        config.viewportHeight = deviceConfig.viewportHeight;
        config.userAgent = deviceConfig.userAgent;
        config.isMobile = deviceConfig.isMobile;
        config.deviceScaleFactor = deviceConfig.deviceScaleFactor;
      }
      return config;
    },
  },
});
