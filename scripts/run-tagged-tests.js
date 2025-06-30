const { execSync } = require('child_process');

// Get command line arguments
const args = process.argv.slice(2);
const params = {};

// Parse arguments
args.forEach(arg => {
    const [key, value] = arg.split('=');
    params[key.replace('--', '')] = value;
});

// Default values
const framework = params.framework || 'both'; // cypress, playwright, or both
const device = params.device || 'desktop'; // iPhone, pixel, iPad, androidTablet, or desktop
const tags = params.tags || '@smoke'; // @smoke, @regression, @navigation, @login, etc.
const parallel = params.parallel === 'true';
const headed = params.headed === 'true';

// Validate parameters
const validFrameworks = ['cypress', 'playwright', 'both'];
const validDevices = ['iPhone', 'pixel', 'iPad', 'androidTablet', 'desktop'];

if (!validFrameworks.includes(framework)) {
    console.error(`Invalid framework. Must be one of: ${validFrameworks.join(', ')}`);
    process.exit(1);
}

if (!validDevices.includes(device)) {
    console.error(`Invalid device. Must be one of: ${validDevices.join(', ')}`);
    process.exit(1);
}

// Build commands
function buildPlaywrightCommand() {
    const baseCommand = `cross-env TEST_RUNNER=playwright DEVICE=${device} BROWSER=chrome`;
    const headedFlag = headed ? ' HEADED=true' : '';
    // Escape quotes and handle complex tag expressions
    const tagExpression = tags.replace(/"/g, '\\"');
    return `${baseCommand}${headedFlag} cucumber-js --tags "${tagExpression}"`;
}

function buildCypressCommand() {
    const baseCommand = `cypress run --browser chrome --env DEVICE=${device}`;
    const headedFlag = headed ? ' --headed' : '';
    // Escape quotes and handle complex tag expressions
    const tagExpression = tags.replace(/"/g, '\\"');
    return `${baseCommand}${headedFlag} --env TAGS="${tagExpression}"`;
}

// Execute commands based on framework selection
try {
    if (framework === 'both' && !parallel) {
        console.log('Running tests sequentially on both frameworks...');
        execSync(buildCypressCommand(), { stdio: 'inherit' });
        execSync(buildPlaywrightCommand(), { stdio: 'inherit' });
        execSync('npm run report', { stdio: 'inherit' });
    } else if (framework === 'both' && parallel) {
        console.log('Running tests in parallel on both frameworks...');
        execSync(`concurrently "${buildCypressCommand()}" "${buildPlaywrightCommand()}" && npm run report`, { stdio: 'inherit' });
    } else if (framework === 'cypress') {
        console.log('Running Cypress tests...');
        execSync(`${buildCypressCommand()} && npm run report`, { stdio: 'inherit' });
    } else if (framework === 'playwright') {
        console.log('Running Playwright tests...');
        execSync(`${buildPlaywrightCommand()} && npm run report`, { stdio: 'inherit' });
    }
} catch (error) {
    console.error('Error running tests:', error);
    process.exit(1);
}
