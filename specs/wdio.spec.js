const assert = require('assert');
const { expect } = require('chai');

const randomNumber = () => Math.floor(Math.random() * 10000).toString();

// Используя фреймворк WebdriverIO Вам требуется написать 5 тестов:

// [+]Тест на логин.
// [+]Тест на логин с невалидными данными.
// [+]Тест на изменение данных в профиле пользователя.
// [+]Тест на изменение специальности и клиники для доктора.
// [+]Тест на добавление новой клиники.

describe('Test suit', function() {
    xit('should be able to register ', async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/sign-up');

        const userNameField = await $('input[name="name"]');
        const surnameField = await $('input[name="surname"]');
        const birthDateField = await $('input[name="birthdate"]');
        const emailField = await $('input[name="email"]');
        const passwordField = await $('input[name="password"]');
        const retryPasswordField = await $('input[name="retypePassword"]');
        const phoneField = await $('input[name="phone"]');

        const ddls = await $$('div.selectStyles__control');

        const genderDdl = ddls[0];
        const statusDdl = ddls[1];

        const femaleOption = await $('div.selectStyles__option=female');
        const doctorOption = await $('div.selectStyles__option=doctor');
        const signUpButton = await $('button');

        await userNameField.waitForDisplayed({ timeout: 5000 });
        await userNameField.setValue('Marcus');

        await surnameField.waitForDisplayed({ timeout: 5000 });
        await surnameField.setValue('Aurelius');

        await birthDateField.waitForDisplayed({ timeout: 5000 });
        await birthDateField.setValue('11/11/1999');

        await emailField.click();
        await emailField.waitForDisplayed({ timeout: 5000 });
        await emailField.setValue(`marcusaurelius${randomNumber()}@gmail.com`);
        await browser.pause(3000);

        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.setValue('Pa55word');

        await retryPasswordField.waitForDisplayed({ timeout: 5000 });
        await retryPasswordField.setValue('Pa55word');

        await phoneField.waitForDisplayed({ timeout: 5000 });
        await phoneField.setValue('380000000000');

        await genderDdl.waitForDisplayed({ timeout: 5000 });
        await genderDdl.click();

        await femaleOption.waitForDisplayed({ timeout: 5000 });
        await femaleOption.click();

        await statusDdl.waitForDisplayed({ timeout: 5000 });
        await statusDdl.click();

        await doctorOption.waitForDisplayed({ timeout: 5000 });
        await doctorOption.click();

        await signUpButton.waitForDisplayed({ timeout: 5000 });
        await signUpButton.click();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        const url = await browser.getUrl();
        expect(url).to.be.eql('http://46.101.234.121/doctors');

        await browser.reloadSession();
    });

    // Тест на логин

    it('should be able to log in ', async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/sign-in');

        const emailField = await $('input[name="email"]');
        const passwordField = await $('input[name="password"]');
        const signInButton = await $('button');

        await emailField.waitForDisplayed({ timeout: 5000 });
        await emailField.setValue('john_admin1@admin.com');

        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.setValue('Pa55word');

        await signInButton.waitForDisplayed({ timeout: 5000 });
        await signInButton.click();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        const url = await browser.getUrl();
        expect(url).to.be.eql('http://46.101.234.121/doctors');

        await browser.reloadSession();
    });

    // Тест на логин с невалидными данными.

    it('should not be able to log in with invalid data', async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/sign-in');

        const emailField = await $('input[name="email"]');
        const passwordField = await $('input[name="password"]');
        const signInButton = await $('button');
        const fadeInContainer = await $('div.rrt-title');

        await emailField.waitForDisplayed({ timeout: 5000 });
        await emailField.setValue('john_admin1@admin.com');

        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.setValue('Pa55wor');

        await signInButton.waitForDisplayed({ timeout: 5000 });
        await signInButton.click();

        await fadeInContainer.waitForDisplayed({ timeout: 5000 });
        const txt = await fadeInContainer.getText();

        expect(txt).to.equal('Error 401');

        await browser.reloadSession();
    });

    // Тест на изменение данных в профиле пользователя.

    it('should be able to change profile data', async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/sign-in');

        const emailField = await $('input[name="email"]');
        const passwordField = await $('input[name="password"]');
        const signInButton = await $('button');

        await emailField.waitForDisplayed({ timeout: 5000 });
        await emailField.setValue('marcusaurelius1859@gmail.com');

        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.setValue('Pa55word');

        await signInButton.waitForDisplayed({ timeout: 5000 });
        await signInButton.click();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        const profileButton = await $('.link_link__3zEN3=My Profile');
        const editButton = await $('button.styles_edit__ftuHl');

        await profileButton.waitForDisplayed({ timeout: 5000 });
        await profileButton.click();

        await editButton.waitForDisplayed({ timeout: 5000 });
        await editButton.click();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/user-profile/b02ebccd-07da-460a-b5b0-a3a18d55c547';
        }, { timeout: 5000 }, );

        const profileForm = await $('form.styles_editForm__1rOFS');

        browser.pause(5000);

        const userNameProfileField = await $('input.styles_textInput__3q_vf[name="name"]');
        const surnameProfileField = await $('input.styles_textInput__3q_vf[name="surname"]');

        const birthDateProfileField = await $('input[name="birthdate"]');
        const birthDateMale = await $('div[aria-label="Choose Tuesday, November 2nd, 1999"]');
        const birthDateFemale = await $('div[aria-label="Choose Wednesday, November 3rd, 1999"]');

        const phoneProfileField = await $('input.styles_textInput__3q_vf[name="phone"]');
        const emailProfileField = await $('input[name="email"]');

        const ddlsProfile = await $$('form.styles_editForm__1rOFS div.selectStyles__control');
        const genderProfileDdl = ddlsProfile[0];
        const statusProfileDdl = ddlsProfile[1];

        const maleProfileOption = await $('div.selectStyles__option=male');
        const femaleProfileOption = await $('div.selectStyles__option=female');
        const patientProfileOption = await $('div.selectStyles__option=patient');
        const doctorProfileOption = await $('div.selectStyles__option=doctor');

        const editConfirmButton = await $('form.styles_editForm__1rOFS button[type="submit"]');

        await profileForm.waitForDisplayed({ timeout: 5000 });

        await userNameProfileField.waitForDisplayed({ timeout: 5000 });
        await userNameProfileField.setValue('Dan');

        await surnameProfileField.waitForDisplayed({ timeout: 5000 });
        await surnameProfileField.setValue('Smith');

        await birthDateProfileField.waitForDisplayed({ timeout: 5000 });
        await birthDateProfileField.click();

        await birthDateMale.waitForDisplayed({ timeout: 5000 });
        await birthDateMale.click();

        await phoneProfileField.waitForDisplayed({ timeout: 5000 });
        await phoneProfileField.setValue('380000000000');

        await emailProfileField.waitForDisplayed({ timeout: 5000 });
        await emailProfileField.setValue('dansmith@gmail.com');

        await genderProfileDdl.waitForDisplayed({ timeout: 5000 });
        await genderProfileDdl.click();

        await maleProfileOption.waitForDisplayed({ timeout: 5000 });
        await maleProfileOption.click();

        await statusProfileDdl.waitForDisplayed({ timeout: 5000 });
        await statusProfileDdl.click();

        await patientProfileOption.waitForDisplayed({ timeout: 5000 });
        await patientProfileOption.click();

        await editConfirmButton.waitForDisplayed({ timeout: 5000 });
        await editConfirmButton.click();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/user-profile/b02ebccd-07da-460a-b5b0-a3a18d55c547';
        }, { timeout: 5000 }, );

        const statusField = await $('div.styles_card__3sdTL');
        await statusField.waitForDisplayed({ timeout: 5000 });

        const nameField = await $('span.styles_name__2vTNE');
        await nameField.waitForDisplayed({ timeout: 5000 });

        const sexField = await $('span.styles_sex__sjUSu');
        await sexField.waitForDisplayed({ timeout: 5000 });

        const dateField = await $('span.styles_date__2rFkK');
        await dateField.waitForDisplayed({ timeout: 5000 });

        const phoneField = await $('//div[@class="styles_item__27jsh"][1]/a[@class="styles_text__1HrCV"]');
        await phoneField.waitForDisplayed({ timeout: 5000 });

        const mailField = await $('//div[@class="styles_item__27jsh"][2]/a[@class="styles_text__1HrCV"]');
        await mailField.waitForDisplayed({ timeout: 5000 });

        const statusText = await statusField.getText();
        const nameText = await nameField.getText();
        const sexText = await sexField.getText();
        const dateText = await dateField.getText();
        const phoneText = await phoneField.getText();
        const mailText = await mailField.getText();

        expect(statusText).to.equal('patient');
        expect(nameText).to.equal('Dan Smith');
        expect(sexText).to.equal('male');
        expect(dateText).to.equal('2 November 1999');
        expect(phoneText).to.equal('380000000000');
        expect(mailText).to.equal('dansmith@gmail.com');

        await profileButton.waitForDisplayed({ timeout: 5000 });
        await profileButton.click();

        await editButton.waitForDisplayed({ timeout: 5000 });
        await editButton.click();

        await profileForm.waitForDisplayed({ timeout: 5000 });

        await userNameProfileField.waitForDisplayed({ timeout: 5000 });
        await userNameProfileField.setValue('Mary');

        await surnameProfileField.waitForDisplayed({ timeout: 5000 });
        await surnameProfileField.setValue('Clare');

        await birthDateProfileField.waitForDisplayed({ timeout: 5000 });
        await birthDateProfileField.click();

        await birthDateFemale.waitForDisplayed({ timeout: 5000 });
        await birthDateFemale.click();

        await phoneProfileField.waitForDisplayed({ timeout: 5000 });
        await phoneProfileField.setValue('380000000001');

        await emailProfileField.waitForDisplayed({ timeout: 5000 });
        await emailProfileField.setValue('marcusaurelius1859@gmail.com');

        await genderProfileDdl.waitForDisplayed({ timeout: 5000 });
        await genderProfileDdl.click();

        await femaleProfileOption.waitForDisplayed({ timeout: 5000 });
        await femaleProfileOption.click();

        await statusProfileDdl.waitForDisplayed({ timeout: 5000 });
        await statusProfileDdl.click();

        await doctorProfileOption.waitForDisplayed({ timeout: 5000 });
        await doctorProfileOption.click();

        await editConfirmButton.waitForDisplayed({ timeout: 5000 });
        await editConfirmButton.click();

        await browser.reloadSession();
    });

    // Тест на изменение специальности и клиники для доктора.

    it('should be able to change specialties and clinics for a doctor', async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/sign-in');

        const emailField = await $('input[name="email"]');
        const passwordField = await $('input[name="password"]');
        const signInButton = await $('button');
        const profileButton = await $('.link_link__3zEN3=My Profile');
        const homeButton = await $('div.header_logoLabel___s7O3');

        await emailField.waitForDisplayed({ timeout: 5000 });
        await emailField.setValue('marcusaurelius4394@gmail.com');

        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.setValue('Pa55word');

        await signInButton.waitForDisplayed({ timeout: 5000 });
        await signInButton.click();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        await profileButton.waitForDisplayed({ timeout: 5000 });
        await profileButton.click();

        await browser.pause(500);

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/user-profile/8f65f4c2-cccf-465b-8bb7-6ad0defcdbe2';
        }, { timeout: 5000 }, );

        const ddlsProfile = await $$('div.selectStyles');
        const specialtyDdl = ddlsProfile[0];
        const clinicDdl = ddlsProfile[1];

        const dermatologistSpecialtyOption = await $('div.selectStyles__option=dermatologist');
        const pediatricianSpecialtyOption = await $('div.selectStyles__option=pediatrician');
        const clevelandClinicOption = await $('div.selectStyles__option=Cleveland Clinic');
        const mountClinicOption = await $('div.selectStyles__option=The Mount Sinai Hospital');

        const buttonsSave = await $$('button.styles_primary-dark__1WnyR')
        const buttonSpecialtySave = buttonsSave[0];
        const buttonClinicSave = buttonsSave[1];

        await specialtyDdl.waitForDisplayed({ timeout: 5000 });
        await specialtyDdl.click();

        await dermatologistSpecialtyOption.waitForDisplayed({ timeout: 5000 });
        await dermatologistSpecialtyOption.click();

        await buttonSpecialtySave.waitForDisplayed({ timeout: 5000 });
        await buttonSpecialtySave.click();

        await browser.pause(500);

        await clinicDdl.waitForDisplayed({ timeout: 5000 });
        await clinicDdl.click();

        await mountClinicOption.waitForDisplayed({ timeout: 5000 });
        await mountClinicOption.click();

        await buttonClinicSave.waitForDisplayed({ timeout: 5000 });
        await buttonClinicSave.click();

        await homeButton.waitForDisplayed({ timeout: 5000 });
        await homeButton.click();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        await profileButton.waitForDisplayed({ timeout: 5000 });
        await profileButton.click();

        await browser.pause(500);

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/user-profile/8f65f4c2-cccf-465b-8bb7-6ad0defcdbe2';
        }, { timeout: 5000 }, );

        const specialtyField = await $('div.css-1wa3eu0-placeholder');
        await specialtyField.waitForDisplayed({ timeout: 5000 });

        const clinicField = await $('div.css-1uccc91-singleValue');
        await clinicField.waitForDisplayed({ timeout: 5000 });

        const specialtyText = await specialtyField.getText();
        const clinicText = await clinicField.getText();

        expect(specialtyText).to.equal('Dermatologist');
        expect(clinicText).to.equal('The Mount Sinai Hospital');

        await specialtyDdl.waitForDisplayed({ timeout: 5000 });
        await specialtyDdl.click();

        await pediatricianSpecialtyOption.waitForDisplayed({ timeout: 5000 });
        await pediatricianSpecialtyOption.click();

        await buttonSpecialtySave.waitForDisplayed({ timeout: 5000 });
        await buttonSpecialtySave.click();

        await browser.pause(500);

        await clinicDdl.waitForDisplayed({ timeout: 5000 });
        await clinicDdl.click();

        await clevelandClinicOption.waitForDisplayed({ timeout: 5000 });
        await clevelandClinicOption.click();

        await buttonClinicSave.waitForDisplayed({ timeout: 5000 });
        await buttonClinicSave.click();

        await browser.reloadSession();
    });

    // Тест на добавление новой клиники.

    it('should be able to add new clinic', async function() {
        await browser.setWindowSize(1440, 960);
        await browser.url('/sign-in');

        const emailField = await $('input[name="email"]');
        const passwordField = await $('input[name="password"]');
        const signInButton = await $('button');
        const clinicsButton = await $('a[href="/clinics"]');
        const addButton = await $('button.styles_primary-dark__1WnyR');
        const formAdd = await $('form');
        const nameClinic = await $('input[name="name"]');
        const addressClinic = await $('input[name="address"]');
        const numberClinic = randomNumber();

        await emailField.waitForDisplayed({ timeout: 5000 });
        await emailField.setValue('john_admin1@admin.com');

        await passwordField.waitForDisplayed({ timeout: 5000 });
        await passwordField.setValue('Pa55word');

        await signInButton.waitForDisplayed({ timeout: 5000 });
        await signInButton.click();

        await browser.waitUntil(async function() {
            const url = await browser.getUrl();
            return url === 'http://46.101.234.121/doctors';
        }, { timeout: 5000 }, );

        await clinicsButton.waitForDisplayed({ timeout: 5000 });
        await clinicsButton.click();

        await addButton.waitForDisplayed({ timeout: 5000 });
        await addButton.click();

        await formAdd.waitForDisplayed({ timeout: 5000 });

        await nameClinic.waitForDisplayed({ timeout: 5000 });
        await nameClinic.setValue(`Clinic ${numberClinic}`);

        await addressClinic.waitForDisplayed({ timeout: 5000 });
        await addressClinic.setValue(`Street ${numberClinic}`);

        const ddlsClinic = await $$('div.selectStyles__control');
        const statusClinic = ddlsClinic[0];
        const cityClinic = ddlsClinic[1];

        const privateClinic = await $('div.selectStyles__option=private');
        const rochesterCity = await $('div.selectStyles__option=Rochester, MN');

        await statusClinic.waitForDisplayed({ timeout: 5000 });
        await statusClinic.click();

        await privateClinic.waitForDisplayed({ timeout: 5000 });
        await privateClinic.click();

        await cityClinic.waitForDisplayed({ timeout: 5000 });
        await cityClinic.click();

        await rochesterCity.waitForDisplayed({ timeout: 5000 });
        await rochesterCity.click();

        const addClinicButton = await $('button[type="submit"]');
        await addClinicButton.waitForDisplayed({ timeout: 5000 });
        await addClinicButton.click();

        await browser.pause(500);

        const nameClinicAdded = await $('//div[@class="styles_clinicsContainer__1C-y4"]/div[last()]//*/span[@class="styles_title__3xRcc"]');
        await nameClinicAdded.waitForDisplayed({ timeout: 5000 });

        const statusClinicAdded = await $('//div[@class="styles_clinicsContainer__1C-y4"]/div[last()]//*/span[@class="styles_label__BkQx3 styles_textCapitalize__R-4ql"]');
        await statusClinicAdded.waitForDisplayed({ timeout: 5000 });

        const addressClinicAdded = await $('//div[@class="styles_clinicsContainer__1C-y4"]/div[last()]//*/span[@class="styles_text__3aW2M"]');
        await addressClinicAdded.waitForDisplayed({ timeout: 5000 });

        const nameText = await nameClinicAdded.getText();
        const statusText = await statusClinicAdded.getText();
        const addressText = await addressClinicAdded.getText();

        expect(nameText).to.equal(`Clinic ${numberClinic}`);
        expect(statusText).to.equal('Private');
        expect(addressText).to.equal(`Street ${numberClinic}`);

        await browser.reloadSession();
    });
});
