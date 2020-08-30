import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TokenResponse} from './Models/token-response';
import {TokenRequest} from './Models/token-request';
import {Transaction} from './Models/transaction';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly endpoint = 'https://us-central1-code-challenge-e9f47.cloudfunctions.net/app/';

  constructor(private http: HttpClient) { }

  public getToken(user: string, pass: string): Observable<TokenResponse>{
    const body: TokenRequest = {
      username: user,
      password: pass
    };
    return new Observable<TokenResponse>(subscriber => {
      this.http.post<TokenResponse>(this.endpoint + 'token', body).subscribe(
        tokenResponse => {
          subscriber.next(tokenResponse);
          subscriber.complete();
        },
        (httpError: HttpErrorResponse) => {
          if (httpError.status === 401){
            subscriber.error('User or Password is Wrong');
          }
          subscriber.error('Unknown Error');
        }
      );
    });
  }

  public getTransactions(sort?: string, description?: string): Observable<Transaction[]>{
    const params = new HttpParams();
    if (sort === 'asc' || sort === 'desc'){
      params.append('sort', sort);
    }
    if (description){
      params.append('description', description);
    }
    return this.http.get<Transaction[]>(this.endpoint + 'transactions', {params});
  }
}
