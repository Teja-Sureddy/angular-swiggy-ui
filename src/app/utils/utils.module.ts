import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { DeletePopupComponent } from '../components/delete-popup/delete-popup.component';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    MenuComponent,
    DeletePopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    RouterModule,
    InputNumberModule,
    ButtonModule,
    PaginatorModule,
    DropdownModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    MenuComponent,
    InputNumberModule,
    ButtonModule,
    PaginatorModule,
    DeletePopupComponent,
    DropdownModule,
    SliderModule
  ],
})
export class UtilsModule { }
