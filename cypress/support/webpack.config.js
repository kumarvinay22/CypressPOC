const webpack = require('webpack');
const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// This file provides webpack configuration for Cypress preprocessor
module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.feature'],
    // Configure webpack to resolve Node.js built-in modules
    fallback: {
      "assert": require.resolve('assert/'),
      "buffer": require.resolve('buffer/'),
      "crypto": require.resolve('crypto-browserify'),
      "constants": require.resolve('constants-browserify'),
      "events": require.resolve('events/'),
      "fs": require.resolve('browserify-fs'),
      "http": require.resolve('stream-http'),
      "https": require.resolve('https-browserify'),
      "module": require.resolve('module/'),
      "os": require.resolve('os-browserify'),
      "path": require.resolve('path-browserify'),
      "stream": require.resolve('stream-browserify'),
      "tls": require.resolve('browserify-tls'),
      "url": require.resolve('url/'),
      "util": require.resolve('util/'),
      "zlib": require.resolve('browserify-zlib'),
      // Handle node: prefix imports
      "node:util": require.resolve('util/'),
      "node:path": require.resolve('path-browserify'),
      "node:events": require.resolve('events/'),
      "node:assert": require.resolve('assert/'),
      "node:http": require.resolve('stream-http'),
      "node:https": require.resolve('https-browserify'),
      "node:fs": require.resolve('browserify-fs'),
      "node:url": require.resolve('url/')
    },
    // Add aliases to replace Playwright with empty module
    alias: {
      'playwright': path.resolve(__dirname, 'empty-module.js'),
      'playwright-core': path.resolve(__dirname, 'empty-module.js'),
      '@playwright/test': path.resolve(__dirname, 'empty-module.js')
    }
  },
  module: {
    rules: [
      // Handle .feature files
      {
        test: /\.feature$/,
        use: [
          {
            loader: '@badeball/cypress-cucumber-preprocessor/webpack',
            options: {
              stepDefinitions: path.resolve(__dirname, 'step_definitions/cypress_steps.js'),
              // Exclude step definitions from the Playwright implementation
              excludeStepDefinitionPatterns: [
                '**/features/step_definitions/**',
                '**/features/support/**'
              ]
            }
          }
        ]
      },
      // Add a special rule for Playwright modules
      {
        test: /playwright/,
        use: path.resolve(__dirname, 'empty-module.js')
      }
    ]
  },
  plugins: [
    // Provide polyfills for Node.js globals
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    // Polyfill all Node.js core modules (including node: prefix)
    new NodePolyfillPlugin(),
    // Define process.env variables
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ]
};
