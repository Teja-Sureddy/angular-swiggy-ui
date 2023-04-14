import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/menu.model';
import { RestaurantResults } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  public items: Cart[] | [] = [];
  itemsSubject: Subject<Cart[] | []> = new Subject();

  public restaurant: RestaurantResults | null = null;
  restaurantSubject: Subject<RestaurantResults | null> = new Subject();

  constructor() { }

  saveOrder(restaurant: RestaurantResults | null, items: Cart[]) {
    if (items.length === 0 || !this.restaurant || (this.restaurant && restaurant && this.restaurant.id === restaurant.id)) {
      this.items = items;
      this.itemsSubject.next(this.items)
      this.restaurant = items.length === 0 ? null : restaurant;
      this.restaurantSubject.next(this.restaurant)
    }
  }
}
