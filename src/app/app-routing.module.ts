import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './Pages/login-page/login-page.component';
import {TransactionsPageComponent} from './Pages/transactions-page/transactions-page.component';
import {PublicPageComponent} from './Pages/public-page/public-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'transactions', component: TransactionsPageComponent},
  {path: '', component: PublicPageComponent},
  {path: '**', component: PublicPageComponent} // Handle 404 with a silent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
