import { browser } from 'protractor';
import { AdminPostCreatePage, PostFormInterface } from '../pages/admin-post-create.po';

// TODO Test post URL generation
// import * as slug from 'slug';

import { generateUUID } from '../services/uuid-generator';
import { postOne, postTwo, postThree } from '../mock-data/post-data';
import { PostService } from '../services/database.service';

describe('Admin/Post/Create', () => {

    let service: PostService;
    let page: AdminPostCreatePage;

    beforeAll(() => {
        browser.waitForAngularEnabled(false);
        service = new PostService();
    });

    beforeEach(() => {
        page = new AdminPostCreatePage();
    });

    it('should create post one', () => createPost(postOne));
    it('should create post two', () => createPost(postTwo));
    it('should create post three', () => createPost(postThree));

    async function createPost(post: PostFormInterface) {

        const uuid = generateUUID();
        const postTitle = `${post.title} ${uuid}`;

        console.log('Creating post:', postTitle);

        // Navigate to page
        await page.navigateTo();

        // Fill out form
        await page.getTitle().sendKeys(postTitle);
        await page.getSubtitle().sendKeys(post.subtitle);
        await page.getHeadline().sendKeys(post.headline);
        await page.getContent().sendKeys(post.content);

        // Submit form
        await page.getSaveButton().click();

        await browser.sleep(10000);

        console.log('Asserting post creation');

        service.findByTitle(postTitle)
            .then(snapshot => {

                // One post shall be created
                expect(snapshot.size).toEqual(1);

                snapshot.forEach(doc => {

                    // Debug
                    console.log(doc.id);

                    // TODO An URL shall be generated for the post
                    // const postUrl = slug(postTitle.toLowerCase());
                    // expect(doc.data().url).toEqual(postUrl);

                    // Cleanup
                    service.deleteById(doc.id);
                });
            })
            .catch(err => {
                console.error('Error getting documents', err);
            });
    }

});
