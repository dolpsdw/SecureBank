import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    // providers: []
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to /login when unAuthenticated user lands in /transaction', () => {
    // Arrange
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate');
    // Act calling guard.canActivate will enable to test the routerSpy
    expect(guard.canActivate({} as any, {url: 'transactions'} as RouterStateSnapshot)).toBe(false);
    // Assert
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
