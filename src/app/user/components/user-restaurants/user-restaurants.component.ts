import { Component, Input, OnInit } from '@angular/core';
import { RestaurantResults } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-user-restaurants',
  templateUrl: './user-restaurants.component.html',
  styleUrls: ['./user-restaurants.component.css']
})
export class UserRestaurantsComponent implements OnInit {
  
  @Input('restaurants') restaurants:RestaurantResults[];
  constructor() { }

  ngOnInit(): void {
  }

}
