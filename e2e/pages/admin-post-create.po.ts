import { browser, by, element } from 'protractor';

export interface PostFormInterface {
    title: string;
    subtitle: string;
    headline: string;
    content: string;
}

export class AdminPostCreatePage {

    navigateTo() {
        return browser.get('/admin/new-post');
    }

    getTitle() {
        return element(by.css('#title'));
    }

    getSubtitle() {
        return element(by.css('#subtitle'));
    }

    getHeadline() {
        return element(by.css('#headline'));
    }

    getContent() {
        return element(by.css('#content'));
    }

    getSaveButton() {
        return element(by.css('#buttonSave'));
    }

    getDialogMessage() {
        return element(by.css('.swal-text'));
    }

}
