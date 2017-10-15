import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Post } from '../model';
import { PostService } from "../post.service";

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.css']
})
export class PublicHomeComponent implements OnInit {

  public title = 'Aden';
  public posts: Observable<Post[]>;

  constructor(private postService: PostService) {
    this.posts = postService.findAll();
  }

  ngOnInit() {
  }

}
