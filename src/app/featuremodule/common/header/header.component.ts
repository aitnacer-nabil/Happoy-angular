import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {DataService} from 'src/app/service/data.service';
import {routes} from 'src/app/core/helpers/routes/routes';
import {SidebarService} from 'src/app/service/sidebar.service';
import {CommonService} from 'src/app/service/common.service';
import {AuthenticationService} from "../../../service/auth/authentication.service";
import {User} from "../../../service/user/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public routes = routes;
  base: string = '';
  page: string = '';
  last: string = '';
  public user:User | null = null

  public nav: boolean = false;
  header: Array<any> = [];
  sidebar: Array<any> = [];


  constructor(private data: DataService, private router: Router, private common: CommonService,
              private sidebarService: SidebarService, private authService: AuthenticationService) {
    this.header = this.data.header;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.getroutes(event);
      }
    });
    this.getroutes(this.router);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated();
  }

  private getroutes(route: any): void {
    let splitVal = route.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];


    if (
      this.base == 'userpages'
    ) {
      this.nav = false;
    } else {
      this.nav = true;
    }

  }

  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }

  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }
  public isLoggedIn(): boolean {
    if(this.authService.isAuthenticated()){
      this.user = this.authService.getUserFromLocalStorage();
    }
    return this.authService.isAuthenticated();
  }
  public logout(): void {
    this.authService.logout();
    this.router.navigate([routes.login]);
  }
}
