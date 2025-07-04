// Run Cypress with config from test.config.js
const { execSync } = require('child_process');
const config = require('../test.config');

const browser = config.browser || 'chrome';
const device = config.device || 'desktop';
const tags = config.tags || '';
const retries = typeof config.retries === 'number' ? config.retries : 0;
const headed = config.headed;

let cypressCmd = `npx cypress run --browser ${browser} --env DEVICE=${device},TAGS=\"${tags}\",CYPRESS_retries=${retries}`;
if (headed) {
  cypressCmd += ' --headed';
}

console.log('[INFO] Running:', cypressCmd);
execSync(cypressCmd, { stdio: 'inherit' });
