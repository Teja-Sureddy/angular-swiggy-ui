import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { OrderResults } from 'src/app/models/order.model';
import { Restaurant, RestaurantResults } from 'src/app/models/restaurant.model';
import { UserResults } from 'src/app/models/user.model';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-orders-form',
  templateUrl: './admin-orders-form.component.html',
  styleUrls: ['./admin-orders-form.component.css', '../../../assets/form.css']
})
export class AdminOrdersFormComponent implements OnInit {
  orderForm: FormGroup;
  loading = false;
  id: number;
  users:UserResults[] = [];
  restaurants:RestaurantResults[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private db: DbService,
    private toast: ToastService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Orders Form - Swiggy')
    this.getUsers();
    this.getRestaurants();
    this.buildForm();
    this.getParams();
  }

  getUsers(){
    this.db.get('users/users').subscribe((data:UserResults[])=>{
      this.users = data;
    })
  }

  getRestaurants(){
    this.db.get('restaurants').subscribe((data:Restaurant)=>{
      this.restaurants = data.results;
    })
  }

  buildForm() {
    this.orderForm = this.formBuilder.group({
      user: ['', Validators.required],
      restaurant: ['', Validators.required],
      dateTime: [new Date(), Validators.required]
    });
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      if (this.id) {
        this.db.getById('orders', this.id).subscribe((data: OrderResults) => {
          this.orderForm.patchValue({
            user: data.user,
            restaurant: data.restaurant,
            dateTime: data.dateTime
          });
        }, error => this.router.navigate(['/admin/orders']))
      }
    });
  }

  get f() { return this.orderForm.controls; }

  onSubmit() {
    if (this.orderForm.invalid) return;
    this.loading = true;
    if (this.id) {
      this.db.update('orders', this.orderForm.value, this.id)
        .subscribe(
          data => {
            this.toast.alert('success', 'Order Updated.')
            this.router.navigate(['/admin/orders']);
          },
          error => {
            this.loading = false;
          });
    }
    else {
      this.db.add('orders', this.orderForm.value)
        .subscribe(
          data => {
            this.toast.alert('success', 'Order Created.')
            this.router.navigate(['/admin/orders']);
          },
          error => {
            this.loading = false;
          });
    }
  }
}
