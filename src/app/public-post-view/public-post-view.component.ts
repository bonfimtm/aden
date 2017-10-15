import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Post } from '../model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-public-post-view',
  templateUrl: './public-post-view.component.html',
  styleUrls: ['./public-post-view.component.css']
})
export class PublicPostViewComponent implements OnInit, OnDestroy {

  private subscription: any;
  private url: string;
  public posts: Observable<Post[]>;

  constructor(private route: ActivatedRoute, private postservice: PostService) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.url = params['url'];
      this.posts = this.postservice.findByUrl(this.url);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
