const { expect } = require('chai');
const { App } = require('../src/pages');

const app = new App();

const randomNumber = () => Math.floor(Math.random() * 10000).toString();

describe('Clinics', function() {

    beforeEach(async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/sign-in');
    });

    afterEach(async function() {
        await browser.reloadSession();
    })

    it('should be able to add new clinic', async function() {

        const numberClinic = randomNumber();

        await app.signinPage.login({
            email: 'john_admin1@admin.com',
            password: 'Pa55word'
        });

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        await app.homePage.goToClinics();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/clinics';
        }, { timeout: 5000 }, );

        await app.clinicsPage.addClinic({
            name: `Clinic ${numberClinic}`,
            address: `Street ${numberClinic}`,
            status: 'private',
            city: 'Rochester, MN'
        });

        expect(await app.clinicsPage.getInfo()).to.eql({
            nameText: `Clinic ${numberClinic}`,
            statusText: 'Private',
            addressText: `Street ${numberClinic}`
        });
    });

});