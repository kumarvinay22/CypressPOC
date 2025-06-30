// This file provides polyfills for Node.js built-in modules when used in Cypress
const path = require('path');

// Map of Node.js built-in modules to their browser polyfill packages
const nodeBuiltinPolyfills = {
  'assert': 'assert',
  'buffer': 'buffer',
  'constants': 'constants-browserify',
  'crypto': 'crypto-browserify',
  'events': 'events',
  'fs': false, // Intentionally disabled - no good browser polyfill
  'http': 'stream-http',
  'https': 'https-browserify',
  'module': false, // Intentionally disabled - no good browser polyfill
  'os': 'os-browserify/browser',
  'path': 'path-browserify',
  'stream': 'stream-browserify',
  'tls': false, // Intentionally disabled - no good browser polyfill
  'url': 'url',
  'util': 'util',
  'zlib': 'browserify-zlib'
};

/**
 * Creates an esbuild plugin that safely handles Node.js built-in module imports
 * by either providing browser-compatible polyfills or empty shims
 * @param {Object} config - The Cypress configuration object
 * @returns {Object} - The esbuild plugin configuration
 */
function createNodePolyfillPlugin(config) {
  return {
    name: 'node-polyfill-plugin',
    setup(build) {
      // Handle node: prefixed imports (Node.js 16+ style)
      Object.keys(nodeBuiltinPolyfills).forEach(mod => {
        build.onResolve({ filter: new RegExp(`^node:${mod}$`) }, args => {
          const polyfill = nodeBuiltinPolyfills[mod];
          
          if (polyfill === false) {
            // For modules with no good browser polyfill, use an empty module
            return { path: path.resolve(__dirname, 'empty-module.js') };
          }
          
          try {
            // Try to resolve the polyfill
            return { path: require.resolve(polyfill) };
          } catch (err) {
            console.warn(`Failed to resolve polyfill for node:${mod}:`, err.message);
            // Fallback to an empty module
            return { path: path.resolve(__dirname, 'empty-module.js') };
          }
        });

        // Handle direct module imports (traditional style)
        build.onResolve({ filter: new RegExp(`^${mod}$`) }, args => {
          const polyfill = nodeBuiltinPolyfills[mod];
          
          if (polyfill === false) {
            // For modules with no good browser polyfill, use an empty module
            return { path: path.resolve(__dirname, 'empty-module.js') };
          }
          
          try {
            // Try to resolve the polyfill
            return { path: require.resolve(polyfill) };
          } catch (err) {
            console.warn(`Failed to resolve polyfill for ${mod}:`, err.message);
            // Fallback to an empty module
            return { path: path.resolve(__dirname, 'empty-module.js') };
          }
        });
      });
    }
  };
}

module.exports = { createNodePolyfillPlugin };
