import { browser, by, element } from 'protractor';

export class AdminPage {

  navigateTo() {
    return browser.get('/admin');
  }

  getButtonLogout() {
    return element(by.css('#logout'));
  }
}
