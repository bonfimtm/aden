import { browser, element } from 'protractor';
import { AdminPostCreatePage } from '../pages/admin-post-create.po';
import { AdminPostListPage } from '../pages/admin-post-list.po';

import { generateUUID } from '../services/uuid-generator';
import { postTwo } from '../mock-data/post-data';
import { PostService } from '../services/storage.service';

describe('Admin/Post', () => {

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

        const post = postTwo;
        const uuid = generateUUID();
        const postTitle = `${post.title} ${uuid}`;

        console.log(postTitle);

        pageCreate.navigateTo();
        pageCreate.getTitle().sendKeys(postTitle);
        pageCreate.getSubtitle().sendKeys(post.subtitle);
        pageCreate.getHeadline().sendKeys(post.headline);
        pageCreate.getContent().sendKeys(post.content);

        pageCreate.getSaveButton().click();
        browser.sleep(5000);

        const service = new PostService();

        expect(pageCreate.getDialogMessage().getText()).toContain('Post created')
            .then(_ => {
                return service.findByTitle(postTitle);
            })
            .then(snapshot => {
                console.log(snapshot.size);
                expect(snapshot.size).toEqual(1);
                snapshot.forEach(doc => {
                    console.log(doc.id);
                    service.deleteById(doc.id);
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    });

});
