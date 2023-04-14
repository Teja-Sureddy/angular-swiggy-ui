import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Cart, MenuResults } from 'src/app/models/menu.model';
import { OrderResults } from 'src/app/models/order.model';
import { RestaurantResults } from 'src/app/models/restaurant.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { ReviewService } from 'src/app/services/review.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-checkout-page',
  templateUrl: './user-checkout-page.component.html',
  styleUrls: ['./user-checkout-page.component.css']
})
export class UserCheckoutPageComponent implements OnInit {

  restaurant: RestaurantResults | null;
  items: Cart[] = []
  total: number = 0;

  constructor(private authenticationService: AuthService, private db: DbService, private reviewService: ReviewService, private router: Router, private toast: ToastService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Checkout - Swiggy')
    this.getCart()
  }

  clearCart() {
    this.reviewService.saveOrder(null, [])
    this.router.navigate(['/user/restaurants'])
  }

  placeOrder() {
    const currentUser = this.authenticationService.currentUserValue;
    this.db.add('orders', { user: currentUser ? currentUser.id : null, dateTime: new Date(), restaurant: this.restaurant ? this.restaurant.id : null }).subscribe((data: OrderResults) => {
      let requests: Observable<any>[] = [];
      this.items.forEach((item) => {
        requests.push(
          this.db.add('orderedItems', { item: item.id, order: data.id, quantity: item.quantity }).pipe(
            map(response => response),
            catchError(error => of(error))
          )
        );
      });
      forkJoin(requests).subscribe(results => {
        this.reviewService.saveOrder(null, [])
        this.router.navigate(['/user/order/' + data.id])
      });
    })
  }

  getCart() {
    this.restaurant = this.reviewService.restaurant
    this.items = this.reviewService.items
    if (!this.restaurant || this.items.length === 0) {
      this.reviewService.saveOrder(null, [])
      this.toast.alert('error', 'Add items to proceed.')
      this.router.navigate(['/user/restaurants'])
    }
    this.getTotal();
  }

  getTotal() {
    this.total = 0
    this.items.forEach((obj) => {
      this.total += obj.price * obj.quantity
    })
  }

  addToReview() {
    let selectedItems = this.items.filter((item) => { return item.quantity && item.quantity > 0 })
    this.reviewService.saveOrder(this.restaurant, selectedItems)
    this.getCart()
  }

}
