import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Unsubscribe } from '../../adapters/unsubscribe';
import { Filter } from '../../models/filter.model';
import { Paging } from '../../models/pagination.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent extends Unsubscribe implements OnInit, OnChanges {

  @Input('page_length') pages: number = 1;
  @Output() pageEvent: EventEmitter<Paging> = new EventEmitter();
  page: string = '1';
  routeParams: Filter | null = null;

  constructor(private readonly storeService: StoreService) {
    super();
    this.subscription$.sink = this.storeService.routeParams$.subscribe((value: Filter) => {
      this.routeParams = value;
      setTimeout(() => {
        this.page = (value.page) ? `${value.page}` : `1`;
      }, 100);
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const page_length = changes?.pages?.currentValue;
    if (page_length) {
      const current_page: number = parseInt(this.page);
      this.page = ((current_page > 0) && (current_page <= page_length)) ? `${current_page}` : `1`;
    }
  }

  gotoPage(): void {
    setTimeout(() => {
      this.page = ((parseInt(this.page) > 0) && (parseInt(this.page) <= this.pages)) ? this.page : '1';
      this.emitPageEvent();
    }, 10);
  }

  pageMinus(): void {
    if (this.page_options.page > 1) {
      this.page = `${(this.page_options.page - 1)}`;
      this.emitPageEvent();
    }
  }

  pagePlus(): void {
    if (this.pages >= this.page_options.page) {
      this.page = `${(this.page_options.page + 1)}`;
      this.emitPageEvent();
    }
  }

  emitPageEvent(): void {
    this.pageEvent.emit(this.page_options);
  }

  get page_options(): Paging {
    return {
      page: parseInt(this.page) ? parseInt(this.page) : 1,
      pages: this.pages
    };
  }

}
