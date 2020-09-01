import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSmartComponent } from './login-smart.component';
import {AuthenticationService} from '../../Services/authentication.service';
import {Observable} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {skip, take} from 'rxjs/operators';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

describe('LoginSmartComponent', () => {
  let component: LoginSmartComponent;
  let fixture: ComponentFixture<LoginSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSmartComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error when user do invalid login', (done) => {
    // Arrange
    const authService = fixture.debugElement.injector.get(AuthenticationService);
    const authServiceSpy = spyOn(authService, 'logIn');
    authServiceSpy.and.returnValue(new Observable(subscriber => {
      subscriber.error('testError');
    }));
    component.displayServerError$.pipe(
      skip(1), // First Emission will be for Clear error
      take(1))
      .subscribe(err => assert(err + ''));
    // Act
    component.loginForm.setValue({user: 'user', pass: 'invalidPass'});
    component.onSubmit();
    // Assert
    function assert(errorMessage: string): void{
      expect(errorMessage).toBe('testError');
      done();
    }
  });
});
