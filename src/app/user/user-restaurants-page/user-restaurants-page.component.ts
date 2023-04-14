import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Restaurant, RestaurantResults } from 'src/app/models/restaurant.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-user-restaurants-page',
  templateUrl: './user-restaurants-page.component.html',
  styleUrls: ['./user-restaurants-page.component.css']
})
export class UserRestaurantsPageComponent implements OnInit {

  public restaurants:RestaurantResults[] = []
  constructor(private db:DbService, private title:Title) { }

  ngOnInit(): void {    
    this.title.setTitle('Restaurants - Swiggy')
    this.getRestaurants()
  }

  getRestaurants(){
    this.db.get('restaurants').subscribe((data:Restaurant)=>{
      this.restaurants = data.results
    })
  }

}
