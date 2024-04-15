import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {routes} from 'src/app/core/helpers/routes/routes';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../service/user/User";
import {AuthenticationService} from "../../service/auth/authentication.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public routes = routes;
  public Toggledata = false;
  signupForm: FormGroup;

  constructor(public router: Router,private authService: AuthenticationService) {
    this.signupForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });

  }

  path() {
    this.router.navigate([routes.login])
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;

  }

  signup() {
    const usernameControl = this.signupForm.get('username');
    const passwordControl = this.signupForm.get('password');
    const emailControl = this.signupForm.get('email');
    const firstNameControl = this.signupForm.get('firstName');
    const lastNameControl = this.signupForm.get('lastName');

    if (usernameControl && passwordControl && emailControl && firstNameControl && lastNameControl) {
      const user: User = {
        id: '',
        userName: usernameControl.value,
        password: passwordControl.value,
        email: emailControl.value,
        firstName: firstNameControl.value,
        lastName: lastNameControl.value
      };
      console.log('User:', user);
      this.authService.register(user).subscribe(
        response => {
          console.log(JSON.parse(JSON.stringify(response)));
          this.router.navigate([routes.login]);

        },
        error => {
          console.log(error);
        }
      );
    }

  }

}
