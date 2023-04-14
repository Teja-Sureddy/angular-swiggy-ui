import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FilterMatchMode } from 'primeng/api';
import { Delete } from 'src/app/models/delete.model';
import { EventFilter } from 'src/app/models/filters/eventFilters.models';
import { Params } from 'src/app/models/params.model';
import { Restaurant, RestaurantResults } from 'src/app/models/restaurant.model';
import { DbService } from 'src/app/services/db.service';
import { FilteringService } from 'src/app/services/filtering.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnInit {

  public restaurants: RestaurantResults[] = [];
  public totalRecords: number = 0
  deleteRestaurantData: Delete = { title: '', id: -1 }  
  public matchModeOptions = [
    { label: "Starts with", value: FilterMatchMode.STARTS_WITH },
    { label: "Contains", value: FilterMatchMode.CONTAINS }
  ];

  constructor(private filterService: FilteringService, private db: DbService, private toast: ToastService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Restaurant - Swiggy')
  }

  deleteRestaurant() {
    this.db.delete('restaurants', this.deleteRestaurantData.id)
      .subscribe((data) => {
        this.toast.alert('success', 'Restaurant Removed.')
        let index = this.restaurants.findIndex((r) => r.id === this.deleteRestaurantData.id)
        if (index > -1) {
          this.restaurants.splice(index, 1)
          this.totalRecords--
        }
        this.deleteRestaurantData = { title: '', id: -1 }
      });
  }


  loadRestaurants(event: EventFilter) {
    let params: Params[] = this.filterService.filterLazyLoadEvent(event)
    this.getRestaurants(params);
  }

  getRestaurants(params: Params[]) {
    this.db.get('restaurants', params).subscribe((data: Restaurant) => {
      this.totalRecords = data.count
      this.restaurants = data.results;
    })
  }

}