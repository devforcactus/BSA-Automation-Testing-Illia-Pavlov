const { Input, Button, Field } = require('../elements')

class ProfilePage {
    constructor() {
        this.homeButton = new Button('div.header_logoLabel___s7O3');

        this.editButton = new Button('button.styles_edit__ftuHl');

        this.birthDateProfileField = new Button('input[name="birthdate"]');
        this.birthDate = new Button('div[aria-label="TEXT_TO_REPLACE"]');

        this.userNameProfileField = new Input('input.styles_textInput__3q_vf[name="name"]');
        this.surnameProfileField = new Input('input.styles_textInput__3q_vf[name="surname"]');

        this.phoneProfileField = new Input('input.styles_textInput__3q_vf[name="phone"]');
        this.emailProfileField = new Input('input[name="email"]');

        this.genderProfileDdl = new Button('form.styles_editForm__1rOFS div.selectStyles__control', 0);
        this.statusProfileDdl = new Button('form.styles_editForm__1rOFS div.selectStyles__control', 1);

        this.ddlOption = new Button('div.selectStyles__option=TEXT_TO_REPLACE');

        this.submitButton = new Button('form.styles_editForm__1rOFS button[type="submit"]');

        this.specialtyDdl = new Button('div.selectStyles', 0);
        this.clinicDdl = new Button('div.selectStyles', 1);

        this.buttonSpecialtySave = new Button('button.styles_primary-dark__1WnyR', 0);
        this.buttonClinicSave = new Button('button.styles_primary-dark__1WnyR', 1);

        this.statusField = new Field('div.styles_card__3sdTL');
        this.nameField = new Field('span.styles_name__2vTNE');
        this.sexField = new Field('span.styles_sex__sjUSu');
        this.dateField = new Field('span.styles_date__2rFkK');
        this.phoneField = new Field('//div[@class="styles_item__27jsh"][1]/a[@class="styles_text__1HrCV"]');
        // this.mailField = new Field('//div[@class="styles_item__27jsh"][2]/a[@class="styles_text__1HrCV"]');

        this.specialtyField = new Field('div.css-1wa3eu0-placeholder');
        this.clinicField = new Field('div.css-1uccc91-singleValue');
    }

    async editProfileInfo({ name, surname, phone, email, gender, status, birthDate }) {

        await this.editButton.click();

        await this.birthDateProfileField.click();
        await this.birthDate.clickByText(birthDate);

        await this.statusProfileDdl.click();
        await this.ddlOption.clickByText(status);

        await this.genderProfileDdl.click();
        await this.ddlOption.clickByText(gender);

        await this.userNameProfileField.setValue(name)
        await this.surnameProfileField.setValue(surname);
        await this.phoneProfileField.setValue(phone);
        // await this.emailProfileField.setValue(email);

        await this.submitButton.click();

        await browser.pause(500);
    }

    async editSpecClinicInfo({ specialty, clinic }) {

        await this.specialtyDdl.click();
        await this.ddlOption.clickByText(specialty);

        await this.clinicDdl.click();
        await this.ddlOption.clickByText(clinic);

        await this.buttonSpecialtySave.click();
        await this.buttonClinicSave.click();

        await browser.pause(500);
    }

    async goToHome() {
        await this.homeButton.click();
    }

    async getProfileInfo() {
        return {
            statusText: await this.statusField.getText(),
            nameText: await this.nameField.getText(),
            sexText: await this.sexField.getText(),
            dateText: await this.dateField.getText(),
            phoneText: await this.phoneField.getText(),
            // mailText: await this.mailField.getText(),
        }
    }

    async getSpecClinicInfo() {
        return {
            specialtyText: await this.specialtyField.getText(),
            clinicText: await this.clinicField.getText()
        }
    }

}

module.exports = { ProfilePage };