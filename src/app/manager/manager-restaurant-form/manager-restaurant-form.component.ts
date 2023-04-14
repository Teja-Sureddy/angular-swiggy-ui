import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CurrentUser } from 'src/app/models/currentUser.model';
import { RestaurantResults } from 'src/app/models/restaurant.model';
import { UserResults } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-manager-restaurant-form',
  templateUrl: './manager-restaurant-form.component.html',
  styleUrls: ['./manager-restaurant-form.component.css']
})
export class ManagerRestaurantFormComponent implements OnInit {
  managers: UserResults[] = [];
  restaurantForm: FormGroup;
  loading = false;
  restaurant: RestaurantResults;
  currentUser: CurrentUser | null;
  image: string | ArrayBuffer | null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private db: DbService,
    private toast: ToastService,
    private authenticationService: AuthService,
    private title: Title
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.buildForm();
    this.getRestaurant();
  }

  getRestaurant() {
    this.db.get('restaurants/restaurantByManager').subscribe((data: RestaurantResults) => {
      this.restaurant = data;
      this.image = this.restaurant.image;
      this.patchForm()
    }, err => this.patchForm())
  }

  patchForm() {
    this.restaurantForm.patchValue({
      name: this.restaurant ? this.restaurant.name : '',
      user: this.currentUser ? this.currentUser.id : null
    });
    this.title.setTitle((this.restaurant ? 'Edit ' : 'Add ') + 'Restaurant - Swiggy')
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (files.length > 0) {
      this.restaurantForm.patchValue({
        image: files[0]
      });
      const reader = new FileReader();
      reader.onload = e => this.image = reader.result;
      reader.readAsDataURL(files[0]);
    }
  }

  buildForm() {
    this.restaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      image: ['']
    });
  }

  get f() { return this.restaurantForm.controls; }

  onSubmit() {
    if (this.restaurantForm.invalid) return;
    this.loading = true;

    const formData = new FormData();
    Object.keys(this.restaurantForm.value).forEach((key) => { formData.append(key, this.restaurantForm.value[key]) });

    if (this.restaurant) {
      this.db.update('restaurants', formData, this.restaurant.id)
        .subscribe(
          data => {
            this.toast.alert('success', 'Restaurant Updated.')
            this.router.navigate(['/manager/restaurant']);
          },
          error => {
            this.loading = false;
          });
    }
    else {
      this.db.add('restaurants', formData)
        .subscribe(
          data => {
            this.toast.alert('success', 'Restaurants Created.')
            this.router.navigate(['/manager/restaurant']);
          },
          error => {
            this.loading = false;
          });
    }
  }
}

