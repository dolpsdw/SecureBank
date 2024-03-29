import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './Pages/login-page/login-page.component';
import {TransactionsPageComponent} from './Pages/transactions-page/transactions-page.component';
import {PublicPageComponent} from './Pages/public-page/public-page.component';
import {AuthGuard} from './GuardsInterceptors/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'transactions', component: TransactionsPageComponent, canActivate: [AuthGuard]},
  {path: '', component: PublicPageComponent, pathMatch: 'full'},
  {path: '**', component: PublicPageComponent, pathMatch: 'full'} // Handle 404 with a silent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
