// Sync test.config.js values to npm config for use in package.json scripts
const fs = require('fs');
const path = require('path');
const config = require('../test.config');

function setNpmConfig(key, value) {
  // Use npm config set to set the value for this session
  require('child_process').execSync(`npm config set ${key} ${value}`);
}

setNpmConfig('package_config_browser', config.browser);
setNpmConfig('package_config_headed', config.headed ? '--headed' : '--headless');
