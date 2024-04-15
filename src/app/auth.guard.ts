import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from './core/helpers/routes/routes';
import {AuthenticationService} from "./service/auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public routes = routes;
  constructor(private authService: AuthenticationService,private router : Router) {
    console.log('AuthGuard router : {}' , router);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    return this.isUserLoggedIn() ;
  }
private isUserLoggedIn(): boolean {
    console.log('AuthGuard isUserLoggedIn : {}' , this.authService.isAuthenticated());
    if(this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate([routes.login]);
    return false;
}
}
