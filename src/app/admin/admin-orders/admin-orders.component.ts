import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FilterMatchMode } from 'primeng/api';
import { Delete } from 'src/app/models/delete.model';
import { EventFilter } from 'src/app/models/filters/eventFilters.models';
import { Order, OrderResults } from 'src/app/models/order.model';
import { Params } from 'src/app/models/params.model';
import { DbService } from 'src/app/services/db.service';
import { FilteringService } from 'src/app/services/filtering.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  public orders: OrderResults[] = [];
  public totalRecords: number = 0
  deleteOrderData: Delete = { title: '', id: -1 }  
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

  constructor(private filterService:FilteringService,private db: DbService, private toast: ToastService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Orders - Swiggy')
  }

  deleteOrder() {
    this.db.delete('orders', this.deleteOrderData.id)
      .subscribe((data) => {
        this.toast.alert('success', 'Order Removed.')
        let index = this.orders.findIndex((user)=>user.id === this.deleteOrderData.id)
        if (index > -1) {
          this.orders.splice(index, 1)
          this.totalRecords--
        }
        this.deleteOrderData = { title: '', id: -1 }
      });
  }
  
  loadOrders(event: EventFilter) {
    let params: Params[] = this.filterService.filterLazyLoadEvent(event)
    this.getOrders(params)
  }

  getOrders(params: Params[]) {
    this.db.get('orders', params).subscribe((data: Order) => {
      this.totalRecords = data.count
      this.orders = data.results;
    })
  }

}
