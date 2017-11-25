import { browser, element } from 'protractor';
import { AdminPostCreatePage } from './admin-post-create.po';
import { AdminPostListPage } from './admin-post-list.po';
import { postThree } from './post-data';

import { PostService } from './firebase';

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
        pageCreate.setTitle(postThree.title);
        pageCreate.setSubtitle(postThree.subtitle);
        pageCreate.setHeadline(postThree.headline);
        pageCreate.setContent(postThree.content);

        pageCreate.getSaveButton().click();
        browser.sleep(5000);

        expect(pageCreate.getDialogMessage().getText()).toContain('Post created');

        const service = new PostService()

        service.findByTitle(postThree.title)
            .then(snapshot => {
                expect(snapshot.size).toBeGreaterThan(0);
                snapshot.forEach(doc => {
                    console.log(doc.id, doc.data());
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    });

});
