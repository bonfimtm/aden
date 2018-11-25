import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminPostEditComponent } from './admin-post-edit/admin-post-edit.component';
import { AdminPostFormComponent } from './admin-post-form/admin-post-form.component';
import { AdminPostListComponent } from './admin-post-list/admin-post-list.component';
import { AdminPostViewComponent } from './admin-post-view/admin-post-view.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrPipe } from './pipes/br.pipe';
import { PublicHomeComponent } from './public-home/public-home.component';
import { PublicLoginComponent } from './public-login/public-login.component';
import { PublicNavbarComponent } from './public-navbar/public-navbar.component';
import { PublicPostViewComponent } from './public-post-view/public-post-view.component';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { ToasterService } from './services/toaster.service';


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
    ToasterService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
