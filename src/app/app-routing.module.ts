import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './Pages/login-page/login-page.component';
import {TransactionsPageComponent} from './Pages/transactions-page/transactions-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'login', component: TransactionsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
