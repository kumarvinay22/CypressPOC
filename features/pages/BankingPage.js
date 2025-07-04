// Page object for Automation Practice page

class AutomationPracticePage {
  constructor() {
    this.url = 'https://rahulshettyacademy.com/AutomationPractice/';
  }

  async wait(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  async navigate() {
    cy.visit(this.url);
  }

  async clickLogin() {
    cy.wait(5000);
    cy.contains('button, a, input', 'Login', { matchCase: false }).first().click({force:true});
  }

  async clickSignup() {
    cy.wait(5000);
    cy.contains('button, a, input', 'Signup', { matchCase: false }).first().click({force:true});
  }
}

module.exports = AutomationPracticePage;
