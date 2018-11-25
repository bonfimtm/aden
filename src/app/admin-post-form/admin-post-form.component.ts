import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../app-model';
import { PostService } from '../services/post.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-admin-post-form',
  templateUrl: './admin-post-form.component.html',
  styleUrls: ['./admin-post-form.component.css']
})
export class AdminPostFormComponent implements OnInit, OnDestroy {

  public post: Post;
  public saving = false;

  constructor(private postService: PostService, private toaster: ToasterService) {
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
        this.toaster.info('Post created 🕺');
      })
      .catch(error => {
        console.error('Error adding post: ', error);
        this.saving = false;
        this.toaster.error('Something went wrong ☹️');
      });
  }

  ngOnDestroy() {
  }

}
