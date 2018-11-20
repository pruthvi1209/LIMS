import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './router.service';
import { MaterialModule } from './material.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BooksFetch } from './booksFetch.service';
import { HttpModule } from '@angular/http';
import { BookShelfComponent } from './book-shelf/book-shelf.component';
import { AuthComponent } from './auth/auth.component';
import { AdminProfileComponent } from './adminProfile/adminProfile.component';
import { UserLoginComponent } from './auth/userLogin/userLogin.component';
import { SignUpComponent } from './auth/signUp/signUp.component';
import { UserService } from './user.service';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { BookDetailsComponent } from './bookDetails/bookDetails.component';
import { AuthService } from './auth/auth.service';
import { UIService } from '../shared/ui.service';
import { NewBookComponent } from './adminProfile/newBook/newBook.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SearchBarComponent,
    BookShelfComponent,
    AuthComponent,
    AdminProfileComponent,
    UserLoginComponent,
    SignUpComponent,
    UserProfileComponent,
    BookDetailsComponent,
    NewBookComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [BooksFetch, UserService, AuthService, UIService],
  entryComponents: [BookShelfComponent, AuthComponent, SignUpComponent, BookDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
