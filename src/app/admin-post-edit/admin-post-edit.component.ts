import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../app-model';
import { PostService } from '../services/post.service';
import { ToasterService } from '../services/toaster.service';

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
  public deleting = false;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService, private toaster: ToasterService) {
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
        this.toaster.success('Post updated 💃🏻');
      })
      .catch(error => {
        console.error('Error updating post: ', error);
        this.saving = false;
        this.toaster.error('Something went wrong 😧');
      });
  }

  get ready() {
    return this.post && this.post.id;
  }

  delete() {
    console.log('delete post');
    this.deleting = true;
    this.postService.delete(this.post)
      .then(success => {
        console.log('Post deleted: ', success);
        this.deleting = false;
        this.toaster.info('Post deleted 👍🏻');
        this.router.navigate(['admin/posts']);
      })
      .catch(error => {
        console.error('Error deleting post: ', error);
        this.deleting = false;
        this.toaster.error('Something went wrong 😩');
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
