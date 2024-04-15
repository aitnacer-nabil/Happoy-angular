import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Attribute} from "./Attribute";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private apiUrl = 'http://localhost:8093/attributes/category/';

  constructor(private http: HttpClient) { }

  getAttributesByCategoryId(id: number): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(this.apiUrl + id);
  }
}
