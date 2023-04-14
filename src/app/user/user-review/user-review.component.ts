import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/menu.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {

  public cart: Cart[] | [] = []
  public total: number = 0;
  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.cart = this.reviewService.items
    this.getTotal();
    this.getItems();
  }

  getItems() {
    this.reviewService.itemsSubject.subscribe((data: Cart[] | []) => {
      this.cart = data;
      this.getTotal()
    })
  }

  getTotal() {
    this.total = 0
    this.cart.forEach((obj) => {
      this.total += obj.price * obj.quantity
    })
  }

}
