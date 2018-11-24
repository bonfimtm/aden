import { browser } from 'protractor';
import { AdminPostCreatePage, PostFormInterface } from '../pages/admin-post-create.po';

import * as slug from 'slug';

import { generateUUID } from '../services/uuid-generator';
import { PostService } from '../services/database.service';
import { login, logout } from './login.e2e-spec';

describe('Admin/Post/Create', () => {

    beforeAll(async () => {
        browser.waitForAngularEnabled(false);
        await login();
    });

    it('should create a post', () => createPost());

    afterAll(() => logout());

});

export async function createPost(post?: PostFormInterface) {

    const page = new AdminPostCreatePage();

    if (post === undefined) {
        post = require('../mock-data/post-data').postAirbusDeal;
    }

    const uuid = generateUUID();
    const postTitle = `${post.title} ${uuid}`;

    console.log('Creating post:', postTitle);

    // Navigate to page
    await page.navigateTo();

    await browser.sleep(2000);

    // Fill out form
    await page.getTitle().sendKeys(postTitle);
    await page.getSubtitle().sendKeys(post.subtitle);
    await page.getHeadline().sendKeys(post.headline);
    await page.getContent().sendKeys(post.content);

    // Submit form
    await page.getSaveButton().click();

    await browser.sleep(5000);

    console.log('Asserting post creation');

    PostService.getInstance().findByTitle(postTitle)
        .then(snapshot => {

            // One post shall be created
            expect(snapshot.size).toEqual(1);

            snapshot.forEach(doc => {

                // Debug
                console.log(doc.id);

                const postUrl = slug(postTitle.toLowerCase());
                expect(doc.data().url).toEqual(postUrl);

                // Cleanup
                PostService.getInstance().deleteById(doc.id);
            });
        })
        .catch(err => {
            console.error('Error getting documents', err);
        });
}
