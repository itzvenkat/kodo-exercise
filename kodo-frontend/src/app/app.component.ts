import { Component, HostListener, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Unsubscribe } from './shared/adapters/unsubscribe';
import { StoreService } from './shared/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Unsubscribe implements OnInit {
  _isMobileView: boolean = false;
  _isLoading = true;

  constructor(
    private readonly storeService: StoreService,
    private readonly updates: SwUpdate
  ) {
    super();
    this.subscription$.sink = this.updates.available.subscribe(event => {
      if (confirm('App update available!')) {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    });
    // this.subscription$.sink = this.storeService._isLoading$.subscribe(
    //   (_isLoading: boolean) => {
    //     setTimeout(() => {
    //       this._isLoading = _isLoading;
    //     }, 1000);
    //   }
    // );
  }

  ngOnInit(): void {
    console.log("%cKodo - Coding Exercise", "color: red; font-size: 4rem; font-weight: bolder; text-shadow: #000 1px 1px;")
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this._isMobileView = (window.innerWidth <= 650);
    this.storeService.mobileView = this._isMobileView;
  }

}
