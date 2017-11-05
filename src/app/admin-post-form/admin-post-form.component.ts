import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
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

  constructor(private route: ActivatedRoute, private location: Location, private postService: PostService) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id === undefined) {
        this.prepareCreate();
      } else {
        this.prepareEdit(this.id);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (this.post.id === undefined) {
      this.create();
    } else {
      this.edit();
    }
  }

  get isEdit() {
    return this.post.id;
  }

  get isReady() {
    return !this.id || this.isEdit;
  }

  prepareCreate() {
    console.log('prepare create post');
    this.post = new Post();
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
        console.error('Error adding post: ', error);
        alert('Something went wrong ☹️');
      });
  }

  prepareEdit(id) {
    console.log('prepare edit post');
    this.post = new Post();
    this.postService.findById(id)
      .forEach(post => {
        console.log('post', post);
        this.post = post;
      })
      .catch(error => {
        this.id = undefined;
        alert('Post not found 🤷‍');
      });
  }

  edit() {
    console.log('edit post');
    this.postService.update(this.post)
      .then(_ => {
        console.log('Post updated');
        this.post = new Post();
        alert('Post updated 💃🏻');
      })
      .catch(error => {
        console.error('Error updating post: ', error);
        alert('Something went wrong 😧');
      });
  }

  delete() {
    console.log('delete post');
    this.postService.delete(this.post)
      .then(success => {
        console.log('Post deleted: ', success);
        alert('Post deleted 👍🏻');
      })
      .catch(error => {
        console.error('Error deleting post: ', error);
        alert('Something went wrong 😩');
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
