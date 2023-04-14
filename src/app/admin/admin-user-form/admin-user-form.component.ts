import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Role, RoleResults } from 'src/app/models/role.model';
import { UserResults } from 'src/app/models/user.model';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.css']
})
export class AdminUserFormComponent implements OnInit {
  roles: RoleResults[] = [];
  signupForm: FormGroup;
  loading = false;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private db: DbService,
    private toast: ToastService,
    private title:Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Users Form - Swiggy')
    this.getRoles();
    this.buildForm();
    this.getParams();
  }

  buildForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      if (this.id) {
        this.db.getById('users', this.id).subscribe((data: UserResults) => {
          this.signupForm.patchValue({
            username: data.username,
            email: data.email,
            role: data.role
          });
        }, error => this.router.navigate(['/admin/users']))
      }
    });
  }

  getRoles() {
    this.db.get('roles').subscribe((data: Role) => {
      this.roles = data.results
    })
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    if (this.signupForm.invalid) return;
    this.loading = true;
    if (this.id) {
      this.db.update('users', this.signupForm.value, this.id)
        .subscribe(
          data => {
            this.toast.alert('success', 'User Updated.')
            this.router.navigate(['/admin/users']);
          })
    }
    else {
      this.db.add('users', this.signupForm.value)
        .subscribe(
          data => {
            this.toast.alert('success', 'User Created.')
            this.router.navigate(['/admin/users']);
          })
    }
  }
}
