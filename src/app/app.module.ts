import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PollComponent} from './poll/poll.component';
import {PollDetailComponent} from './poll-detail/poll-detail.component';
import {UserService} from "./service/user.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgProgressModule} from "ngx-progressbar";
import {NgProgressHttpModule} from "ngx-progressbar/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PollComponent,
    PollDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgProgressModule.withConfig({
      color: 'red',
      spinner: false
    }),
    NgProgressHttpModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
