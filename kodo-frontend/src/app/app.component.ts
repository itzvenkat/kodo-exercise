import { Component, HostListener, OnInit } from '@angular/core';
import { StoreService } from './shared/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  _isMobileView: boolean = false;

  constructor(private readonly storeService: StoreService) {

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
