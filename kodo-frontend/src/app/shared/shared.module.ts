import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { SortComponent } from './components/sort/sort.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    SearchComponent,
    SortComponent,
    PaginationComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
    SortComponent,
    PaginationComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
