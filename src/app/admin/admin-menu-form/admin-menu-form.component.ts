import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { MenuResults } from 'src/app/models/menu.model';
import { RestaurantResults } from 'src/app/models/restaurant.model';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-menu-form',
  templateUrl: './admin-menu-form.component.html',
  styleUrls: ['./admin-menu-form.component.css', '../../../assets/form.css']
})
export class AdminMenuFormComponent implements OnInit {
  public restaurant: RestaurantResults;
  public restaurantId: number;
  menuForm: FormGroup;
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
    this.title.setTitle('Menu Form - Swiggy')
    this.buildForm();
    this.getParams();
  }

  buildForm() {
    this.menuForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      restaurant: ['', Validators.required],
      description: ['', Validators.required],
      type: [false],
      image: ['']
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (files.length > 0) {
      this.menuForm.patchValue({
        image: files[0]
      });
      const reader = new FileReader();
      reader.onload = e => this.image = reader.result;
      reader.readAsDataURL(files[0]);
    }
  }

  getRestaurant() {
    this.db.getById('restaurants', this.restaurantId).subscribe((data: RestaurantResults) => {
      this.restaurant = data
    }, error => this.router.navigate(['/admin/restaurants']))
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurant-id']
      this.id = params['id']
      this.getRestaurant()
      if (this.id) {
        this.db.getById('menus', this.id).subscribe((data: MenuResults) => {
          this.menuForm.patchValue({
            name: data.name,
            price: data.price,
            restaurant: data.restaurant,
            description: data.description,
            type: data.type
          });
          this.image = data.image
        }, error => this.router.navigate(['/admin/menu/' + this.restaurantId]))
      }
      else {
        this.menuForm.patchValue({
          restaurant: this.restaurantId
        });
      }
    });
  }

  get f() { return this.menuForm.controls; }

  onSubmit() {
    if (this.menuForm.invalid) return;
    this.loading = true;

    const formData = new FormData();
    Object.keys(this.menuForm.value).forEach((key) => { formData.append(key, this.menuForm.value[key]) });

    if (this.id) {
      this.db.update('menus', formData, this.id)
        .subscribe(
          data => {
            this.toast.alert('success', 'Menu Item Updated.')
            this.router.navigate(['/admin/menu/' + this.restaurantId]);
          },
          error => {
            this.loading = false;
          });
    }
    else {
      this.db.add('menus', formData)
        .subscribe(
          data => {
            this.toast.alert('success', 'Menu Item Created.')
            this.router.navigate(['/admin/menu/' + this.restaurantId]);
          },
          error => {
            this.loading = false;
          });
    }
  }
}
