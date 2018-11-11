import * as admin from 'firebase-admin';
import { CollectionReference, DocumentSnapshot, QuerySnapshot, WriteResult } from '@google-cloud/firestore';

const serviceAccount = require(process.env.FIREBASE_CREDENTIAL_PATH);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://aden-32b68.firebaseio.com'
});

export class PostService {

    private db: admin.firestore.Firestore;
    private postsRef: CollectionReference;

    constructor() {
        this.db = admin.firestore();
        this.postsRef = this.db.collection('posts');
    }

    findById(id: string): Promise<DocumentSnapshot> {
        return this.postsRef.doc(id).get();
    }

    findAll(): Promise<QuerySnapshot> {
        return this.postsRef.get();
    }

    findByTitle(title: string) {
        return this.postsRef.where('title', '==', title).get();
    }

    findByUrl(url: string) {
        return this.postsRef.where('url', '==', url).get();
    }

    deleteById(id: string): Promise<WriteResult> {
        return this.postsRef.doc(id).delete();
    }
}
