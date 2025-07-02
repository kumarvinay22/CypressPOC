# 🥒 Cypress BDD Test Framework

A powerful, centrally-configurable Cypress BDD testing framework with Cucumber integration. Control all test execution parameters (browser, device, retries, tags, parallel execution) from a single configuration file.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# View current configuration
npm run test:config

# Run tests with current settings
npm test

# Open Cypress UI
npm run test:open

# Switch to different configurations
npm run config:desktop    # Desktop smoke tests
npm run config:iphone     # iPhone regression tests
npm run config:debug      # Debug mode
npm run config:ci         # CI/CD mode
```

## 🎯 Features

- **Central Configuration**: Control everything from `test.config.js`
- **Multi-Browser Support**: Chrome, Firefox, Edge, Electron
- **Device Emulation**: Desktop, iPhone, iPad, Android devices
- **BDD/Cucumber**: Write tests in Gherkin with step definitions
- **Flexible Execution**: Sequential/parallel, retries, tag filtering
- **Rich Reporting**: HTML, JSON, video, screenshots
- **Quick Config Switching**: Pre-built templates for common scenarios

## 📁 Project Structure

```
CypressFromHybrid/
├── 🔧 Configuration
│   ├── test.config.js              # Central configuration file
│   ├── test.config.templates.js    # Pre-built config templates
│   ├── switch-config.js            # Configuration switcher
│   ├── cypress.config.js           # Main Cypress configuration
│   └── config/browsers.js          # Browser/device definitions
│
├── 🧪 Tests
│   └── features/
│       ├── *.feature               # Cucumber feature files
│       ├── step_definitions/       # Step implementation
│       ├── pages/                  # Page object models
│       └── support/                # Test utilities
│
├── 🔨 Tools
│   ├── run-tests.js                # Enhanced test runner
│   └── scripts/run-tagged-tests.js # Tag-based execution
│
└── 📊 Reports (generated)
    ├── videos/
    ├── screenshots/
    └── cucumber/
```

## ⚙️ Central Configuration

All test parameters are controlled from **`test.config.js`**:

### Browser & Execution
```javascript
"runner": {
  "browser": "chrome",     // chrome, firefox, edge, electron
  "mode": "headed",        // headed, headless
  "parallel": false,       // true for parallel execution
  "retries": {
    "runMode": 2,         // retries in run mode
    "openMode": 0         // retries in open mode
  }
}
```

### Device Emulation
```javascript
"device": {
  "type": "iPhone",        // desktop, iPhone, pixel, iPad, androidTablet
  "customViewport": {
    "enabled": true,
    "width": 375,
    "height": 812
  }
}
```

### Test Selection
```javascript
"testing": {
  "tags": "@smoke",        // Run specific tags
  "features": [            // Or specific feature files
    "features/login.feature"
  ],
  "timeouts": {
    "default": 10000,
    "pageLoad": 30000,
    "request": 10000,
    "response": 10000
  }
}
```

### Reporting
```javascript
"reporting": {
  "video": true,
  "screenshots": true,
  "formats": {
    "html": true,           // Cucumber HTML reports
    "json": true,           // JSON output
    "junit": false          // JUnit XML
  },
  "outputDir": "reports"
}
```

## 🔄 Configuration Management

### Quick Configuration Switching
```bash
# Use pre-built configurations
npm run config:desktop    # Desktop Chrome, smoke tests
npm run config:iphone     # iPhone, regression tests  
npm run config:debug      # Debug mode, single feature
npm run config:ci         # CI/CD optimized

# Manual switching
node switch-config.js desktop-smoke
node switch-config.js iphone-regression
node switch-config.js debug
node switch-config.js ci

# View available configurations
node switch-config.js
```

### Available Templates

| Template | Browser | Device | Mode | Tags | Use Case |
|----------|---------|---------|------|------|----------|
| `desktop-smoke` | Chrome | Desktop | Headless | @smoke | Quick validation |
| `iphone-regression` | Chrome | iPhone | Headed | @regression | Mobile testing |
| `debug` | Chrome | Desktop | Headed | @debug | Development |
| `ci` | Chrome | Desktop | Headless | @smoke | CI/CD pipeline |
| `multi-device` | Chrome | Custom | Headless | @smoke | Template for devices |

## 🧪 Writing Tests

### Feature Files (Gherkin)
```gherkin
# features/login.feature
@smoke @regression
Feature: User Login
  As a user
  I want to login to the application
  So that I can access my account

  @debug
  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
```

### Step Definitions
```javascript
// features/step_definitions/login-steps.js
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the login page', () => {
  cy.visit('/login');
});

When('I enter valid credentials', () => {
  cy.get('[data-testid="username"]').type('testuser');
  cy.get('[data-testid="password"]').type('password123');
});

Then('I should be redirected to the dashboard', () => {
  cy.url().should('include', '/dashboard');
});
```

### Page Objects
```javascript
// features/pages/LoginPage.js
export class LoginPage {
  visit() {
    cy.visit('/login');
  }
  
  enterCredentials(username, password) {
    cy.get('[data-testid="username"]').type(username);
    cy.get('[data-testid="password"]').type(password);
  }
  
  clickLogin() {
    cy.get('[data-testid="login-button"]').click();
  }
}
```

## 🏃‍♂️ Running Tests

### Basic Execution
```bash
# Run all tests with current configuration
npm test

# Open Cypress Test Runner
npm run test:open

# Run specific tags
npm run test:tags -- --tags "@smoke"

# Run specific feature
npm run test:feature features/login.feature
```

### Advanced Execution
```bash
# Override configuration via environment
BROWSER=firefox npm test
DEVICE=pixel npm test
TAGS="@regression" npm test

# Custom test runner with config display
node run-tests.js

# Run with specific configuration
node run-tests.js --config desktop-smoke

# Debug mode with verbose output
DEBUG=true npm test
```

### Tag-Based Execution
```bash
# Run smoke tests only
node scripts/run-tagged-tests.js @smoke

# Run regression tests
node scripts/run-tagged-tests.js @regression

# Run multiple tags
node scripts/run-tagged-tests.js "@smoke or @critical"

# Exclude tags
node scripts/run-tagged-tests.js "not @slow"
```

## 📊 Reports

Reports are generated in the `reports/` directory:

- **Videos**: `reports/videos/` - Test execution videos
- **Screenshots**: `reports/screenshots/` - Failure screenshots  
- **HTML Reports**: `reports/cucumber/` - Rich HTML reports
- **JSON**: `reports/cucumber-report.json` - Cucumber JSON output

### View Reports
```bash
# Open latest HTML report
npm run report:open

# Generate custom report
npm run report:generate
```

## 🛠️ Development

### Project Setup
```bash
# Clone/copy project files
git clone <repository>
cd CypressFromHybrid

# Install dependencies
npm install

# Verify setup
npm run test:config
```

### Adding New Tests
1. Create feature file in `features/`
2. Add step definitions in `features/step_definitions/`
3. Create page objects in `features/pages/`
4. Run tests: `npm test`

### Custom Configuration
1. Copy template from `test.config.templates.js`
2. Modify `test.config.js` or create new template
3. Use `node switch-config.js` to switch

### Environment Variables
```bash
# Override any config setting
export BROWSER=firefox
export DEVICE=pixel
export TAGS="@smoke"
export HEADLESS=true
export RETRIES=3
```

## 🔧 Configuration Reference

### Supported Browsers
- `chrome` - Google Chrome
- `firefox` - Mozilla Firefox  
- `edge` - Microsoft Edge
- `electron` - Electron (headless)

### Supported Devices
- `desktop` - Standard desktop (1920x1080)
- `iPhone` - iPhone 12 Pro (390x844)
- `pixel` - Google Pixel 5 (393x851)
- `iPad` - iPad Air (820x1180)
- `androidTablet` - Android Tablet (1280x800)
- `custom` - Custom viewport (set width/height)

### Test Execution Modes
- `headed` - Run with browser UI visible
- `headless` - Run without browser UI (faster)

### Timeout Settings
- `default` - Default command timeout
- `pageLoad` - Page load timeout  
- `request` - Network request timeout
- `response` - Network response timeout

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: Cypress Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run smoke tests
        run: |
          npm run config:ci
          npm test
      
      - name: Upload reports
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: cypress-reports
          path: reports/
```

### Docker Example
```dockerfile
FROM cypress/included:latest
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "config:ci", "&&", "npm", "test"]
```

## 📚 NPM Scripts Reference

| Script | Description |
|--------|-------------|
| `npm test` | Run tests with current config |
| `npm run test:open` | Open Cypress UI |
| `npm run test:config` | Show current configuration |
| `npm run test:tags` | Run specific tags |
| `npm run config:desktop` | Switch to desktop smoke config |
| `npm run config:iphone` | Switch to iPhone regression config |
| `npm run config:debug` | Switch to debug config |
| `npm run config:ci` | Switch to CI config |
| `npm run report:open` | Open latest HTML report |

## 🐛 Troubleshooting

### Common Issues

**Tests not found:**
```bash
# Check feature files exist
ls features/*.feature

# Verify step definitions
ls features/step_definitions/*.js

# Check configuration
npm run test:config
```

**Configuration not applied:**
```bash
# Verify config file syntax
node -c test.config.js

# Reset to known good config
node switch-config.js debug
```

**Browser issues:**
```bash
# Clear Cypress cache
npx cypress cache clear

# Verify browser installation
npx cypress info
```

**Step definitions not found:**
```bash
# Check Cucumber configuration
cat .cypress-cucumber-preprocessorrc.json

# Verify step definition paths
grep -r "stepDefinitions" cypress.config.js
```

### Debug Mode
```bash
# Enable verbose logging
DEBUG=cypress:* npm test

# Run single test with debug
npm run config:debug
npm test
```

### Performance Issues
```bash
# Use headless mode
npm run config:ci

# Reduce video recording
# Edit test.config.js: "video": false

# Limit retries
# Edit test.config.js: "retries": { "runMode": 0 }
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Add tests for new functionality
4. Ensure all tests pass: `npm test`
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- Create GitHub issue for bugs/features
- Check troubleshooting section above
- Review configuration templates in `test.config.templates.js`

---

🎉 **Happy Testing!** This framework provides a powerful, flexible foundation for your Cypress BDD testing needs with centralized configuration management.

- Node.js 16+
- npm

## 🛠️ Setup

Install all dependencies and setup Cypress:

```bash
npm run setup
```

This will:
- Install all npm dependencies
- Install Cypress
- Clean and create report directories

---

## 🎯 Usage: Test Execution

### 🎛️ **Centralized Configuration (Recommended)**

Control all test parameters from a single configuration file:

```bash
# View current configuration
npm run test:config

# Run tests with current configuration  
npm test

# Open Cypress Test Runner
npm run test:open

# Switch to different configurations
npm run config:desktop    # Desktop smoke tests
npm run config:iphone     # iPhone regression tests  
npm run config:debug      # Debug mode (headed, no retries)
npm run config:ci         # CI/CD optimized
```

**📖 [Complete Configuration Guide](CONFIG-GUIDE.md)**

### 🔧 Direct Command Scripts

For quick testing without changing configuration:

```bash
# Basic testing
npm run test:cypress        # Run all tests (desktop, headless)
npm run test:headed         # Run with browser visible

# Device-specific testing
npm run test:device:iphone
npm run test:device:pixel  
npm run test:device:ipad
npm run test:device:android-tablet
npm run test:all-devices

# Utilities
npm run clean               # Clean reports
npm run report             # Generate HTML reports
```

### 🌍 Environment Variable Overrides

Override any configuration with environment variables:

```bash
# Override browser and device
BROWSER=firefox DEVICE=iPad npm test

# Override tags
TAGS="@regression and not @slow" npm test

# Multiple overrides  
BROWSER=chrome DEVICE=iPhone TAGS="@smoke" npm test
```

---

## 🎛️ Configuration System

### Quick Configuration Switching

```bash
# List available configurations
node switch-config.js list

# Switch to a specific configuration
node switch-config.js desktop-smoke
node switch-config.js iphone-regression
node switch-config.js debug
node switch-config.js ci
```

### Central Configuration File (`test.config.js`)

Control all test parameters from one place:

```javascript
module.exports = {
  runner: {
    browser: 'chrome',          // chrome, firefox, edge
    mode: 'headless',           // headed, headless
    retries: { runMode: 2 }     // Number of retries
  },
  device: {
    type: 'desktop'             // desktop, iPhone, iPad, pixel, androidTablet
  },
  testing: {
    tags: '@smoke',             // Cucumber tag expressions
    features: [],               // Specific features to run
    timeouts: { default: 10000 } // Timeout settings
  },
  reporting: {
    video: true,                // Record videos
    screenshots: true           // Screenshots on failure
  }
};
```

**📖 [Complete Configuration Guide](CONFIG-GUIDE.md)**

---

## 🌐 Supported Browsers & Devices
- **Browsers:** Chrome, Firefox, Edge
- **Devices:** Desktop, iPhone, iPad, Pixel, Android Tablet

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
3. If the steps are new, implement them in `features/step_definitions/common-steps.js`.
4. Run tests: `npm test`

### ➕ Creating a New Feature File
1. Create a new `.feature` file in the `features/` directory.
2. Write your feature and scenarios in Gherkin syntax.
3. Implement any new step definitions in `features/step_definitions/`.
4. Run tests to verify.

#### Example Step Implementation
```js
const { When } = require('@badeball/cypress-cucumber-preprocessor');
const LoginPage = require('../pages/LoginPage');
const loginPage = new LoginPage();

When('I enter valid credentials', function() {
  loginPage.enterCredentials('user', 'pass');
});
```

---

## 🏗️ Page Object Pattern
- All page interactions should use page objects located in `features/pages/`
- Page objects use the CypressAdapter for consistent Cypress interactions
- Keep step definitions clean by delegating logic to page objects

---

## 🏷️ Tag-Based Testing

Use Cucumber tags to organize and run specific tests:

```bash
# Single tag
TAGS="@smoke" npm test

# Multiple tags (AND)
TAGS="@smoke and @login" npm test

# Multiple tags (OR)
TAGS="@smoke or @critical" npm test

# Exclude tags
TAGS="@regression and not @wip" npm test
```

---

## 🐛 Troubleshooting & FAQ

### Common Issues

1. **Initial Setup**
   - Run `npm run setup` to install all dependencies
   - Check Node.js version (16+ required)

2. **Test Execution**
   - Clear reports directory: `npm run clean`
   - Check device name spelling in commands
   - Use `npm run test:open` to debug tests interactively

3. **Configuration Issues**
   - Check `test.config.js` syntax: `node -c test.config.js`
   - View current config: `npm run test:config`

### Debugging Tips

1. **Debug Mode Configuration:**
   ```bash
   npm run config:debug
   npm test
   ```

2. **Open Cypress Test Runner:**
   ```bash
   npm run test:open
   ```

3. **Test specific device:**
   ```bash
   DEVICE=iPhone npm test
   ```

4. **Run with headed mode:**
   ```bash
   npm run config:debug  # Sets headed mode
   npm test
   ```

---

## 📁 Project Structure

```
├── test.config.js                   # 🎛️ Central configuration file
├── CONFIG-GUIDE.md                  # 📖 Configuration documentation
├── run-tests.js                     # 🚀 Enhanced test runner
├── switch-config.js                 # 🔄 Configuration switcher
├── features/
│   ├── *.feature                    # 🎭 BDD feature files
│   ├── adapters/
│   │   ├── CypressAdapter.js         # 🔧 Cypress-specific implementation
│   │   └── TestAdapter.js            # 📐 Base adapter class
│   ├── pages/
│   │   ├── BasePage.js               # 📄 Base page object
│   │   ├── LoginPage.js              # 🔐 Login page object
│   │   └── BankingPage.js            # 🏦 Banking page object
│   ├── step_definitions/
│   │   ├── common-steps.js           # 📝 Common step definitions
│   │   └── account-opening-steps.js  # 💰 Account opening steps
│   └── support/
│       ├── adapter-factory.js       # 🏭 Creates test adapters
│       └── shared-setup.js           # ⚙️ Shared setup utilities
├── cypress/
│   ├── e2e/
│   │   └── features/                 # 🎭 Cypress feature files
│   └── support/
│       ├── commands.js               # 🔧 Custom Cypress commands
│       ├── e2e.js                    # 📋 Cypress support file
│       └── cucumber-config.js        # 🥒 Cucumber configuration
├── config/
│   └── browsers.js                   # 📱 Browser and device configurations
├── reports/                          # 📊 Test reports and artifacts
├── cypress.config.js                 # ⚙️ Cypress configuration
└── package.json                      # 📦 Project dependencies and scripts
```

---

## 🚀 Advanced Usage Examples

### CI/CD Pipeline
```bash
npm run config:ci
npm test
```

### Multi-Device Testing
```bash
for device in desktop iPhone iPad; do
  echo "Testing on $device..."
  DEVICE=$device npm test
done
```

### Environment-Specific Testing
```bash
NODE_ENV=staging BROWSER=firefox npm test
```

### Parallel Device Testing (via scripts)
```bash
npm run test:all-devices
```

---

**Happy Testing! 🎉**

Built with 💙 for the Cypress testing community.

**📖 [Configuration Guide](CONFIG-GUIDE.md) | 🎛️ [Configuration Templates](test.config.templates.js)**
