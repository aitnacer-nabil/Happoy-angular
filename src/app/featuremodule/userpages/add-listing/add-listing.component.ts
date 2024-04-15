import {Component, OnInit} from '@angular/core';
import {routes} from 'src/app/core/helpers/routes/routes';
import {CategoriesService} from "../../../service/listing/categories.service";
import {Category} from "../../../service/listing/Category";
import {AttributeService} from "../../../service/listing/attribute.service";
import {Attribute} from "../../../service/listing/Attribute";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AttributeValue} from "../../../service/listing/AttributeValue";
import {Advertisement} from "../../../service/listing/Advertisement";
import {AttributeValueRequest} from "../../../service/listing/AttributeValueRequest";
import {User} from "../../../service/user/User";
import {AuthenticationService} from "../../../service/auth/authentication.service";
import {Router} from "@angular/router";
import {AdsService} from "../../../service/listing/ads.service";

interface Food {
  value: string | any;
  viewValue: string;
}

interface price {
  value: string | any;
  viewValue: string;
}

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  public routes = routes;
  selectedValue: number | any;
  public categories: Category[] = [];
  showSpecification: boolean = false;
  attributes: Attribute[] = [];
  basicInfoForm: FormGroup;
  categoryName: string = '';
  categoryId: string = '';
  attributeValues: { [key: string]: string } = {};
  public user: User | null;

  constructor(
    private categoriesService: CategoriesService,
    private AttributeService: AttributeService,
    private authService: AuthenticationService,
    private router: Router,
    private adsService: AdsService) {
    this.basicInfoForm = new FormGroup({
      titleForm: new FormControl('', Validators.required),
      descriptionForm: new FormControl('', Validators.required),
      priceForm: new FormControl('', Validators.required),

    });
    this.user = this.authService.getUserFromLocalStorage();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getAllCategories().subscribe(categories => {
      console.log('categories : {}', categories);
      this.categories = categories;
    });
  }

  ngOnChanges() {

  }

  onValueChange(value: any) {
    this.categoryId = value.id;
    this.categoryName = value.name;
    this.attributeValues = {};

    this.AttributeService.getAttributesByCategoryId(value.id).subscribe(attributes => {
      console.log('attributes : {}', attributes);
      console.log('attributes : {}', attributes.length);
      if (attributes.length > 0) {
        this.showSpecification = true;
        this.attributes = attributes;

      } else {
        this.showSpecification = false;
      }
    });
  }

  submitAds() {
    //show form data
    //create a new listing object
    //get all vlue from form
    const title = this.basicInfoForm.get('titleForm')?.value;
    const description = this.basicInfoForm.get('descriptionForm')?.value;
    const price = this.basicInfoForm.get('priceForm')?.value;

    let attributeArray: AttributeValue[] = Object.keys(this.attributeValues).map(key => ({
      value: this.attributeValues[key],
      attributeId: Number(key)
    }));
    console.log('Attributes: ', attributeArray);
    const attributeValues: AttributeValueRequest = {
      adsId: 0,
      attributeValues: attributeArray
    };
    const ad: Advertisement = {
      title: title,
      description: description,
      price: price,
      categoryId: Number(this.categoryId),
      category: this.categoryName,
      city: 'Dhaka',
      userId: this.user!!.id,
      attributeValue: attributeValues


    };
    console.log('Ad: ', ad);
    this.adsService.saveAdvertisement(ad).subscribe(response => {
      console.log('Response: ', response);
      this.router.navigate([routes.mylisting]);

    } );

  }
}

//send the listing object to the server

//show success message
//redirect to the listing page


