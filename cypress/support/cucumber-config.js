// This file is used to configure @badeball/cypress-cucumber-preprocessor
// to only load our Cypress step definitions

module.exports = {
  stepDefinitions: [
    'features/step_definitions/common-steps.js'
  ],
  filterSpecs: true,
  omitFiltered: true,
  messages: {
    enabled: true,
    output: 'reports/cucumber/messages.ndjson'
  },
  json: {
    enabled: true,
    output: 'reports/cucumber/results.json',
    formatter: require.resolve('cucumber-json-formatter')
  },
  html: {
    enabled: true,
    output: 'reports/cucumber/report.html'
  }
};
