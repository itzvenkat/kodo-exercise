import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Unsubscribe } from '../../adapters/unsubscribe';
import { Filter } from '../../models/filter.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent extends Unsubscribe implements OnInit {

  searchText: string = '';
  @ViewChild('searchInput', { static: true }) searchTextRef: ElementRef | null = null;
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();
  routeParams: Filter | null = null;

  constructor(private readonly storeService: StoreService) {
    super();
    this.subscription$.sink = this.storeService.routeParams$.subscribe((value: Filter) => {
      this.routeParams = value;
      this.searchText = value.search ? value.search : ``;
    });
  }

  ngOnInit(): void {
    this.filter();
  }

  filter(): void {
    try {
      const keyup$ = fromEvent(this.searchTextRef?.nativeElement, 'keyup');
      const search$ = fromEvent(this.searchTextRef?.nativeElement, 'search');
      const change$ = fromEvent(this.searchTextRef?.nativeElement, 'change');
      const allEvents$ = merge(keyup$, search$, change$);
      this.subscription$.sink = allEvents$.pipe(
        map((event: any) => {
          const text = this.searchText || event.target.value;
          return text;
        }),
        debounceTime(600),
        distinctUntilChanged()
      ).subscribe((text: string) => {
        setTimeout(() => {
          this.searchEvent.emit(text);
        }, 100);
      });
    } catch (error) {
      console.error(error);
    }
  };

  get searchFilter(): string {
    return <string>this.searchTextRef?.nativeElement?.value;
  };

}
