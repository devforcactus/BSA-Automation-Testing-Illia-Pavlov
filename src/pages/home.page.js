const { Button } = require('../elements')

class HomePage {
    constructor() {
        this.profileButton = new Button('.link_link__3zEN3=My Profile');
        this.clinicsButton = new Button('a[href="/clinics"]');
    }

    async goToProfile() {
        await this.profileButton.click();
    }

    async goToClinics() {
        await this.clinicsButton.click();
    }
}

module.exports = { HomePage };