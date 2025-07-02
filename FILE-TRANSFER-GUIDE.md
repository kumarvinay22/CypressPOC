# 📋 Essential Files for Transfer

## ✅ CORE FILES (Required)

### Root Configuration Files
```
├── .cypress-cucumber-preprocessorrc.json    # Cucumber preprocessor config
├── cypress.config.js                        # Main Cypress configuration  
├── test.config.js                          # Central test configuration
├── test.config.templates.js                # Configuration templates
├── switch-config.js                        # Configuration switcher
├── run-tests.js                            # Enhanced test runner
├── package.json                            # Dependencies and scripts
├── package-lock.json                       # Lock file for exact versions
├── tsconfig.json                           # TypeScript configuration
├── cucumber-cypress.js                     # Cucumber-Cypress integration
├── cucumber-cypress.json                   # Cucumber JSON config
├── cucumber-reporter.js                    # Custom reporter
├── cucumber-reporter-debug.js              # Debug reporter
└── README.md                               # Project documentation
```

### Configuration Directory
```
└── config/
    └── browsers.js                         # Browser and device definitions
```

### Test Files
```
└── features/
    ├── login.feature                       # Login feature tests
    ├── AccountOpening.feature              # Account opening tests
    ├── adapters/
    │   ├── CypressAdapter.js               # Cypress test adapter
    │   └── TestAdapter.js                  # Base test adapter
    ├── pages/
    │   ├── BasePage.js                     # Base page object
    │   ├── LoginPage.js                    # Login page object
    │   └── BankingPage.js                  # Banking page object
    ├── step_definitions/
    │   ├── common-steps.js                 # Common step definitions
    │   └── account-opening-steps.js        # Account opening steps
    └── support/
        ├── adapter-factory.js              # Adapter factory
        └── shared-setup.js                 # Shared setup utilities
```

### Cypress Support Files
```
└── cypress/
    └── support/
        ├── e2e.js                          # Main support file
        ├── commands.js                     # Custom commands
        ├── cucumber-config.js              # Cucumber configuration
        └── pages/
            └── CypressLoginPage.js         # Cypress-specific login page
```

## 🚀 Quick Setup Instructions

1. **Create project directory:**
   ```bash
   mkdir CypressFromHybrid
   cd CypressFromHybrid
   ```

2. **Copy all files listed above** maintaining the exact directory structure

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Verify setup:**
   ```bash
   npm run test:config
   node switch-config.js
   ```

5. **Run first test:**
   ```bash
   npm run config:debug
   npm test
   ```

## 📊 File Count Summary
- **Total Essential Files**: 28 files
- **Directories**: 8 directories  
- **Configuration Files**: 9 files
- **Test Files**: 11 files
- **Support Files**: 8 files

## 🎯 What Was Removed
- Redundant documentation files
- Empty/duplicate files
- Unused configuration files
- Temporary utility files
- Empty directories
- Webpack configuration (using esbuild)
- Playwright-related files
- Duplicate step definition directories

## ✅ Ready for Production
The framework is now clean, documented, and ready for transfer to any system with:
- Central configuration management
- Cypress BDD testing with Cucumber
- Multi-browser and device support
- Comprehensive documentation
- No redundant or obsolete files
