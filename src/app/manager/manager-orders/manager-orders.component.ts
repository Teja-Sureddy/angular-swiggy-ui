import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FilterMatchMode } from 'primeng/api';
import { EventFilter } from 'src/app/models/filters/eventFilters.models';
import { Order, OrderResults } from 'src/app/models/order.model';
import { Params } from 'src/app/models/params.model';
import { RestaurantResults } from 'src/app/models/restaurant.model';
import { DbService } from 'src/app/services/db.service';
import { FilteringService } from 'src/app/services/filtering.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-manager-orders',
  templateUrl: './manager-orders.component.html',
  styleUrls: ['./manager-orders.component.css']
})
export class ManagerOrdersComponent implements OnInit {

  public orders: OrderResults[] = []
  public restaurant: RestaurantResults;
  totalRecords: number = 0;
  public idMatchModeOptions = [
    { label: "Equals", value: FilterMatchMode.EQUALS }
  ];
  public matchModeOptions = [
    { label: "Starts with", value: FilterMatchMode.STARTS_WITH },
    { label: "Contains", value: FilterMatchMode.CONTAINS }
  ];
  public matchModeDateOptions = [
    { label: "Date is after", value: FilterMatchMode.DATE_AFTER },
    { label: "Date is before", value: FilterMatchMode.DATE_BEFORE }
  ];
  public isInitializing: boolean = true;
  public lazyLoadEvent: EventFilter = {
    first: 0,
    rows: 25,
    sortField: undefined,
    sortOrder: 1,
    globalFilter: null,
    multiSortMeta: undefined,
    filters: {
      id: [{ value: null, matchMode: 'contains', operator: '' }],
      user__username: [{ value: null, matchMode: 'contains', operator: '' }],
      restaurant__name: [{ value: null, matchMode: 'contains', operator: '' }],
      dateTime: [{ value: null, matchMode: 'contains', operator: '' }]
    },
  };
  constructor(private filterService: FilteringService, private db: DbService, private toast: ToastService, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Orders - Swiggy')
    this.getRestaurant()
  }

  getRestaurant() {
    this.db.get('restaurants/restaurantByManager').subscribe((data: RestaurantResults) => {
      this.restaurant = data
      this.loadOrders(this.lazyLoadEvent);
    }, err => {
      this.toast.alert('error', 'No restaurant found.')
      this.router.navigate(['/manager/restaurant']);
    })
  }

  loadOrders(event: EventFilter) {
    if (!this.isInitializing) {
      let params: Params[] = this.filterService.filterLazyLoadEvent(event)
      this.getOrders(params)
    }
    this.isInitializing = false
  }

  getOrders(params: Params[]) {
    params.push({ key: 'restaurant', value: this.restaurant.id })
    this.db.get('orders', params).subscribe((data: Order) => {
      this.totalRecords = data.count
      this.orders = data.results;
    })
  }

}
