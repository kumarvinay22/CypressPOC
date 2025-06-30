# This file specifies step definitions for Cypress
# Preventing any overlap with Playwright step definitions

cypress:
  stepDefinitions:
    - cypress/support/step_definitions/cypress_steps.js
  excludeStepDefinitions:
    - features/step_definitions/**/*.js
    - features/step_definitions/*.js
    - playwright/step_definitions/**/*.js
