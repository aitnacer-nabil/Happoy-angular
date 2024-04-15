import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Advertisement} from "./Advertisement";

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private apiUrl = 'http://localhost:8093/ads/';

  constructor(private http: HttpClient) { }

  saveAdvertisement(ad: FormData): Observable<Advertisement | HttpErrorResponse> {
    return this.http.post<Advertisement | HttpErrorResponse>(`${this.apiUrl}save`, ad);
  }
}
