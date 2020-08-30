import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {Router} from '@angular/router';
import {ApiService} from './API/api.service';
import {Observable} from 'rxjs';
import {TokenResponse} from './API/Models/token-response';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    // Shared Arrange
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: ApiService, useClass: class extends ApiService{
            getToken(user: string, pass: string): Observable<TokenResponse>{
              return new Observable<TokenResponse>(subscriber => {
                if (pass === 'ok'){
                  subscriber.next({accessToken: 'testTokenOK'});
                  subscriber.complete();
                }
                else {
                  subscriber.error('testError');
                }
              });
            }
        }},
        {provide: Router, useClass: class { navigate = jasmine.createSpy(); } }
      ]});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to /transactions when LogIn', () => {
    // Arrange
    const router = TestBed.inject(Router); // Get the spy router instance
    // Act
    service.logIn('test', 'ok').subscribe(act => {});
    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['/transactions']);
  });
});
