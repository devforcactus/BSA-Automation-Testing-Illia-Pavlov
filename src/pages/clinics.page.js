const { Input, Button, Field } = require('../elements')

class ClinicsPage {
    constructor() {
        this.addButton = new Button('button.styles_primary-dark__1WnyR');

        this.nameClinic = new Input('input[name="name"]');
        this.addressClinic = new Input('input[name="address"]');

        this.statusClinicDdl = new Button('div.selectStyles__control', 0);
        this.cityClinicDdl = new Button('div.selectStyles__control', 1);

        this.ddlOption = new Button('div.selectStyles__option=TEXT_TO_REPLACE');

        this.submitButton = new Button('button[type="submit"]');

        const div = '//div[@class="styles_clinicsContainer__1C-y4"]/div[last()]//*/';
        this.nameClinicAdded = new Field(`${div}span[@class="styles_title__3xRcc"]`);
        this.statusClinicAdded = new Field(`${div}span[@class="styles_label__BkQx3 styles_textCapitalize__R-4ql"]`);
        this.addressClinicAdded = new Field(`${div}span[@class="styles_text__3aW2M"]`);
    }

    async addClinic({ name, address, status, city }) {

        await this.addButton.click();

        await this.nameClinic.setValue(name);
        await this.addressClinic.setValue(address);

        await this.statusClinicDdl.click();
        await this.ddlOption.clickByText(status);

        await this.cityClinicDdl.click();
        await this.ddlOption.clickByText(city);

        await this.submitButton.click();

        await browser.pause(500);

    }

    async getInfo() {
        return {
            nameText: await this.nameClinicAdded.getText(),
            statusText: await this.statusClinicAdded.getText(),
            addressText: await this.addressClinicAdded.getText()
        }
    }

}

module.exports = { ClinicsPage };