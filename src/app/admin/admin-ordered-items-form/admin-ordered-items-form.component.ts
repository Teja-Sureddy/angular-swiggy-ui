import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Menu, MenuResults } from 'src/app/models/menu.model';
import { OrderResults } from 'src/app/models/order.model';
import { OrderedItemsResults } from 'src/app/models/orderedItems.models';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-ordered-items-form',
  templateUrl: './admin-ordered-items-form.component.html',
  styleUrls: ['./admin-ordered-items-form.component.css', '../../../assets/form.css']
})
export class AdminOrderedItemsFormComponent implements OnInit {
  public orderId: number;
  orderedItemForm: FormGroup;
  menu: MenuResults[] = []
  order: OrderResults;
  loading = false;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private db: DbService,
    private toast: ToastService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Ordered Items Form - Swiggy')
    this.buildForm();
    this.getParams();
  }

  getOrder() {
    this.db.getById('orders', this.orderId).subscribe((data: OrderResults) => {
      this.order = data
      this.getItems();
    }, error => this.router.navigate(['/admin/orders']))
  }

  getItems() {
    this.db.get('menus', [{ key: 'restaurant', value: this.order.restaurant }]).subscribe((data: Menu) => {
      this.menu = data.results;
    })
  }

  buildForm() {
    this.orderedItemForm = this.formBuilder.group({
      item: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      order: ['', Validators.required]
    });
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.orderId = params['order-id']
      this.id = params['id']
      this.getOrder();
      if (this.id) {
        this.db.getById('orderedItems', this.id).subscribe((data: OrderedItemsResults) => {
          this.orderedItemForm.patchValue({
            item: data.item,
            quantity: data.quantity,
            order: data.order
          });
        }, error => this.router.navigate(['/admin/ordereditems-form/' + this.orderId]))
      }
      else {
        this.orderedItemForm.patchValue({
          order: this.orderId
        });
      }
    });
  }

  get f() { return this.orderedItemForm.controls; }

  onSubmit() {
    if (this.orderedItemForm.invalid) return;
    this.loading = true;
    if (this.id) {
      this.db.update('orderedItems', this.orderedItemForm.value, this.id)
        .subscribe(
          data => {
            this.toast.alert('success', 'Order Item Updated.')
            this.router.navigate(['/admin/ordereditems/' + this.orderId]);
          },
          error => {
            this.loading = false;
          });
    }
    else {
      this.db.add('orderedItems', this.orderedItemForm.value)
        .subscribe(
          data => {
            this.toast.alert('success', 'Order Item Created.')
            this.router.navigate(['/admin/ordereditems/' + this.orderId]);
          },
          error => {
            this.loading = false;
          });
    }
  }
}
