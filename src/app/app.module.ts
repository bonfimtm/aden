import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PublicNavbarComponent } from './public-navbar/public-navbar.component';
import { PublicHomeComponent } from './public-home/public-home.component';
import { PublicPostViewComponent } from './public-post-view/public-post-view.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminPostListComponent } from './admin-post-list/admin-post-list.component';
import { AdminPostFormComponent } from './admin-post-form/admin-post-form.component';
import { AdminPostViewComponent } from './admin-post-view/admin-post-view.component';
import { PublicLoginComponent } from './public-login/public-login.component';
import { PostService } from "./post.service";
import { BrPipe } from './br.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PublicNavbarComponent,
    PublicHomeComponent,
    AdminNavbarComponent,
    AdminPostListComponent,
    AdminPostFormComponent,
    AdminPostViewComponent,
    PublicLoginComponent,
    BrPipe,
    PublicPostViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },  // PathLocationStrategy or HashLocationStrategy
    { provide: APP_BASE_HREF, useValue: '!' },
    PostService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
