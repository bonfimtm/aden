const functions = require('firebase-functions');
const slug = require('slug');

exports.welcomeMessage = functions.https.onRequest((request, response) => {
  console.log('welcomeMessage');
  response.send('Welcome to Aden Castle Town!');
});

exports.createPost = functions.firestore
  .document('posts/{id}')
  .onCreate(event => {
    console.log('createPost');

    const data = event.data.data();
    const currentTime = new Date().getTime();

    if (!data.title || !data.headline || !data.content) {
      return;
    }

    // Then return a promise of a set operation to update the count
    return event.data.ref.set({
      url: slug(data.title.toLowerCase()),
      createdAt: currentTime,
      updatedAt: currentTime,
    }, {
      merge: true
    });

  });

// Listen for updates to any `post` document.
exports.postChanges = functions.firestore
  .document('posts/{id}')
  .onUpdate((event) => {
    console.log('postChanges');

    // Retrieve the current and previous value
    const data = event.data.data();
    const previousData = event.data.previous.data();
    const currentTime = new Date().getTime();

    // We'll only update if the post has changed.
    // This is crucial to prevent infinite loops.
    if (data.title === previousData.title &&
      data.subtitle === previousData.subtitle &&
      data.headline === previousData.headline &&
      data.content === previousData.content) return;

    // Then return a promise of a set operation
    return event.data.ref.set({
      updatedAt: currentTime,
    }, {
      merge: true
    });
  });
