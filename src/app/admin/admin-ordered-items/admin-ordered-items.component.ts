import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterMatchMode } from 'primeng/api';
import { Delete } from 'src/app/models/delete.model';
import { EventFilter } from 'src/app/models/filters/eventFilters.models';
import { OrderResults } from 'src/app/models/order.model';
import { OrderedItems, OrderedItemsResults } from 'src/app/models/orderedItems.models';
import { Params } from 'src/app/models/params.model';
import { DbService } from 'src/app/services/db.service';
import { FilteringService } from 'src/app/services/filtering.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-ordered-items',
  templateUrl: './admin-ordered-items.component.html',
  styleUrls: ['./admin-ordered-items.component.css']
})
export class AdminOrderedItemsComponent implements OnInit {
  public orderId: number
  public orderedItems: OrderedItemsResults[] = [];
  public order: OrderResults;
  public totalRecords: number = 0
  deleteMenuData: Delete = { title: '', id: -1 }
  public matchModeOptions = [
    { label: "Starts with", value: FilterMatchMode.STARTS_WITH },
    { label: "Contains", value: FilterMatchMode.CONTAINS }
  ];
  isInitializing: boolean;
  public lazyLoadEvent: EventFilter = {
    first: 0,
    rows: 25,
    sortField: undefined,
    sortOrder: 1,
    globalFilter: null,
    multiSortMeta: undefined,
    filters: {
      item__name: [{ value: null, matchMode: 'contains', operator: '' }],
      item__price: [{ value: null, matchMode: 'contains', operator: '' }],
      quantity: [{ value: null, matchMode: 'contains', operator: '' }],
      item__type: [{ value: null, matchMode: 'contains', operator: '' }]
    },
  };
  public priceValues: number[] = [0, 10000];
  public quantityValues: number[] = [0, 100];

  constructor(private filterService: FilteringService, private db: DbService, private toast: ToastService, private route: ActivatedRoute, private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Ordered Items - Swiggy')
    this.getParams();
  }

  getOrder() {
    this.db.getById('orders', this.orderId).subscribe((data: OrderResults) => {
      this.order = data
    }, error => this.router.navigate(['/admin/orders']))
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.orderId = params['order-id']
      this.loadOrderedItems(this.lazyLoadEvent)
      this.getOrder()
    })
  }

  deleteOrderedItem() {
    this.db.delete('orderedItems', this.deleteMenuData.id)
      .subscribe((data) => {
        this.toast.alert('success', 'Item Removed.')
        let index = this.orderedItems.findIndex((item) => item.id === this.deleteMenuData.id)
        if (index > -1) {
          this.orderedItems.splice(index, 1)
          this.totalRecords--
        }
        this.deleteMenuData = { title: '', id: -1 }
      });
  }

  loadOrderedItems(event: EventFilter) {
    if (!this.isInitializing) {
      let params: Params[] = this.filterService.filterLazyLoadEvent(event)
      this.getOrderedItems(params)
    }
    this.isInitializing = false
  }

  getOrderedItems(params: Params[]) {
    params.push({ key: 'order', value: this.orderId })
    this.db.get('orderedItems', params).subscribe((data: OrderedItems) => {
      this.totalRecords = data.count
      this.orderedItems = data.results;
    })
  }

}

