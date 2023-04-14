import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderResults } from 'src/app/models/order.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-user-orders-page',
  templateUrl: './user-orders-page.component.html',
  styleUrls: ['./user-orders-page.component.css']
})
export class UserOrdersPageComponent implements OnInit {
  public orders: OrderResults[] = [];
  constructor(private db: DbService, private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle('Orders - Swiggy')
    this.getOrders();
  }

  getOrders() {
    this.db.get('orders/userOrders').subscribe((data: OrderResults[]) => {
      this.orders = data
    })
  }

}
