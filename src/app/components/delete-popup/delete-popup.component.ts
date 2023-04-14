import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  @Input('title') title: String;
  @Output() deleteRecord = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

}
