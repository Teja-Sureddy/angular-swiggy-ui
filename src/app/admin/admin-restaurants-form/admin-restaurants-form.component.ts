import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { RestaurantResults } from 'src/app/models/restaurant.model';
import { UserResults } from 'src/app/models/user.model';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-restaurants-form',
  templateUrl: './admin-restaurants-form.component.html',
  styleUrls: ['./admin-restaurants-form.component.css', '../../../assets/form.css']
})
export class AdminRestaurantFormComponent implements OnInit {
  managers: UserResults[] = [];
  restaurantForm: FormGroup;
  loading = false;
  id: number;
  image: string | ArrayBuffer | null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private db: DbService,
    private toast: ToastService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Restaurant Form - Swiggy')
    this.getManagers();
    this.buildForm();
    this.getParams();
  }

  buildForm() {
    this.restaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      image: ['']
    });
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

  getParams() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      if (this.id) {
        this.db.getById('restaurants', this.id).subscribe((data: RestaurantResults) => {
          this.restaurantForm.patchValue({
            name: data.name,
            user: data.user
          });
          this.image = data.image;
        }, error => this.router.navigate(['/admin/restaurants']))
      }
    });
  }

  getManagers() {
    this.db.get('users/managers').subscribe((data: UserResults[]) => {
      this.managers = data
    })
  }

  get f() { return this.restaurantForm.controls; }

  onSubmit() {
    if (this.restaurantForm.invalid) return;
    this.loading = true;

    const formData = new FormData();
    Object.keys(this.restaurantForm.value).forEach((key) => { formData.append(key, this.restaurantForm.value[key]) });

    if (this.id) {
      this.db.update('restaurants', formData, this.id)
        .subscribe(
          data => {
            this.toast.alert('success', 'Restaurant Updated.')
            this.router.navigate(['/admin/restaurants']);
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
            this.router.navigate(['/admin/restaurants']);
          },
          error => {
            this.loading = false;
          });
    }
  }
}
