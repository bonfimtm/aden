import { browser, by, element } from 'protractor';

export class AdminPostListPage {

    navigateTo() {
        const nav = browser.get('/admin/posts');
        browser.sleep(5000);
        return nav;
    }

    getList() {
        return element(by.css('#listPost')).getText();
    }
}
