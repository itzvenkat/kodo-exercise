import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unsubscribe } from '../../adapters/unsubscribe';
import { Filter } from '../../models/filter.model';
import { Base, SortBy, SortOptions } from '../../models/sort.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent extends Unsubscribe implements OnInit {

  @Input() items: Base[] = [];
  @Output() sortEvent: EventEmitter<SortOptions> = new EventEmitter();
  sort_by: SortBy | null = null;
  sort: string | null = null;
  selected_field: string = 'Sort By';
  routeParams: Filter | null = null;

  constructor(private readonly storeService: StoreService) {
    super();
    this.subscription$.sink = this.storeService.routeParams$.subscribe((value: Filter) => {
      this.routeParams = value;
      this.sort = value.sort ? value.sort : null;
      this.sort_by = value.sort_by ? value.sort_by : null;
      setTimeout(() => {
        if (this.sort && this.items?.length > 0) {
          const selectedItem = this.items.find((it) => { return it.value === this.sort; });
          this.selected_field = (selectedItem?.label) ? selectedItem.label : 'Sort By';
        }
      }, 100);
    });
  }

  ngOnInit(): void {
  }

  onFieldChange(selected_option: Base) {
    this.sort = selected_option.value;
    this.selected_field = selected_option.label;
    if (!this.sort_by) this.sort_by = SortBy.ASC;
    this.emitSelection();
  }

  onSortByChange(type: 1 | 2) {
    this.sort_by = (type === 1) ? SortBy.ASC : (type === 2) ? SortBy.DESC : null;
    this.emitSelection();
  }

  ClearSorting() {
    this.sort_by = null;
    this.sort = null;
    this.selected_field = 'Sort By';
    this.emitSelection();
  }

  emitSelection(): void {
    this.sortEvent.emit(this.selected_opt);
  }

  get selected_opt(): SortOptions {
    return {
      sort_by: this.sort_by,
      sort: this.sort
    };
  }

  trackByFn(data: any, index: any) { return index; }

}
