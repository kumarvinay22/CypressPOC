# 📋 File Transfer Checklist

## ✅ REQUIRED Files (Copy these first)

### Core Configuration
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `cypress.config.js`
- [ ] `test.config.js`
- [ ] `test.config.templates.js`
- [ ] `switch-config.js`
- [ ] `run-tests.js`
- [ ] `tsconfig.json`

### Cucumber Setup
- [ ] `.cypress-cucumber-preprocessorrc.json`
- [ ] `cucumber-cypress.js`
- [ ] `cucumber-cypress.json`
- [ ] `cucumber-reporter.js`

### Browser Configuration
- [ ] `config/browsers.js`

### Test Files
- [ ] `features/login.feature`
- [ ] `features/step_definitions/common-steps.js`
- [ ] `features/pages/BasePage.js`
- [ ] `features/pages/LoginPage.js`
- [ ] `features/adapters/CypressAdapter.js`
- [ ] `features/adapters/TestAdapter.js`
- [ ] `features/support/adapter-factory.js`
- [ ] `features/support/shared-setup.js`

### Cypress Support
- [ ] `cypress/support/e2e.js`
- [ ] `cypress/support/commands.js`
- [ ] `cypress/support/cucumber-config.js`

## 🔧 OPTIONAL Files

### Additional Tests
- [ ] `features/AccountOpening.feature`
- [ ] `features/step_definitions/account-opening-steps.js`
- [ ] `features/pages/BankingPage.js`

### Documentation
- [ ] `README.md`
- [ ] `CONFIG-GUIDE.md`

### Scripts
- [ ] `scripts/run-tagged-tests.js`

## 🚀 Setup Commands (Run in order)

1. Create directory:
   ```bash
   mkdir CypressFromHybrid && cd CypressFromHybrid
   ```

2. Copy all checked files maintaining directory structure

3. Install dependencies:
   ```bash
   npm install
   ```

4. Verify setup:
   ```bash
   npm run test:config
   node switch-config.js
   ```

5. Run first test:
   ```bash
   npm run config:debug
   npm test
   ```

## 📁 Directory Structure After Copy

```
CypressFromHybrid/
├── config/
│   └── browsers.js
├── cypress/
│   └── support/
│       ├── e2e.js
│       ├── commands.js
│       └── cucumber-config.js
├── features/
│   ├── *.feature
│   ├── step_definitions/
│   ├── pages/
│   ├── adapters/
│   └── support/
├── scripts/
│   └── run-tagged-tests.js
├── cypress.config.js
├── test.config.js
├── test.config.templates.js
├── switch-config.js
├── run-tests.js
├── package.json
└── README.md
```

## ⚡ Quick Test Commands

```bash
# Switch configurations
npm run config:desktop    # Desktop smoke tests
npm run config:iphone     # iPhone regression tests
npm run config:debug      # Debug mode
npm run config:ci         # CI mode

# Run tests
npm test                  # Run with current config
npm run test:open         # Open Cypress UI
npm run test:config       # View current settings

# Manual configuration switching
node switch-config.js desktop-smoke
node switch-config.js iphone-regression
```

## 🔍 Troubleshooting

If tests don't run:
1. Check `npm run test:config` shows correct settings
2. Verify `features/` directory has .feature files
3. Ensure step definitions are in `features/step_definitions/`
4. Run `npm install` to ensure all dependencies are installed
