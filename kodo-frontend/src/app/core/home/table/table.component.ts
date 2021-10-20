import { Component, Input, OnInit } from '@angular/core';
import { Feed } from 'src/app/shared/models/feed.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() feed: Feed[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(data: any, index: any) { return index; }

}
