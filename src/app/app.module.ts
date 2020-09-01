import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { TransactionsPageComponent } from './Pages/transactions-page/transactions-page.component';
import { PublicPageComponent } from './Pages/public-page/public-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginSmartComponent } from './SmartComponents/login-smart/login-smart.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthBearerInterceptor} from './GuardsInterceptors/auth-bearer.interceptor';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { TransactionViewComponent } from './ReusableViewComponents/transaction-view/transaction-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TransactionsPageComponent,
    PublicPageComponent,
    LoginSmartComponent,
    TransactionViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthBearerInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
