# Unified Test Automation Framework

A powerful, unified testing framework supporting both **Cypress** and **Playwright** with Cucumber BDD. Write your tests once and run them across multiple devices and browsers, with support for parallel execution, tag-based testing, and unified reporting.

---

## 🚦 Unified Architecture

This framework uses an **adapter pattern** to abstract away runner-specific logic. Page objects and step definitions are shared, and the correct adapter (Cypress or Playwright) is selected at runtime. This minimizes duplication and ensures maintainability.

- **Adapters:** `features/adapters/CypressAdapter.js`, `features/adapters/PlaywrightAdapter.js`
- **Adapter Factory:** `features/support/adapter-factory.js`
- **Shared Step Definitions:** `features/step_definitions/common-steps.js`

---

## 📋 Prerequisites

- Node.js 16+
- npm

## 🛠️ Setup

Install all dependencies and setup browsers:

```bash
npm run setup
```

This will:
- Install all npm dependencies
- Install Playwright browsers
- Install Cypress
- Clean and create report directories

---

## 🎯 Usage: Test Execution Scripts

### Playwright
- `npm run test:playwright` — Run all Playwright tests (default: desktop, headless)
- `npm run test:playwright:parallel` — Run Playwright tests in parallel (4 workers)
- `npm run test:playwright:tag` — Run Playwright tests by tag (set `$TAG` env variable)
- `npm run test:playwright:device:iphone` — Run Playwright tests on iPhone emulation
- `npm run test:playwright:device:pixel` — Run Playwright tests on Pixel emulation
- `npm run test:playwright:device:ipad` — Run Playwright tests on iPad emulation
- `npm run test:playwright:device:android-tablet` — Run Playwright tests on Android tablet emulation

### Cypress
- `npm run test:cypress` — Run all Cypress tests (default: desktop, headless)
- `npm run test:cypress:headed` — Run Cypress tests in headed mode
- `npm run test:cypress:tag` — Run Cypress tests by tag (set `$TAG` env variable)
- `npm run test:cypress:device:iphone` — Run Cypress tests on iPhone emulation
- `npm run test:cypress:device:pixel` — Run Cypress tests on Pixel emulation
- `npm run test:cypress:device:ipad` — Run Cypress tests on iPad emulation
- `npm run test:cypress:device:android-tablet` — Run Cypress tests on Android tablet emulation

### All Devices
- `npm run test:all-devices` — Run all device tests for both Playwright and Cypress
- `npm run test:all-devices:playwright` — All Playwright device tests
- `npm run test:all-devices:cypress` — All Cypress device tests

### Parallel
- `npm run test:parallel` — Run Playwright (parallel) and Cypress (sequential) together

### Custom Device/Runner
- `npm run test:device` — Run with custom runner/device/browser (set `$RUNNER`, `$DEVICE`, `$BROWSER`, `$HEADED` env variables)

### Reports & Utilities
- `npm run report` — Generate HTML report
- `npm run clean` — Clean all report directories

---

## 🚀 Unified Test Runner (Recommended)

Edit `test.env.js` to set your desired runner, browser, device, tags, and headed/headless mode:

```
module.exports = {
  TEST_RUNNER: 'playwright', // 'playwright' or 'cypress'
  BROWSER: 'chrome',        // chrome, firefox, webkit, edge
  DEVICE: 'desktop',        // desktop, iPhone, iPad, pixel, androidTablet
  TAGS: '',                 // e.g. '@smoke and not @wip' (Cucumber tag expression)
  HEADED: 'false'           // 'true' for headed, 'false' for headless
};
```

Then run all features (scenarios are picked by tags):

```
npm run test:unified
```

- To override any value, set the env var (e.g. `BROWSER=firefox npm run test:unified`)
- All features are always included; use tags to select scenarios.
- Works for both Cypress and Playwright (set `TEST_RUNNER` in `test.env.js`)

## Supported Browsers & Devices
- **Browsers:** Chrome, Firefox, WebKit, Edge
- **Devices:** desktop, iPhone, iPad, pixel, androidTablet (mobile emulation for Chromium-based browsers)
- **Modes:** Headed and headless

## Tag-based Execution
- Use Cucumber tag expressions in `TAGS` (e.g. `@smoke and not @wip`)

## Reporting
- Reports and artifacts are generated in the `reports/` directory after each run.

---

## 📁 Project Structure

```
├── config/
│   └── browsers.js         # Browser/device configurations
├── cypress/
│   └── support/
│       └── step_definitions/  # Cypress-specific steps
├── features/
│   ├── adapters/          # Adapter implementations for Cypress and Playwright
│   ├── pages/             # Page Object Models
│   │   ├── BasePage.js    # Common base page functionality
│   │   ├── LoginPage.js   # Login page actions and elements
│   │   └── DashboardPage.js # Dashboard page actions
│   ├── step_definitions/ # Shared step definitions
│   └── support/          # Test setup and hooks
│       └── playwright-setup.js  # Playwright config
├── reports/
│   ├── cucumber/         # HTML reports
│   ├── screenshots/      # Failure screenshots
│   └── videos/          # Test execution videos
├── scripts/
│   └── run-tagged-tests.js  # Tag-based execution script
├── cypress.config.js     # Cypress configuration
└── cucumber-reporter.js  # Report configuration
```

---

## 🧩 Adding New Test Cases or Feature Files

### ➕ Adding a Test Case to an Existing Feature File
1. Open the relevant `.feature` file in `features/`.
2. Add your new scenario using Gherkin syntax:
   ```gherkin
   Scenario: User logs in with valid credentials
     Given I am on the login page
     When I enter valid credentials
     Then I should see the dashboard
   ```
3. If the steps are new, implement them in `features/step_definitions/common-steps.js` (or in a new step definition file if needed). Use the adapter pattern for runner-agnostic logic.
4. Run tests to verify: `npm test` or any device/script as needed.

### ➕ Creating a New Feature File
1. Create a new `.feature` file in the `features/` directory (or a subfolder).
2. Write your feature and scenarios in Gherkin syntax.
3. Implement any new step definitions in `features/step_definitions/common-steps.js` (or a new file in the same folder).
4. Steps should use the adapter pattern to work for both runners.
5. Run tests to verify.

#### Example Step Implementation
```js
const { When } = require('@cucumber/cucumber');
const { getAdapter } = require('../support/adapter-factory');

When('I enter valid credentials', async function() {
  const adapter = getAdapter(this);
  await adapter.enterCredentials('user', 'pass');
});
```

---

## 🏗️ Adapter Pattern & Unified Steps
- All page objects and step definitions should use the adapter factory to get the correct runner instance.
- Avoid Cypress/Playwright-specific code in step definitions; use the adapter interface.
- See `features/support/adapter-factory.js` and `features/adapters/` for examples.

---

## 🐛 Troubleshooting & FAQ

### Common Issues

1. **Initial Setup**
   - Run `npm run setup` to install all dependencies
   - Check Node.js version (16+ required)

2. **Test Execution**
   - Clear reports directory: `npm run clean`
   - Check device name spelling in commands
   - Verify tag expressions for syntax

3. **Report Generation**
   - Ensure write permissions for reports directory
   - Check for available disk space

### Debugging Tips

1. Run tests in headed mode:
```bash
npm run test:tag -- --tags "@debug" --headed
```

2. Enable verbose logging:
```bash
DEBUG=true npm test
```

3. Check specific device/browser:
```bash
npm run test:tag -- --tags "@smoke" --device iPhone --headed
```

---
**Happy Testing! 🎉**

Built with 💙 for the test automation community.
