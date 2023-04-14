import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterMatchMode } from 'primeng/api';
import { EventFilter } from 'src/app/models/filters/eventFilters.models';
import { OrderResults } from 'src/app/models/order.model';
import { OrderedItems, OrderedItemsResults } from 'src/app/models/orderedItems.models';
import { Params } from 'src/app/models/params.model';
import { DbService } from 'src/app/services/db.service';
import { FilteringService } from 'src/app/services/filtering.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-manager-ordered-items',
  templateUrl: './manager-ordered-items.component.html',
  styleUrls: ['./manager-ordered-items.component.css']
})
export class ManagerOrderedItemsComponent implements OnInit {
  public orderId: number
  public orderedItems: OrderedItemsResults[] = [];
  public order: OrderResults;
  totalRecords: number = 0;
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
    this.getParams();
  }

  getOrder() {
    this.db.getById('orders', this.orderId).subscribe((data: OrderResults) => {
      this.order = data
      this.title.setTitle('Order #'+ this.order.id +' Items - Swiggy');
    }, error => this.router.navigate(['/manager/orders']))
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.orderId = params['order-id']
      this.loadOrderedItems(this.lazyLoadEvent)
      this.getOrder()
    })
  }

  deleteOrderedItem(id: number) {
    this.db.delete('orderedItems', id)
      .subscribe((dt) => {
        this.toast.alert('success', 'Ordered Item Removed.')
        this.loadOrderedItems(this.lazyLoadEvent)
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