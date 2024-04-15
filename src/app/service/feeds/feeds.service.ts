import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdResponse} from "./AdResponse";

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  private readonly API_URL = 'http://localhost:8093/feeds';

  constructor(private http: HttpClient) { }

  getFeeds(): Observable<AdResponse[]> {
    return this.http.get<AdResponse[]>(this.API_URL);
  }
  getAdByUserId(userId: string): Observable<AdResponse[]> {
    return this.http.get<AdResponse[]>(this.API_URL + '/user/' + userId);
  }
}
