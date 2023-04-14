import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterMatchMode } from 'primeng/api';
import { Delete } from 'src/app/models/delete.model';
import { EventFilter } from 'src/app/models/filters/eventFilters.models';
import { Menu, MenuResults } from 'src/app/models/menu.model';
import { Params } from 'src/app/models/params.model';
import { RestaurantResults } from 'src/app/models/restaurant.model';
import { DbService } from 'src/app/services/db.service';
import { FilteringService } from 'src/app/services/filtering.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  public restaurant: RestaurantResults;
  public restaurantId: number
  public menu: MenuResults[] = [];
  public totalRecords: number = 0
  deleteMenuData: Delete = { title: '', id: -1 }
  public matchModeOptions = [
    { label: "Starts with", value: FilterMatchMode.STARTS_WITH },
    { label: "Contains", value: FilterMatchMode.CONTAINS }
  ];

  public lazyLoadEvent: EventFilter = {
    first: 0,
    rows: 25,
    sortField: undefined,
    sortOrder: 1,
    globalFilter: null,
    multiSortMeta: undefined,
    filters: {
      name: [{ value: null, matchMode: 'contains', operator: '' }],
      price: [{ value: null, matchMode: 'contains', operator: '' }],
      type: [{ value: null, matchMode: 'contains', operator: '' }]
    },
  };
  public isInitializing: boolean = true;
  public priceValues: number[] = [0, 10000];


  constructor(private filterService: FilteringService, private router: Router, private db: DbService, private toast: ToastService, private route: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Menu - Swiggy')
    this.getParams();
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurant-id']
      this.getRestaurant()
      this.loadMenu(this.lazyLoadEvent)
    })
  }

  getRestaurant() {
    this.db.getById('restaurants', this.restaurantId).subscribe((data: RestaurantResults) => {
      this.restaurant = data
    }, error => this.router.navigate(['/admin/restaurants']))
  }

  deleteMenu() {
    this.db.delete('menus', this.deleteMenuData.id)
      .subscribe((data) => {
        this.toast.alert('success', 'Menu Removed.')
        let index = this.menu.findIndex((m) => m.id === this.deleteMenuData.id)
        if (index > -1) {
          this.menu.splice(index, 1)
          this.totalRecords--
        }
        this.deleteMenuData = { title: '', id: -1 }
      });
  }

  loadMenu(event: EventFilter) {
    if (!this.isInitializing) {
      let params: Params[] = this.filterService.filterLazyLoadEvent(event)
      this.getMenu(params)
    }
    this.isInitializing = false
  }

  getMenu(params: Params[]) {
    params.push({ key: 'restaurant', value: this.restaurantId })
    this.db.get('menus', params).subscribe((data: Menu) => {
      this.totalRecords = data.count
      this.menu = data.results;
    })
  }

}
