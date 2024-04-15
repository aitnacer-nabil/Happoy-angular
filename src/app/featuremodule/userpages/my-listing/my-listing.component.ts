import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/service/data.service';
import {AdResponse} from "../../../service/feeds/AdResponse";
import {FeedsService} from "../../../service/feeds/feeds.service";
import {User} from "../../../service/user/User";
import {AuthenticationService} from "../../../service/auth/authentication.service";
@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css']
})
export class MyListingComponent {
  public routes=routes;
  public electronics:any=[]
  public ads: AdResponse[] = [];
  public user: User | null;
  constructor(private DataService:DataService,  private feedsService: FeedsService,private authService: AuthenticationService){
    this.electronics=this.DataService.electronicsList;
    this.user = this.authService.getUserFromLocalStorage();
    this.getAds();
  }
  sortData(sort: Sort) {
    const data = this.ads.slice();

    if (!sort.active || sort.direction === '') {
      this.ads = data;
    } else {
      this.ads = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  getAds(){
   this.feedsService.getAdByUserId(this.user!!.id).subscribe((data)=>{
     this.ads=data;

   }
    );
  }

}
