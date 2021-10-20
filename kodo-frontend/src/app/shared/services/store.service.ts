import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private routeParams: BehaviorSubject<Filter | null> = new BehaviorSubject(<Filter | null>null);
  routeParams$: Observable<any> = this.routeParams.asObservable();
  set routeParamsValue(value: Filter | null) {
    this.routeParams.next(value);
  }

  private _isMobileView: BehaviorSubject<boolean> = new BehaviorSubject(<boolean>false);
  _isMobileView$: Observable<any> = this._isMobileView.asObservable();
  set mobileView(value: boolean) {
    this._isMobileView.next(value);
  }

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(<boolean>false);
  _isLoading$: Observable<any> = this._isLoading.asObservable();
  set isLoading(value: boolean) {
    this._isLoading.next(value);
  }

}
