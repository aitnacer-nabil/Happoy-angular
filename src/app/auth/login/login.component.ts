import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../service/auth/authentication.service";
import {TokenResponse} from "../../service/auth/TokenResponse";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public routes = routes;
  public Toggledata = true;
  loginForm: FormGroup;
  private jwtHelper = new JwtHelperService();

  constructor(public router:Router,private authService: AuthenticationService){
    console.log('Login Module Loaded');
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

  }
  path(){
    this.router.navigate([routes.dashboard])
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;


  }
  login() {
    const usernameControl = this.loginForm.get('username');
    const passwordControl = this.loginForm.get('password');

    if (usernameControl && passwordControl) {
      const username = usernameControl.value;
      const password = passwordControl.value;
      console.log('Username: ' + username);
      console.log('Password: ' + password);

      this.authService.login(username, password).subscribe(
        response => {
          console.log(JSON.parse(JSON.stringify(response)));
          const tokenResponse: TokenResponse = JSON.parse(JSON.stringify(response));
          console.log(tokenResponse.access_token);
          console.log(tokenResponse.expires_in);
          console.log(tokenResponse.refresh_expires_in);

          const decodedToken = this.jwtHelper.decodeToken(tokenResponse.access_token);
          const userId = decodedToken.sub;
          console.log('User ID:', userId);
          this.authService.saveToken(tokenResponse.access_token,tokenResponse.refresh_token);
          this.authService.getUser(userId).subscribe(
            user => {
              console.log(JSON.parse(JSON.stringify(user)));
              const user1 = JSON.parse(JSON.stringify(user));
              this.authService.addUserToLocalStorage(user1);
              this.router.navigate([routes.dashboard]);

            },
            error => {
              console.log(error);
            }
          );

        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
