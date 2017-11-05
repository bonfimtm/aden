import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Post, setId, mapId } from './model';

@Injectable()
export class PostService {

  private postDoc: AngularFirestoreDocument<Post>;
  private postCollection: AngularFirestoreCollection<Post>;

  constructor(private db: AngularFirestore) {
    this.postCollection = this.db.collection<Post>('posts');
  }

  create(post: Post): Promise<any> {
    return this.postCollection.add(Object.assign({}, post));
  }

  update(post: Post): Promise<void> {
    return this.postCollection.doc(post.id).update(post);
  }

  delete(post: Post): Promise<void> {
    return this.postCollection.doc(post.id).delete();
  }

  findAll(): Observable<Post[]> {
    return this.postCollection.snapshotChanges().map(mapId);
  }

  findById(id: string): Observable<Post> {
    let doc = this.db.doc<Post>('posts/' + id);
    return doc.snapshotChanges().map(action => {
      let data = action.payload.data() as Post;
      const id = action.payload.id;
      data.id = id;
      return data;
    });
  }

  findByUrl(url: string): Observable<Post[]> {
    return this.db.collection<Post>('posts', ref => ref.where('url', '==', url)).valueChanges();
  }

}
