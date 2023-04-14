import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private title: Title
  ) {
    if (this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.role) {
      this.router.navigate([this.authenticationService.currentUserValue.role]);
    }
  }

  ngOnInit() {
    this.title.setTitle('Signup - Swiggy')
    this.buildForm();
  }

  buildForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['3', Validators.required]
    });
  }

  get f() { return this.signupForm.controls };

  onSubmit() {
    if (this.signupForm.invalid) return;
    this.loading = true;
    this.authenticationService.signup(this.signupForm.value)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
        });
  }

}
