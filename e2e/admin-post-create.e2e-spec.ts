import { browser, element } from 'protractor';
import { AdminPostCreatePage } from './admin-post-create.po';
import { AdminPostListPage } from './admin-post-list.po';
import { postOne } from './post-data';

describe('Post', () => {

    let pageCreate: AdminPostCreatePage;
    let pageList: AdminPostListPage;

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
    });

    beforeEach(() => {
        pageCreate = new AdminPostCreatePage();
        pageList = new AdminPostListPage();
    });

    it('should create a post', () => {

        pageCreate.navigateTo();
        pageCreate.setTitle(postOne.title);
        pageCreate.setSubtitle(postOne.subtitle);
        pageCreate.setHeadline(postOne.headline);
        pageCreate.setContent(postOne.content);

        pageCreate.getSaveButton().click();
        browser.sleep(5000);

        expect(pageCreate.getDialogMessage().getText()).toContain('Post created');

        pageList.navigateTo();
        expect(pageList.getList()).toContain(postOne.title);
    });

});
