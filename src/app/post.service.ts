import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Post } from './model';

@Injectable()
export class PostService {

  private postCollection: AngularFirestoreCollection<Post>;

  constructor(private db: AngularFirestore) {
    this.postCollection = this.db.collection<Post>('posts');
  }

  findAll(): Observable<Post[]> {
    return this.postCollection.valueChanges();
  }

  findByUrl(url: string): Observable<Post[]> {
    return this.db.collection<Post>('posts', ref => ref.where('url', '==', url)).valueChanges();
  }

  createPost(post: Post): Promise<any> {
    return this.postCollection.add(Object.assign({}, post));
  }

}
