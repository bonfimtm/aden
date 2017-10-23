import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as slug from 'slug/slug.js';

import { Post } from '../model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-admin-post-form',
  templateUrl: './admin-post-form.component.html',
  styleUrls: ['./admin-post-form.component.css']
})
export class AdminPostFormComponent implements OnInit, OnDestroy {

  private subscription: any;
  private id: string;
  public post: Post;

  constructor(private route: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id === undefined) {
        this.prepareCreate();
      } else {
        this.prepareEdit();
      }
    });
  }

  prepareCreate() {
    console.log('prepare create post');
    this.post = new Post();
  }

  prepareEdit() {
    console.log('prepare edit post');
  }

  onSubmit(form: NgForm): void {
    console.log('post', this.post);
    if (this.id === undefined) {
      this.create();
    } else {
      this.edit();
    }
  }

  create() {
    console.log('create post');
    this.postService.create(this.post)
      .then(docRef => {
        console.log('Post written with ID: ', docRef.id, docRef);
        this.post = new Post();
        alert('Post created 🕺');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
        alert('Something went wrong ☹️');
      });
  }

  edit() {
    console.log('edit post');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
