import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    const nav = browser.get('/');
    browser.sleep(2000);
    return nav;
  }

  getNavbarBrand() {
    return element(by.css('.navbar-brand')).getText();
  }
}
