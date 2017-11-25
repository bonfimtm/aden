import * as admin from "firebase-admin";
import { CollectionReference, QuerySnapshot } from "@google-cloud/firestore";

var serviceAccount = require("../../aden-32b68-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aden-32b68.firebaseio.com"
});

export class PostService {

    private db: admin.firestore.Firestore;
    private postsRef: CollectionReference;

    constructor() {
        this.db = admin.firestore();
        this.postsRef = this.db.collection('posts');
    }

    findAll(): Promise<QuerySnapshot> {
        return this.postsRef.get();
    }
    
    findByTitle(title: string) {
        return this.postsRef.where('title', '==', title).get();
    }
}
