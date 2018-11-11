import { browser } from 'protractor';
import { AppPage } from '../pages/app.po';

describe('Aden App', () => {
  let page: AppPage;

  beforeAll(() => {
    browser.waitForAngularEnabled(false);
  });

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the home page', async () => {
    await page.navigateTo();
    expect(page.getNavbarBrand()).toEqual('Aden');
  });

});
