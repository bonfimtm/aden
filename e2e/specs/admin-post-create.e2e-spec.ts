import { browser, element } from 'protractor';
import { AdminPostCreatePage, PostFormInterface } from '../pages/admin-post-create.po';

import * as slug from 'slug';

import { generateUUID } from '../services/uuid-generator';
import { postOne, postTwo, postThree } from '../mock-data/post-data';
import { PostService } from '../services/storage.service';

describe('Admin/Post/Create', () => {

    let page: AdminPostCreatePage;

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
    });

    beforeEach(() => {
        page = new AdminPostCreatePage();
    });

    it('should create post one', () => createPost(postOne));
    it('should create post two', () => createPost(postTwo));
    it('should create post three', () => createPost(postThree));

    function createPost(post: PostFormInterface) {
        const uuid = generateUUID();
        const postTitle = `${post.title} ${uuid}`;

        console.log(postTitle);

        page.navigateTo();

        // Fill out form
        page.getTitle().sendKeys(postTitle);
        page.getSubtitle().sendKeys(post.subtitle);
        page.getHeadline().sendKeys(post.headline);
        page.getContent().sendKeys(post.content);

        // Submit form
        page.getSaveButton().click();
        browser.sleep(2000);

        const service = new PostService();

        expect(page.getDialogMessage().getText()).toContain('Post created')
            .then(_ => {
                // Query post by URL
                return service.findByTitle(postTitle);
            })
            .then(snapshot => {

                // One post shall be created
                expect(snapshot.size).toEqual(1);

                snapshot.forEach(doc => {

                    // Debug
                    console.log(doc.id);

                    // An URL shall be generated for the post
                    const postUrl = slug(postTitle.toLowerCase());
                    expect(doc.data().url).toEqual(postUrl);

                    // Cleanup
                    service.deleteById(doc.id);
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

});
