import { browser, by, element } from 'protractor';

export class LoginPage {

    navigateTo() {
        return browser.get('/login');
    }

    getPageHeader() {
        return element(by.css('#pageHeader'));
    }

    getInputEmail() {
        return element(by.css('#email'));
    }

    getInputPassword() {
        return element(by.css('#password'));
    }

    getButtonLogin() {
        return element(by.css('#login'));
    }

}

export interface LoginFormInterface {
    email: string;
    password: string;
}
