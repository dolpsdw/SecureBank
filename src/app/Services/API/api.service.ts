import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
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
    return this.http.post<TokenResponse>(this.endpoint + 'token', body);
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
