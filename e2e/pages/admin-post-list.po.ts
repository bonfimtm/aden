import { browser, by, element } from 'protractor';

export class AdminPostListPage {

    navigateTo() {
        return browser.get('/admin/posts');
    }

    getList() {
        return element(by.css('#listPost')).getText();
    }
}
