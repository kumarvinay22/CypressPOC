module.exports = {
    default: {
        require: [
            'features/step_definitions/common-steps.js',
            'features/step_definitions/account-opening-steps.js',
            'features/support/world.js',
            'features/support/playwright-setup.js'
        ],
        publishQuiet: true,
        timeout: 60000,
        format: [
            'json:reports/cucumber/cucumber-report.json',
            'summary',
            'progress-bar'
        ],
        formatOptions: { snippetInterface: 'async-aware' },
        retry: 1,
        parallel: process.env.PARALLEL === 'true' ? 4 : 1, // Run up to 4 scenarios in parallel if PARALLEL=true
        worldParameters: {
            device: process.env.DEVICE || 'desktop'
        }
    }
};
