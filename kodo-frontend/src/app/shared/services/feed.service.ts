import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FiltersDTO } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  protected baseURL = environment.baseURL;

  constructor(private readonly http: HttpClient) { }

  public getHomeFeed(params: any): Observable<any> {
    return this.http.get(`${this.baseURL}/home`, { params, observe: 'response' });
  }

}
