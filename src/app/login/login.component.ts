import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('', [ Validators.required ]);
  password = new FormControl('', [ Validators.required] );
  submitMessage = ' ';
  public bearerToken: any;
  constructor(private _authService: AuthenticationService,
              private routerService: RouterService) { }

  ngOnInit() {
  }
  loginSubmit() {
    this._authService.authenticateUser({'username' : this.username.value, 'password' : this.password.value})
    .subscribe ( res => {
  if ( res ) {
      this.bearerToken = res['token'];
      this._authService.setBearerToken(this.bearerToken);
      this.routerService.routeToDashboard();
    }
    },
    err => {
    if (err.status === 403) {
        this.submitMessage = 'Unauthorized';
      }else {
        this.submitMessage = 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found';
      }
  });
  }
  get_User_Error_Message() {
    return this.username.hasError('required') ? 'You must Enter a user name' :
            ' ';
  }
  get_password_Error_Message() {
    return this.password.hasError('required') ? 'You must Enter the password' :
            ' ';
  }
}
