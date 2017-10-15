import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Post } from "./model";

@Injectable()
export class PostService {

  constructor(private db: AngularFirestore) {
  }

  findAll(): Observable<Post[]> {
    return this.db.collection<Post>('posts').valueChanges();
  }

  findByUrl(url: string): Observable<Post[]> {
    return this.db.collection<Post>('posts', ref => ref.where('url', '==', url)).valueChanges();
  }

}
