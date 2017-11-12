import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../model';
import { PostService } from '../post.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-admin-post-form',
  templateUrl: './admin-post-form.component.html',
  styleUrls: ['./admin-post-form.component.css']
})
export class AdminPostFormComponent implements OnInit, OnDestroy {

  public post: Post;
  public saving = false;

  constructor(private postService: PostService, private alert: AlertService) {
    this.prepareCreate();
  }

  ngOnInit() {
  }

  prepareCreate() {
    console.log('prepare create post');
    this.post = new Post();
  }

  onSubmit(form: NgForm): void {
    this.create();
  }

  create() {
    console.log('create post');
    this.saving = true;
    this.postService.create(this.post)
      .then(docRef => {
        console.log('Post written with ID: ', docRef.id, docRef);
        this.saving = false;
        this.prepareCreate();
        this.alert.info('Post created 🕺');
      })
      .catch(error => {
        console.error('Error adding post: ', error);
        this.saving = false;
        this.alert.info('Something went wrong ☹️');
      });
  }

  ngOnDestroy() {
  }

}
