/**
 * Test Configuration Templates
 * Copy any of these configurations to test.config.js to use them
 */

// 🖥️ Desktop Chrome - Smoke Tests
const desktopSmokeConfig = {
  runner: {
    browser: 'chrome',
    mode: 'headless',
    parallel: false,
    retries: { runMode: 2, openMode: 0 }
  },
  device: {
    type: 'desktop',
    customViewport: { enabled: false, width: 1920, height: 1080 }
  },
  testing: {
    tags: '@smoke',
    features: [],
    timeouts: { default: 10000, pageLoad: 30000, request: 10000, response: 10000 }
  },
  reporting: {
    video: true,
    screenshots: true,
    formats: { html: true, json: true, junit: false },
    outputDir: 'reports'
  },
  environment: {
    baseUrl: 'https://practicetestautomation.com',
    vars: {}
  }
};

// 📱 iPhone - Regression Tests
const iPhoneRegressionConfig = {
  runner: {
    browser: 'chrome',
    mode: 'headed',
    parallel: false,
    retries: { runMode: 3, openMode: 1 }
  },
  device: {
    type: 'iPhone',
    customViewport: { enabled: false, width: 390, height: 844 }
  },
  testing: {
    tags: '@regression',
    features: [],
    timeouts: { default: 15000, pageLoad: 45000, request: 15000, response: 15000 }
  },
  reporting: {
    video: true,
    screenshots: true,
    formats: { html: true, json: true, junit: true },
    outputDir: 'reports'
  },
  environment: {
    baseUrl: 'https://practicetestautomation.com',
    vars: {}
  }
};

// 🔧 Debug Configuration - Single Feature
const debugConfig = {
  runner: {
    browser: 'chrome',
    mode: 'headed',
    parallel: false,
    retries: { runMode: 0, openMode: 0 }
  },
  device: {
    type: 'desktop',
    customViewport: { enabled: false, width: 1920, height: 1080 }
  },
  testing: {
    tags: '@debug',
    features: ['features/login.feature'],
    timeouts: { default: 30000, pageLoad: 60000, request: 30000, response: 30000 }
  },
  reporting: {
    video: true,
    screenshots: true,
    formats: { html: true, json: true, junit: false },
    outputDir: 'reports'
  },
  environment: {
    baseUrl: 'https://practicetestautomation.com',
    vars: {
      DEBUG: 'true',
      LOG_LEVEL: 'verbose'
    }
  }
};

// 🚀 CI/CD Configuration
const ciConfig = {
  runner: {
    browser: 'chrome',
    mode: 'headless',
    parallel: false,
    retries: { runMode: 3, openMode: 0 }
  },
  device: {
    type: 'desktop',
    customViewport: { enabled: false, width: 1920, height: 1080 }
  },
  testing: {
    tags: '@smoke and not @wip',
    features: [],
    timeouts: { default: 20000, pageLoad: 40000, request: 20000, response: 20000 }
  },
  reporting: {
    video: false,  // Disable videos in CI to save space
    screenshots: true,
    formats: { html: true, json: true, junit: true },
    outputDir: 'reports'
  },
  environment: {
    baseUrl: 'https://practicetestautomation.com',
    vars: {
      CI: 'true'
    }
  }
};

// 📱 Multi-Device Testing Template
const multiDeviceConfig = {
  runner: {
    browser: 'chrome',
    mode: 'headless',
    parallel: false,
    retries: { runMode: 2, openMode: 0 }
  },
  device: {
    type: 'iPhone', // Change to: 'desktop', 'iPhone', 'iPad', 'pixel', 'androidTablet'
    customViewport: { enabled: false, width: 390, height: 844 }
  },
  testing: {
    tags: '@mobile',
    features: [],
    timeouts: { default: 15000, pageLoad: 35000, request: 15000, response: 15000 }
  },
  reporting: {
    video: true,
    screenshots: true,
    formats: { html: true, json: true, junit: false },
    outputDir: 'reports'
  },
  environment: {
    baseUrl: 'https://practicetestautomation.com',
    vars: {}
  }
};

module.exports = {
  desktopSmokeConfig,
  iPhoneRegressionConfig,
  debugConfig,
  ciConfig,
  multiDeviceConfig
};
