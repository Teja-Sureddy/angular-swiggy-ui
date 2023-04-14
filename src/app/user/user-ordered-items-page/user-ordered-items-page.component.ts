import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderResults } from 'src/app/models/order.model';
import { OrderedItems, OrderedItemsResults } from 'src/app/models/orderedItems.models';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-user-ordered-items-page',
  templateUrl: './user-ordered-items-page.component.html',
  styleUrls: ['./user-ordered-items-page.component.css']
})
export class UserOrderedItemsPageComponent implements OnInit {

  public order: OrderResults;
  public items: OrderedItemsResults[] = []

  constructor(private db: DbService, private router: Router, private route: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Order - Swiggy')
    this.getParam()
  }

  getParam() {
    this.route.params.subscribe(params => {
      let orderId = params['order-id']
      this.title.setTitle('Order #'+ orderId +' - Swiggy')
      this.db.getById('orders', orderId).subscribe((data: OrderResults) => {
        this.order = data
      }, error => this.router.navigate(['/user/orders']))
      this.db.get('orderedItems', [{ key: 'order', value: orderId }]).subscribe((data: OrderedItems) => {
        this.items = data.results
      }, error => this.router.navigate(['/user/orders']))
    })

  }

}
