import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { TransactionsPageComponent } from './Pages/transactions-page/transactions-page.component';
import { PublicPageComponent } from './Pages/public-page/public-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TransactionsPageComponent,
    PublicPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
