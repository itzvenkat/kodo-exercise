import { Component, Input, OnInit } from '@angular/core';
import { Feed } from 'src/app/shared/models/feed.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() feed: Feed[] = [];

  constructor() { }

  ngOnInit(): void {
    this.feed.splice(5,this.feed.length);
  }

}
