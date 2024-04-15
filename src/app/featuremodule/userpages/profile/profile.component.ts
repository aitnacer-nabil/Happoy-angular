import {Component} from '@angular/core';
import {routes} from 'src/app/core/helpers/routes/routes';
import {AuthenticationService} from "../../../service/auth/authentication.service";
import {User} from "../../../service/user/User";
import {FormControl, FormGroup} from "@angular/forms";
import {UpdateProfile} from "../../../service/user/UpdateProfile";
import {Router} from "@angular/router";
import {UpdatePassword} from "../../../service/user/UpdatePassword";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public routes = routes;
  public Toggledata = false;
  public Toggle = false;
  public user: User | null;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  public showAlert: boolean = false;
  constructor(private authService: AuthenticationService, private router: Router) {
    this.user = this.authService.getUserFromLocalStorage();
    this.profileForm = new FormGroup({
      email: new FormControl(this.user?.email),
      firstName: new FormControl(this.user?.firstName),
      lastName: new FormControl(this.user?.lastName),

    });
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl('')
    });

  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;


  }

  icon() {
    this.Toggle = !this.Toggle;
  }

  updateProfile() {

    const emailControl = this.profileForm.get('email');
    const firstNameControl = this.profileForm.get('firstName');
    const lastNameControl = this.profileForm.get('lastName');

    if (emailControl && firstNameControl && lastNameControl) {
      const user: UpdateProfile = {
        id: this.user!!.id,
        email: emailControl.value,
        firstName: firstNameControl.value,
        lastName: lastNameControl.value
      };
      console.log('User:', user);
      this.authService.update(user).subscribe(
        response => {
          console.log(JSON.parse(JSON.stringify(response)));

          let jsonResponse = JSON.parse(JSON.stringify(response));
          let user = jsonResponse.entity;
          this.authService.addUserToLocalStorage(user);
          this.router.navigate([routes.dashboard]);
        }
      );

    }
  }

  updatePassword() {
    this.showAlert = false;
    const currentPasswordControl = this.passwordForm.get('currentPassword');
    const newPasswordControl = this.passwordForm.get('newPassword');
    const confirmPasswordControl = this.passwordForm.get('confirmPassword');

    if (currentPasswordControl && newPasswordControl && confirmPasswordControl) {
      const currentPassword = currentPasswordControl.value;
      const newPassword = newPasswordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      if (newPassword === confirmPassword) {
        console.log('Current Password:', currentPassword);
        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);
        const user : UpdatePassword = {
          id: this.user!!.id,
          password: currentPassword,
          newPassword: newPassword
        };
        this.authService.updatePassword(user).subscribe(
          response => {
            console.log(JSON.parse(JSON.stringify(response)));

            this.router.navigate([routes.dashboard]);
          }
        );
      } else {
        console.log('Passwords do not match');
        this.showAlert = true;
      }
    }
  }
}
