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
  selector: 'app-manager-menu-form',
  templateUrl: './manager-menu-form.component.html',
  styleUrls: ['./manager-menu-form.component.css', '../../../assets/form.css']
})
export class ManagerMenuFormComponent implements OnInit {
  public restaurant: RestaurantResults;
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
    this.buildForm();
    this.getRestaurant();
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

  getRestaurant() {
    this.db.get('restaurants/restaurantByManager').subscribe((data: RestaurantResults) => {
      this.restaurant = data
      this.getParams();
    }, err => {
      this.toast.alert('error', 'No Restaurant Found.')
      this.router.navigate(['/manager/restaurant'])
    })
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.title.setTitle((this.id ? 'Edit ' : 'Add ') + this.restaurant.name + ' Menu - Swiggy');
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
        }, error => this.router.navigate(['/manager/restaurant']))
      }
      else {
        this.menuForm.patchValue({
          restaurant: this.restaurant.id
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
            this.router.navigate(['/manager/restaurant'])
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
            this.router.navigate(['/manager/restaurant'])
          },
          error => {
            this.loading = false;
          });
    }
  }
}
