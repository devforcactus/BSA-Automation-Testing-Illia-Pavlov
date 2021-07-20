const { SignInPage } = require('./signin.page');
const { HomePage } = require('./home.page');
const { ClinicsPage } = require('./clinics.page');
const { ProfilePage } = require('./profile.page');

class App {
    constructor() {
        this.signinPage = new SignInPage();
        this.homePage = new HomePage();
        this.clinicsPage = new ClinicsPage();
        this.profilePage = new ProfilePage();
    }
}

module.exports = { App };