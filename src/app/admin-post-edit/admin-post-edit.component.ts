import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../model';
import { PostService } from '../post.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-admin-post-edit',
  templateUrl: './admin-post-edit.component.html',
  styleUrls: ['./admin-post-edit.component.scss']
})
export class AdminPostEditComponent implements OnInit, OnDestroy {

  private subscription: any;
  public post: Post;
  public failed = false;
  public saving = false;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService, private alert: AlertService) {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.prepareEdit(id);
      }
    });
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    this.edit();
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
        this.failed = true;
      });
  }

  edit() {
    console.log('edit post');
    this.saving = true;
    this.postService.update(this.post)
      .then(_ => {
        console.log('Post updated');
        this.saving = false;
        this.alert.success('Post updated 💃🏻');
      })
      .catch(error => {
        console.error('Error updating post: ', error);
        this.saving = false;
        this.alert.error('Something went wrong 😧');
      });
  }

  get ready() {
    return this.post && this.post.id;
  }

  delete() {
    console.log('delete post');
    this.router.navigate(['admin/posts']);
    this.postService.delete(this.post)
      .then(success => {
        console.log('Post deleted: ', success);
        this.alert.info('Post deleted 👍🏻');
      })
      .catch(error => {
        console.error('Error deleting post: ', error);
        this.alert.error('Something went wrong 😩');
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
