import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../Services/authentication.service';

@Component({
  selector: 'app-login-smart',
  templateUrl: './login-smart.component.html',
  styleUrls: ['./login-smart.component.css']
})
export class LoginSmartComponent implements OnInit {
  hidePass = true;
  userFormControl = new FormControl('', [Validators.required]);
  passFormControl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    user: this.userFormControl,
    pass: this.passFormControl
  });

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.auth.logIn(this.loginForm.value.user, this.loginForm.value.pass).subscribe(ok=>console.log("need sub"));
  }
}
