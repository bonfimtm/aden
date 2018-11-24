import { browser } from 'protractor';
import { LoginPage, LoginFormInterface } from '../pages/login.po';
import { AdminPage } from '../pages/admin.po';

describe('User authentication', () => {

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
    });

    beforeEach(() => {
    });

    it('should display the login page', async () => {
        const page: LoginPage = new LoginPage();
        await page.navigateTo();
        expect(page.getPageHeader().getText()).toEqual('Login');
    });

    it('should login', () => login());

    afterAll(() => logout());

});

export async function login(loginFormData?: LoginFormInterface) {

    const page: LoginPage = new LoginPage();

    if (loginFormData === undefined) {
        loginFormData = {
            email: 'a@a.com',
            password: 'aaaaaa',
        };
    }

    await page.navigateTo();
    await page.getInputEmail().sendKeys(loginFormData.email);
    await page.getInputPassword().sendKeys(loginFormData.password);
    await page.getButtonLogin().click();
    await browser.sleep(2000);

    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl.endsWith('/admin')).toBeTruthy();
}

export async function logout() {

    const page = new AdminPage();

    await page.navigateTo();
    await browser.sleep(2000);
    await page.getButtonLogout().click();
    await browser.sleep(2000);

    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl.endsWith('/')).toBeTruthy();
}
