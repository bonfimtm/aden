import * as functions from 'firebase-functions';
import * as slug from 'slug';

export const welcomeMessage = functions.https.onRequest((request, response) => {
    console.log('welcomeMessage');
    response.send('Welcome to Aden Castle Town!');
});

export const createPost = functions.firestore
    .document('posts/{id}')
    .onCreate(event => {
        console.log('createPost');

        const data = event.data();
        const currentTime = new Date().getTime();

        if (!data.title || !data.headline || !data.content) {
            return null;
        }

        const url = slug(data.title.toLowerCase());
        console.log('url', url);

        // Then return a promise of a set operation to update the count
        return event.ref.set({
            url: slug(data.title.toLowerCase()),
            createdAt: currentTime,
            updatedAt: currentTime,
        }, {
                merge: true
            });

    });

export const postChanges = functions.firestore
    .document('posts/{id}')
    .onUpdate((event) => {
        console.log('postChanges');

        // Retrieve the current and previous value
        const before = event.before.data();
        const after = event.after.data();

        // We'll only update if the post has changed.
        // This is crucial to prevent infinite loops.
        if (after.title === before.title &&
            after.subtitle === before.subtitle &&
            after.headline === before.headline &&
            after.content === before.content) {
            return null;
        } else {
            const currentTime = new Date().getTime();
            const newData = {
                updatedAt: currentTime,
            }
            const options = {
                merge: true,
            };
            // Then return a promise of a set operation
            return event.after.ref.set(newData, options);
        }
    });
