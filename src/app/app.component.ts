import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SecureBank';
  constructor(public authService: AuthenticationService, private router: Router) {
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }
}
