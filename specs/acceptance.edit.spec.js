const { expect } = require('chai');

const { App } = require('../src/pages');

const app = new App();

describe('Edit profile information', function() {

    beforeEach(async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/sign-in');

        await app.signinPage.login({
            email: 'marcusaurelius1859@gmail.com',
            password: 'Pa55word'
        });

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        await app.homePage.goToProfile();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/user-profile/b02ebccd-07da-460a-b5b0-a3a18d55c547';
        }, { timeout: 5000 }, );
    });

    afterEach(async function() {
        await browser.reloadSession();
    })

    it('should be able to change profile data', async function() {

        await app.profilePage.editProfileInfo({
            name: 'Dan',
            surname: 'Smith',
            phone: '380000000000',
            // email: 'dansmith@gmail.com',
            gender: 'male',
            status: 'patient',
            birthDate: 'Choose Tuesday, November 2nd, 1999'
        });

        expect(await app.profilePage.getProfileInfo()).to.eql({
            statusText: 'patient',
            nameText: 'Dan Smith',
            sexText: 'male',
            dateText: '2 November 1999',
            phoneText: '380000000000',
            // mailText: 'dansmith@gmail.com',
        });

        await app.profilePage.editProfileInfo({
            name: 'Mary',
            surname: 'Clare',
            phone: '380000000001',
            // email: 'marcusaurelius1859@gmail.com',
            gender: 'female',
            status: 'doctor',
            birthDate: 'Choose Wednesday, November 3rd, 1999'
        });

    });

    it('should be able to change specialties and clinics for a doctor', async function() {

        await app.profilePage.editSpecClinicInfo({
            specialty: 'dermatologist',
            clinic: 'The Mount Sinai Hospital'
        });

        await app.profilePage.goToHome();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        await app.homePage.goToProfile();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/user-profile/b02ebccd-07da-460a-b5b0-a3a18d55c547';
        }, { timeout: 5000 }, );

        expect(await app.profilePage.getSpecClinicInfo()).to.eql({
            specialtyText: 'Dermatologist',
            clinicText: 'The Mount Sinai Hospital'
        });

        await app.profilePage.editSpecClinicInfo({
            specialty: 'pediatrician',
            clinic: 'Cleveland Clinic'
        });
    });

});