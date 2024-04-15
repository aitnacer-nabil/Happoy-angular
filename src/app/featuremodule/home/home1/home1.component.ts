import {Component, OnInit} from '@angular/core';
import {routes} from 'src/app/core/helpers/routes/routes';
import {DataService} from 'src/app/service/data.service';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import * as AOS from 'aos';
import {CategoriesService} from "../../../service/listing/categories.service";
import {Category} from "../../../service/listing/Category";
import {AdResponse} from "../../../service/feeds/AdResponse";
import {FeedsService} from "../../../service/feeds/feeds.service";
@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css'],
})
export class Home1Component implements OnInit {
  public routes = routes;
  public categories: Category[] = [];
  categoriesDataSource = new MatTableDataSource();
  searchInputCategory: any;
  selectedCategory: any = '';

  public featuredads: any = [];
  public testimonial: any = [];
  public blog: any = [];
  public pricing: any = [];
  public latestads: any = [];
  public universitiesCompanies: any = [];
  public ads: AdResponse[] = [];

  constructor(private DataService: DataService,
              public router: Router,
              private categoriesService: CategoriesService,
              private feedsService: FeedsService) {

    (this.featuredads = this.DataService.featuredadsList),
      (this.latestads = this.DataService.latestadsList)
    this.getCategories();
    this.getAds();


  }

  ngOnInit(): void {
    AOS.init({disable: 'mobile'}
    );

  }

  public featuredadsOwlOptions: OwlOptions = {
    margin: 24,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      "<i class='fa-solid fa-angle-left'></i>",
      "<i class='fa-solid fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };


  searchCategory(value: any): void {
    const filterValue = value;
    this.categoriesDataSource.filter = filterValue.trim().toLowerCase();
  }

  direction() {
    this.router.navigate([routes.listinglistsidebar])
  }

  getCategories() {
    this.categoriesService.getAllCategories().subscribe(categories => {
      console.log('categories : {}', categories);
      this.categories = categories;
    });
  }

  getAds(){
    this.feedsService.getFeeds().subscribe(response => {
      console.log('ads : {}', response);
      this.ads = response;
    }
    );

  }
}
