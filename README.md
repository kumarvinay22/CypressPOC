# 🥒 Cypress BDD Test Framework (Pure Cypress Edition)

A clean, maintainable Cypress BDD testing framework with Cucumber integration. All legacy/hybrid/adapter code has been removed. Only features, step definitions, and page objects remain. All page objects use Cypress commands directly.

---

## 🚀 Quick Start

```bash
npm install           # Install dependencies
npm test              # Run tests with current config (see test.config.js)
```

---

## 🎯 Features
- **Central config:** Edit `test.config.js` to control browser, device, tags, retries, headed/headless mode, and mock data
- **Pure Cypress:** No adapters, no Playwright, no legacy code
- **Gherkin BDD:** Write tests in `.feature` files, implement in step definitions
- **Page Objects:** All page objects use Cypress commands directly
- **Mocking:** Toggle real/mocked API data via `mockEnabled` in `test.config.js`
- **Rich Reporting:** Multiple Cucumber HTML Reporter, videos, screenshots

---

## 📁 Project Structure (Cleaned)
```
CypressFromHybrid/
├── test.config.js            # Central config (edit this!)
├── cypress.config.js         # Cypress config (uses test.config.js)
├── features/
│   ├── *.feature             # Gherkin feature files
│   ├── step_definitions/     # Step definitions (JS)
│   └── pages/                # Page objects (Cypress commands only)
├── cypress/
│   ├── mocks/                # Mock data files (by base URL)
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── config/
│   └── browsers.js           # Device/browser definitions
├── reports/                  # Reports, videos, screenshots
├── package.json
└── README.md
```

---

## ⚙️ Central Configuration
Edit `test.config.js` to control:
- `browser`: chrome, firefox, edge
- `headed`: true/false
- `device`: desktop, iPhone, pixel, iPad, androidTablet
- `tags`: Cucumber tag expression (e.g. '@smoke')
- `retries`: Number of retries for failed tests
- `mockEnabled`: true/false (run tests with real or mock API data)

---

## 🧪 How to Add New Test Cases (TCs)
1. **Create a new `.feature` file** in `features/` (e.g., `login.feature`).
2. Write your scenarios in Gherkin syntax:
   ```gherkin
   Feature: Login
     Scenario: Successful login
       Given I am on the login page
       When I enter valid credentials
       Then I should see the dashboard
   ```
3. Add or update step definitions in `features/step_definitions/` to implement the steps.
4. Run `npm test` to execute your new test cases.

---

## 🧩 How to Add New Step Definitions or Page Objects (POMs)
- **Step Definitions:**
  1. Go to `features/step_definitions/`.
  2. Create a new JS file or update an existing one (e.g., `login_steps.js`).
  3. Use Cucumber expressions to match steps and Cypress commands to implement them.
- **Page Objects:**
  1. Go to `features/pages/`.
  2. Create a new JS file for your page (e.g., `DashboardPage.js`).
  3. Export a class with methods that use Cypress commands for all page actions/selectors.
  4. Import and use your page object in step definitions as needed.

---

## 🧪 How to Add New Endpoints for Mocking
1. Go to `cypress/mocks/` and open or create the file for your base URL (e.g., `practicetestautomation.com.js`).
2. Add a new property for your endpoint, e.g.:
   ```js
   module.exports = {
     ...existingMocks,
     newEndpoint: {
       success: { statusCode: 200, body: { ... } },
       failure: { statusCode: 400, body: { ... } }
     }
   };
   ```
3. In `cypress/support/e2e.js`, add a new `cy.intercept()` for the endpoint, using the mock data.
4. Set `mockEnabled: true` in `test.config.js` to enable mocks.
5. Run your tests to verify the new mock is used.

---

## 🧪 Steps to Add New Mock-Related Functionality
1. **Add mock data:**
   - Create or update the relevant file in `cypress/mocks/`.
   - Export mock responses for each endpoint (success, failure, etc).
2. **Wire up intercepts:**
   - In `cypress/support/e2e.js`, add `cy.intercept()` for each endpoint you want to mock.
   - Use the mock data from your mock file.
3. **Control with config:**
   - Set `mockEnabled: true` in `test.config.js` to use mocks, or `false` for real data.
4. **Test:**
   - Run `npm test` and verify the correct data is used.

---

## 🖥️ How to Add New Devices for Testing
1. Open `config/browsers.js`.
2. Add a new device config under the `devices` object, e.g.:
   ```js
   const devices = {
     ...existingDevices,
     myTablet: {
       viewportWidth: 800,
       viewportHeight: 1280,
       userAgent: 'custom user agent',
       isMobile: true,
       deviceScaleFactor: 2,
       name: 'My Tablet'
     }
   };
   ```
3. Reference your new device in `test.config.js` under the `device` property.
4. Run `npm test` to use the new device settings.

---

## 🏃‍♂️ Running Tests
```bash
npm test              # Run all tests with current config (real or mock data)
```
- To use mock data, set `mockEnabled: true` in `test.config.js`.
- To use real data, set `mockEnabled: false`.

---

## 📊 Reports
- After running tests, open the latest HTML report in `reports/cucumber-html-report_*/index.html`
- Videos: `reports/videos/`
- Screenshots: `reports/screenshots/`

---

## 🛠️ Maintenance
- No adapters, no hybrid code, no Playwright: just Cypress, Cucumber, and your tests.
- To add new tests, just add features, step definitions, and page objects.
- To change test parameters or enable mocks, edit `test.config.js`.

---

## 🐛 Troubleshooting
- If you see test failures, check your selectors and page objects.
- If reports are empty, ensure JSON output is enabled in `.cypress-cucumber-preprocessorrc.json`.
- For device/browser issues, check `config/browsers.js` and your config file.
- For mock issues, check your mock files in `cypress/mocks/` and intercept logic in `cypress/support/e2e.js`.

---

**Happy Testing!** 🎉

Built with 💙 for the Cypress community. Now 100% pure Cypress BDD.
