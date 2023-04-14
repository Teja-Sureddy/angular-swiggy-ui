import { Component, Input, OnInit } from '@angular/core';
import { OrderResults } from 'src/app/models/order.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  @Input('orders') orders:OrderResults[]
  
  constructor() { }

  ngOnInit(): void {
  }

}
