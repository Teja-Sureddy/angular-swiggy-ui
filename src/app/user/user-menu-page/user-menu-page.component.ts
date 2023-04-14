import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, Menu, MenuResults } from 'src/app/models/menu.model';
import { RestaurantResults } from 'src/app/models/restaurant.model';
import { DbService } from 'src/app/services/db.service';
import { ReviewService } from 'src/app/services/review.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-menu-page',
  templateUrl: './user-menu-page.component.html',
  styleUrls: ['./user-menu-page.component.css']
})
export class UserMenuPageComponent implements OnInit {

  menu: Cart[] = []
  restaurant: RestaurantResults;

  constructor(private router: Router, private toast: ToastService, private db: DbService, private route: ActivatedRoute, private reviewService: ReviewService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Menu - Swiggy')
    this.getMenu()
  }

  addToReview(index: number) {
    let selectedItems = this.menu.filter((item) => { return item.quantity && item.quantity > 0 })

    let restaurant = this.reviewService.restaurant
    if (!restaurant || this.restaurant.id === restaurant.id) {
      this.reviewService.saveOrder(this.restaurant, selectedItems)
    }
    else {
      this.menu[index].quantity = 0
      this.toast.alert('error', 'Clear cart and add items.')
    }
  }

  getMenu() {
    this.route.params.subscribe(params => {
      this.db.getById('restaurants', params['restaurant-id']).subscribe((data: RestaurantResults) => {
        this.restaurant = data;
        this.title.setTitle(this.restaurant.name + ' Menu - Swiggy')
        this.callToSet()
      }, error => this.router.navigate(['/user/restaurants']))
      this.db.get('menus', [{ key: 'restaurant', value: params['restaurant-id'] }]).subscribe((data: Menu) => {
        this.menu = data.results.map(m => ({ ...m, quantity: 0 }))
        this.callToSet()
      }, error => this.router.navigate(['/user/restaurants']))
    })
  }

  callToSet() {
    if (this.restaurant && this.menu.length > 0) {
      this.setQuantity()
    }
  }

  setQuantity() {
    let resaurant = this.reviewService.restaurant
    let items = this.reviewService.items
    if (resaurant && items.length > 0 && resaurant.id === this.restaurant.id) {
      items.forEach((item: Cart) => {
        let menu: Cart = this.menu.find(mItem => { return item.id === mItem.id })!
        menu.quantity = item.quantity
      });
    }
  }

}
