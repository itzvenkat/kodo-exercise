import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsubscribe } from 'src/app/shared/adapters/unsubscribe';
import { IResponse, ResponseType } from 'src/app/shared/models/app.model';
import { Feed } from 'src/app/shared/models/feed.model';
import { Filter } from 'src/app/shared/models/filter.model';
import { Paging } from 'src/app/shared/models/pagination.model';
import { Base, SortBy, SortOptions } from 'src/app/shared/models/sort.model';
import { FeedService } from 'src/app/shared/services/feed.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { AppHomeConstants } from './home.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends Unsubscribe implements OnInit {
  _isMobileView: boolean = false;
  sort_fields: Base[] = AppHomeConstants.sort_fields;

  feed: Feed[] = [];

  page_length: number = 1;
  records: number = 6;

  filter: Filter | null = null;
  routeParams: Filter | null = null;

  constructor(
    private readonly storeService: StoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly feedService: FeedService,
  ) {
    super();
    this.subscription$.sink = this.storeService._isMobileView$.subscribe((value: boolean) => {
      this._isMobileView = value;
    });
    this.subscription$.sink = this.activatedRoute.queryParams.subscribe(params => {
      this.routeParams = {
        page: (params['page']) ? parseInt(params['page']) : 1,
        sort: (params['sort']) ? params['sort'] : '',
        sort_by: ((params['sort_by']) && ((params['sort_by'] === SortBy.ASC) || (params['sort_by'] === SortBy.DESC)))
          ? params['sort_by'] : null,
        count: 6,
        search: (params['search']) ? params['search'] : ''
      };
      this.storeService.routeParamsValue = this.routeParams;
    })
  }

  ngOnInit(): void {
    this.filter = new Filter();
    if (this.routeParams) {
      if (this.routeParams.page) this.filter.page = this.routeParams.page ? parseInt(<any>this.routeParams.page) : 1;
      if (this.routeParams.search) this.filter.search = (this.routeParams.search) ? this.routeParams.search : '';
      if (this.routeParams.sort) this.filter.sort = this.routeParams.sort ? this.routeParams.sort : null;
      if (this.routeParams.sort_by) this.filter.sort_by = ((this.routeParams.sort_by === SortBy.ASC) || (this.routeParams.sort_by === SortBy.DESC)) ? this.routeParams.sort_by : null;
    }
    this.getFeed(this.filter);
  }

  getFeed(filter: Filter | null) {
    console.log(filter);
    const params: any = {};
    if (filter?.page) params['page'] = filter.page;
    if (filter?.count) params['count'] = filter.count;
    if (filter?.search) params['search'] = filter.search;
    if (filter?.sort && (filter.sort_by)) params['sort'] = filter.sort;
    if (filter?.sort_by && (filter.sort)) params['sort_by'] = filter.sort_by;
    this.feed = [];
    this.page_length = 1;
    this.storeService.isLoading = true;
    this.subscription$.sink = this.feedService.getHomeFeed(params).subscribe(
      (response: HttpResponse<IResponse<Feed[]>>) => {
        const result = (response?.body) ? (<IResponse<Feed[]>>response.body) : null;
        if (response && (response.ok) && (response?.body?.type === ResponseType.SUCCESS) && (result?.data && result.data?.length > 0)) {
          this.feed = <Feed[]>result.data;
          this.page_length = result.total_pages ? result.total_pages : 1;
        } else {
          this.feed = [];
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.feed = [];
        this.storeService.isLoading = false;
      },
      () => {
        this.storeService.isLoading = false;
      }
    );
  }

  onSearchEvent(search_text: string) {
    if (this.filter) {
      this.filter.search = search_text;
      this.filter.page = 1;
    }
    setTimeout(() => {
      this.getFeed(this.filter);
      this.setQueryParams();
    }, 10);
    // console.log(search_text, 'search_text');
  }

  onSortEvent(sort_options: SortOptions) {
    if (this.filter) {
      this.filter.sort = sort_options.sort;
      this.filter.sort_by = sort_options.sort_by;
    }
    setTimeout(() => {
      this.getFeed(this.filter);
      this.setQueryParams();
    }, 10);
    // console.log(sort_options, 'sort_options');
  }

  onPageEvent(page_options: Paging) {
    if (this.filter) {
      this.filter.page = page_options.page;
      this.filter.count = this.records;
    }
    setTimeout(() => {
      this.getFeed(this.filter);
      this.setQueryParams();
    }, 10);
    // console.log(page_options, 'page_options');
  }

  setQueryParams() {
    this.router.navigate([], {
      queryParams: {
        page: this.filter?.page ? this.filter.page : undefined,
        search: this.filter?.search ? this.filter.search : undefined,
        sort: this.filter?.sort ? this.filter.sort : undefined,
        sort_by: this.filter?.sort_by ? this.filter.sort_by : undefined
      },
      queryParamsHandling: 'merge',
    });
  }

}