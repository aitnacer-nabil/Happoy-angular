import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "./Category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl = 'http://localhost:8093/api/v1/categories/all';
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
