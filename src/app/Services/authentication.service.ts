import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserInfo} from '../Models/user-info';
import {ApiService} from './API/api.service';
import {distinctUntilChanged} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _userInfo$ = new BehaviorSubject<UserInfo>(null);
  // Public Streams (nobody can next them by mistake)
  public isLoggedIn$ = this._isLoggedIn$.pipe(distinctUntilChanged());
  public userInfo$ = this._userInfo$.pipe(distinctUntilChanged());
  // Public Synchronous
  public isLoggedIn = this._isLoggedIn$.getValue();
  public userInfo = this._userInfo$.getValue();

  constructor(private api: ApiService, private router: Router) { }

  public logIn(user: string, pass: string): Observable<any> {
    return new Observable(subscriber => {
      this.api.getToken(user, pass).subscribe(
        token => {
          // Response is 200 OK, Login Successfully
          this._userInfo$.next({userName: user, token: token.accessToken});
          this._isLoggedIn$.next(true);
          // Shared Controller logic of all components that will do LogIn
          this.router.navigate(['/transactions']);
          // Complete
          subscriber.next(token.accessToken);
          subscriber.complete();
        }, // On Error handle and reThrow
        (errorMessage: string) => {
          this._isLoggedIn$.next(false);
          this._userInfo$.next(null);
          // Error re-throw
          subscriber.error(errorMessage);
        }
      );
    });
  }
}
