import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Post } from '../app-model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-admin-post-list',
  templateUrl: './admin-post-list.component.html',
  styleUrls: ['./admin-post-list.component.css']
})
export class AdminPostListComponent implements OnInit {

  public posts: Observable<Post[]>;

  constructor(private postService: PostService) {
    this.posts = postService.findAll();
  }

  ngOnInit() {
  }

}
