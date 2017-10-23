import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Post, mapId } from './model';

@Injectable()
export class PostService {

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

  findByUrl(url: string): Observable<Post[]> {
    return this.db.collection<Post>('posts', ref => ref.where('url', '==', url)).snapshotChanges().map(mapId);
  }

}
