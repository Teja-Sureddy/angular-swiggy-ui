import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Cart } from 'src/app/models/menu.model';

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.css']
})
export class UserCheckoutComponent implements OnInit {

  @Input('items') items: Cart[];
  @Output() addToReviewEvent = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

  addToReview() {
    this.addToReviewEvent.emit()
  }

}
