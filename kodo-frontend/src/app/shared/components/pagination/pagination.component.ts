import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unsubscribe } from '../../adapters/unsubscribe';
import { Filter } from '../../models/filter.model';
import { Paging } from '../../models/pagination.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent extends Unsubscribe implements OnInit {

  @Input('page_length') pages: number = 1;
  page: string = '1';
  @Output() pageEvent: EventEmitter<Paging> = new EventEmitter();
  routeParams: Filter | null = null;

  constructor(private readonly storeService: StoreService) {
    super();
    this.subscription$.sink = this.storeService.routeParams$.subscribe((value: Filter) => {
      this.routeParams = value;
      setTimeout(() => {
        this.page = ((value.page) && (value.page > 0) && (value.page <= this.pages)) ? `${value.page}` : `1`;
      }, 300);
    });
  }

  ngOnInit(): void {
  }

  gotoPage(value: any) {
    setTimeout(() => {
      this.page = ((parseInt(value) > 0) && (parseInt(value) <= this.pages)) ? value : '1';
      this.emitPageEvent();
    }, 10);
  }

  pageMinus() {
    if (this.page_options.page > 1) {
      this.page = `${(this.page_options.page - 1)}`;
      this.emitPageEvent();
    }
  }

  pagePlus() {
    if (this.pages >= this.page_options.page) {
      this.page = `${(this.page_options.page + 1)}`;
      this.emitPageEvent();
    }
  }

  emitPageEvent() {
    this.pageEvent.emit(this.page_options);
  }

  get page_options(): Paging {
    return {
      page: parseInt(this.page) ? parseInt(this.page) : 1,
      pages: this.pages
    };
  }

}
