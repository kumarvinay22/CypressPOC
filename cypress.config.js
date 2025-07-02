const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const browserConfig = require('./config/browsers');
const testConfig = require('./test.config');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    specPattern: testConfig.testing.features.length > 0 
      ? testConfig.testing.features 
      : 'features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: testConfig.environment.baseUrl,
    video: testConfig.reporting.video,
    screenshotOnRunFailure: testConfig.reporting.screenshots,
    videosFolder: `${testConfig.reporting.outputDir}/videos`,
    screenshotsFolder: `${testConfig.reporting.outputDir}/screenshots`,
    defaultCommandTimeout: testConfig.testing.timeouts.default,
    pageLoadTimeout: testConfig.testing.timeouts.pageLoad,
    requestTimeout: testConfig.testing.timeouts.request,
    responseTimeout: testConfig.testing.timeouts.response,
    retries: testConfig.runner.retries,
    stepDefinitions: [
      'features/step_definitions/*.js'
    ],
    excludeSpecPattern: [
      '**/node_modules/**'
    ],
    async setupNodeEvents(on, config) {
      // Set TEST_RUNNER for consistency
      process.env.TEST_RUNNER = 'cypress';
      
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
                
                // Configure esbuild to understand we're targeting the browser
                build.initialOptions.platform = 'browser';
                build.initialOptions.target = ['chrome100', 'firefox100', 'safari15'];
              }
            }
          ]
        })
      );
      // Device emulation
      const browser = process.env.BROWSER || testConfig.runner.browser;
      const device = process.env.DEVICE || testConfig.device.type;
      console.log('[CYPRESS CONFIG] Resolved browser:', browser);
      console.log('[CYPRESS CONFIG] Resolved device:', device);
      
      // Apply custom viewport if enabled, otherwise use device preset
      if (testConfig.device.customViewport.enabled) {
        config.viewportWidth = testConfig.device.customViewport.width;
        config.viewportHeight = testConfig.device.customViewport.height;
        console.log('[CYPRESS CONFIG] Using custom viewport:', config.viewportWidth, 'x', config.viewportHeight);
      } else if (browserConfig.cypress[browser]?.devices?.[device]) {
        const deviceConfig = browserConfig.cypress[browser].devices[device];
        config.viewportWidth = deviceConfig.viewportWidth;
        config.viewportHeight = deviceConfig.viewportHeight;
        config.userAgent = deviceConfig.userAgent;
        config.isMobile = deviceConfig.isMobile;
        config.deviceScaleFactor = deviceConfig.deviceScaleFactor;
        console.log('[CYPRESS CONFIG] Using device preset:', device);
      }
      
      // Set environment variables from test config
      config.env = {
        ...config.env,
        ...testConfig.environment.vars,
        TAGS: process.env.TAGS || testConfig.testing.tags
      };
      return config;
    },
  },
});
