import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
// import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { PostService } from './services/post.service';
import { BrPipe } from './pipes/br.pipe';
import { AdminPostEditComponent } from './admin-post-edit/admin-post-edit.component';
import { Alert } from 'selenium-webdriver';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

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
    AdminPostEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },  // PathLocationStrategy or HashLocationStrategy
    // { provide: APP_BASE_HREF, useValue: '!' },
    AuthService,
    PostService,
    AlertService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
