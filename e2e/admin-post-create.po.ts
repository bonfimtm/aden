import { browser, by, element } from 'protractor';

export class AdminPostCreatePage {

    navigateTo() {
        const nav = browser.get('/admin/new-post');
        browser.sleep(2000);
        return nav;
    }

    setTitle(keys: string | number) {
        return element(by.css('#title')).sendKeys(keys);
    }

    setSubtitle(keys: string | number) {
        return element(by.css('#subtitle')).sendKeys(keys);
    }

    setHeadline(keys: string | number) {
        return element(by.css('#headline')).sendKeys(keys);
    }

    setContent(keys: string | number) {
        return element(by.css('#content')).sendKeys(keys);
    }

    getSaveButton() {
        return element(by.css('#buttonSave'));
    }

    getDialogMessage() {
        return element(by.css('.swal-text'));
    }
    
}
