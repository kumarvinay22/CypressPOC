// Centralized test configuration for all runners
// Edit these values to control test runs
// Note: PARALLEL is only applicable to Playwright. For Cypress, parallel execution requires a paid "Cypress Cloud" account.
// Note: DEVICE can be iPhone, iPad, pixel, androidTablet only when BROWSER is 'chrome'.
module.exports = {
  TEST_RUNNER: process.env.TEST_RUNNER || 'cypress', // 'playwright' or 'cypress'
  BROWSER: process.env.BROWSER || 'chrome', // chrome, firefox, webkit, edge
  DEVICE: process.env.DEVICE || 'desktop', // desktop, iPhone, iPad, pixel, androidTablet
  TAGS: process.env.TAGS || '@v8', // e.g. '@smoke and not @wip'
  HEADED: process.env.HEADED || 'true', // 'true' or 'false'
  PARALLEL: process.env.PARALLEL || 'false' // 'true' or 'false' (Playwright only)
};
