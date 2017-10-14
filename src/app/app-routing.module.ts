import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PublicHomeComponent } from './public-home/public-home.component';
import { AdminPostListComponent } from './admin-post-list/admin-post-list.component';
import { AdminPostFormComponent } from './admin-post-form/admin-post-form.component';
import { AdminPostViewComponent } from './admin-post-view/admin-post-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PublicHomeComponent },
  { path: 'admin/posts', component: AdminPostListComponent },
  { path: 'admin/post/view', component: AdminPostViewComponent },
  { path: 'admin/post/view/:id', component: AdminPostViewComponent },
  { path: 'admin/post', component: AdminPostFormComponent },
  { path: 'admin/post/:id', component: AdminPostFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
