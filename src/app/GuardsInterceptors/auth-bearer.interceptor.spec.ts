import { TestBed } from '@angular/core/testing';

import { AuthBearerInterceptor } from './auth-bearer.interceptor';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthBearerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [
      AuthBearerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthBearerInterceptor = TestBed.inject(AuthBearerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
