import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, mapId } from '../app-model';

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
    return this.postCollection.snapshotChanges().pipe(map(mapId));
  }

  findById(id: string): Observable<Post> {
    const doc = this.db.doc<Post>('posts/' + id);
    return doc.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Post;
        data.id = action.payload.id;
        return data;
      })
    );
  }

  findByUrl(url: string): Observable<Post[]> {
    return this.db.collection<Post>('posts', ref => ref.where('url', '==', url)).valueChanges();
  }

}
