import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
