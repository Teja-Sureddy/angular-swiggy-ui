import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/models/menu.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  @Input('menu') menu: Cart[];
  @Output() review = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  addToReview(i:number){
    this.review.emit(i)
  }

}
