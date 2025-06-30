// Page object for Automation Practice page
const createAdapter = require('../support/adapter-factory');

class AutomationPracticePage {
  constructor() {
    this.url = 'https://rahulshettyacademy.com/AutomationPractice/';
    this.adapter = null;
  }

  getAdapter() {
    if (!this.adapter) {
      this.adapter = createAdapter();
    }
    return this.adapter;
  }

  async wait(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  async navigate() {
    const adapter = this.getAdapter();
    await adapter.goto(this.url);
  }

  async clickLogin() {
    const adapter = this.getAdapter();
    if (adapter.driver === 'cypress') {
      cy.wait(5000);
      cy.contains('button, a, input', 'Login', { matchCase: false }).first().click({force:true});
    } else {
      await this.wait(5000);
      await (adapter.clickByText ? adapter.clickByText('Login') : adapter.click('text=Login'));
    }
  }

  async clickSignup() {
    const adapter = this.getAdapter();
    if (adapter.driver === 'cypress') {
      cy.wait(5000);
      cy.contains('button, a, input', 'Signup', { matchCase: false }).first().click({force:true});
    } else {
      await this.wait(5000);
      await (adapter.clickByText ? adapter.clickByText('Signup') : adapter.click('text=Signup'));
    }
  }
}

module.exports = AutomationPracticePage;
