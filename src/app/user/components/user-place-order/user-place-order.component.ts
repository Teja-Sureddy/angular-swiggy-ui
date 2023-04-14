import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-user-place-order',
  templateUrl: './user-place-order.component.html',
  styleUrls: ['./user-place-order.component.css']
})
export class UserPlaceOrderComponent implements OnInit {
  @Input() total:number;
  @Output() placeOrderEvent= new EventEmitter<null>()
  constructor() { }

  ngOnInit(): void {
  }

  placeOrder(){
    this.placeOrderEvent.emit()
  }

}
