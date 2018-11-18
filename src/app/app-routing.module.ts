import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PublicHomeComponent } from './public-home/public-home.component';
import { PublicLoginComponent } from './public-login/public-login.component';
import { PublicPostViewComponent } from './public-post-view/public-post-view.component';
import { AdminPostListComponent } from './admin-post-list/admin-post-list.component';
import { AdminPostFormComponent } from './admin-post-form/admin-post-form.component';
import { AdminPostViewComponent } from './admin-post-view/admin-post-view.component';
import { AdminPostEditComponent } from './admin-post-edit/admin-post-edit.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  /* Redirect */
  { path: '', redirectTo: '/', pathMatch: 'full' },

  /* Public */
  { path: '', component: PublicHomeComponent },
  { path: 'login', component: PublicLoginComponent },
  { path: 'post/:url', component: PublicPostViewComponent },

  /* Admin */
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminPostListComponent },
      { path: 'posts', component: AdminPostListComponent },
      { path: 'new-post', component: AdminPostFormComponent },
      {
        path: 'post',
        children: [
          { path: 'edit/:id', component: AdminPostEditComponent },
          { path: 'view/:id', component: AdminPostViewComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
