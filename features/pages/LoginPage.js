const BasePage = require('./BasePage');

class LoginPage extends BasePage {
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
        await super.navigate(this.url);
    }

    async enterUsername(username) {
        await this.type(this.selectors.usernameInput, username);
    }

    async enterPassword(password) {
        await this.type(this.selectors.passwordInput, password);
    }

    async clickSubmit() {
        await this.click(this.selectors.submitButton);
    }

    async verifyLoginFormVisible() {
        await this.shouldBeVisible(this.selectors.usernameInput);
        await this.shouldBeVisible(this.selectors.passwordInput);
    }

    async verifyErrorMessageVisible() {
        await this.shouldBeVisible(this.selectors.errorMessage);
    }

    async verifySuccessfulLogin() {
        // Get the current URL and check if it contains 'logged-in-successfully'
        const url = await this.getCurrentUrl();
        if (!url.includes('logged-in-successfully')) {
            throw new Error(`URL should contain 'logged-in-successfully' but was: ${url}`);
        }
    }

    async verifyStillOnLoginPage() {
        // Get the current URL and check if it contains 'practice-test-login'
        const url = await this.getCurrentUrl();
        if (!url.includes('practice-test-login')) {
            throw new Error(`URL should contain 'practice-test-login' but was: ${url}`);
        }
    }

    // Additional methods for other login page interactions
    async togglePasswordVisibility() {
        await this.click(this.selectors.showPasswordButton);
    }

    async verifyPasswordVisible() {
        // We will use adapter-specific methods for this in the future
        // For now, just using basic adapter methods for compatibility
        await this.adapter.waitFor(this.selectors.passwordInput);
    }
}

module.exports = LoginPage;
