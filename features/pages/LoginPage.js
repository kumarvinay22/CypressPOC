class LoginPage extends require('./BasePage') {
    constructor() {
        super();
        this.baseUrl = '/practice-test-login/';
        this.url = 'https://practicetestautomation.com/practice-test-login/';
        this.selectors = {
            loginForm: '#login',
            usernameInput: '#username',
            passwordInput: '#password',
            submitButton: '#submit',
            errorMessage: '#error',
            showPasswordButton: '#show-password'
        };
    }

    async navigate() {
        cy.visit(this.url);
    }

    async enterUsername(username) {
        cy.get(this.selectors.usernameInput).clear().type(username);
    }

    async enterPassword(password) {
        cy.get(this.selectors.passwordInput).clear().type(password);
    }

    async clickSubmit() {
        cy.get(this.selectors.submitButton).click();
    }

    async verifyLoginFormVisible() {
        cy.get(this.selectors.usernameInput).should('be.visible');
        cy.get(this.selectors.passwordInput).should('be.visible');
    }

    async verifyErrorMessageVisible() {
        cy.get(this.selectors.errorMessage).should('be.visible');
    }

    async verifySuccessfulLogin() {
        cy.url().should('include', 'logged-in-successfully');
    }

    async verifyStillOnLoginPage() {
        cy.url().should('include', 'practice-test-login');
    }

    async togglePasswordVisibility() {
        cy.get(this.selectors.showPasswordButton).click();
    }

    async verifyPasswordVisible() {
        cy.get(this.selectors.passwordInput).should('be.visible');
    }

    async verifyTitleContains(expected) {
        cy.title().should('include', expected);
    }
}

module.exports = LoginPage;
