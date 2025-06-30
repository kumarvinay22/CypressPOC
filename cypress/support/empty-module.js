/**
 * This is an empty module used as a shim for Node.js built-in modules
 * and Playwright modules that don't have browser equivalents.
 * 
 * It returns empty objects/functions to prevent runtime errors when
 * code tries to use these modules in the browser environment.
 * 
 * This is used specifically to intercept imports of Playwright and Node.js
 * modules in Cypress.
 */
// Empty module for Cypress polyfill
module.exports = {};
