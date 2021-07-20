const { Input, Button, Field } = require('../elements')

class SignInPage {
    constructor() {
        this.emailField = new Input('input[name="email"]');
        this.passwordField = new Input('input[name="password"]');
        this.signInButton = new Button('button');
        this.errorField = new Field('div.rrt-title');
    }

    async login({ email, password }) {

        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        await this.signInButton.click();
    }

    async getErrorMsg() {
        return {
            errorMsg: await this.errorField.getText()
        }
    }

}

module.exports = { SignInPage };