import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerGuard } from './guards/manager.guard';
import { DbService } from './services/db.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ToastService } from './services/toast.service';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastComponent } from './components/toast/toast.component';
import { UtilsModule } from './utils/utils.module';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { UserModule } from './user/user.module';
import { ReviewService } from './services/review.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UtilsModule,
    AdminModule,
    ManagerModule,
    UserModule
  ],
  providers: [AdminGuard, ManagerGuard, DbService, MessageService, ToastService, ReviewService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
