import { Component, HostListener, OnInit } from '@angular/core';
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

  constructor(private readonly storeService: StoreService) {
    super();
    // this.subscription$.sink = this.storeService._isLoading$.subscribe(
    //   (_isLoading: boolean) => {
    //     setTimeout(() => {
    //       this._isLoading = _isLoading;
    //     }, 1000);
    //   }
    // );
  }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this._isMobileView = (window.innerWidth <= 650);
    this.storeService.mobileView = this._isMobileView;
  }
}
