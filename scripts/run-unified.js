// scripts/run-unified.js
// Loads test.env.js and runs the correct test runner with all features and tag selection
const { execSync } = require('child_process');
const path = require('path');
const config = require('../test.env');

const runner = config.TEST_RUNNER || process.env.TEST_RUNNER || 'playwright'; // default to playwright
const browser = config.BROWSER;
const device = config.DEVICE;
const tags = config.TAGS;
const headed = config.HEADED === 'true';
const parallel = config.PARALLEL === 'true';

const envVars = [
  `BROWSER=${browser}`,
  `DEVICE=${device}`,
  `HEADED=${headed}`
];
if (tags) envVars.push(`TAGS=${tags}`);

let command = '';
if (runner === 'cypress') {
  command = `npx cypress run --browser ${browser} --env DEVICE=${device} ${headed ? '--headed' : ''}`;
  if (tags) command += ` --env TAGS=\"${tags}\"`;
} else {
  // Playwright (Cucumber)
  command = `npx cross-env TEST_RUNNER=playwright BROWSER=${browser} DEVICE=${device} HEADED=${headed} cucumber-js`;
  if (tags) command += ` --tags \"${tags}\"`;
  if (parallel) command += ' --parallel 4';
}

console.log('Running:', command);
execSync(command, { stdio: 'inherit', env: { ...process.env, ...config } });
