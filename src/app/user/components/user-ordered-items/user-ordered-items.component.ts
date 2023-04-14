import { Component, Input, OnInit } from '@angular/core';
import { OrderResults } from 'src/app/models/order.model';
import { OrderedItemsResults } from 'src/app/models/orderedItems.models';

@Component({
  selector: 'app-user-ordered-items',
  templateUrl: './user-ordered-items.component.html',
  styleUrls: ['./user-ordered-items.component.css']
})
export class UserOrderedItemsComponent implements OnInit {
  @Input('order') order: OrderResults;
  @Input('items') items: OrderedItemsResults[];
  constructor() { }

  ngOnInit(): void {
  }

}
