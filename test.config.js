/**
 * Central Test Configuration File
 * Control all test execution parameters from this single file
 * Current configuration: Debug Mode
 */

module.exports = {
  "runner": {
    "browser": "chrome",
    "mode": "headed",
    "parallel": false,
    "retries": {
      "runMode": 0,
      "openMode": 0
    }
  },
  "device": {
    "type": "desktop",
    "customViewport": {
      "enabled": false,
      "width": 1920,
      "height": 1080
    }
  },
  "testing": {
    "tags": "@debug",
    "features": [
      "features/login.feature"
    ],
    "timeouts": {
      "default": 30000,
      "pageLoad": 60000,
      "request": 30000,
      "response": 30000
    }
  },
  "reporting": {
    "video": true,
    "screenshots": true,
    "formats": {
      "html": true,
      "json": true,
      "junit": false
    },
    "outputDir": "reports"
  },
  "environment": {
    "baseUrl": "https://practicetestautomation.com",
    "vars": {
      "DEBUG": "true",
      "LOG_LEVEL": "verbose"
    }
  }
};