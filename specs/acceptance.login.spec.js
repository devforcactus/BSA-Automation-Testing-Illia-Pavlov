const { expect } = require('chai');
const { App } = require('../src/pages');

const app = new App();

describe('Log in', function() {

    beforeEach(async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/sign-in');
    });

    afterEach(async function() {
        await browser.reloadSession();
    })

    it('should be able to log in', async function() {

        await app.signinPage.login({
            email: 'john_admin1@admin.com',
            password: 'Pa55word'
        });

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        const url = await browser.getUrl();
        expect(url).to.be.eql('http://46.101.234.121/doctors');

    });

    it('should not be able to log in with invalid data', async function() {

        await app.signinPage.login({
            email: 'john_admin1@admin.com',
            password: 'Pa55wor'
        });

        expect(await app.signinPage.getErrorMsg()).to.eql({
            errorMsg: 'Error 401'
        });
    });

});