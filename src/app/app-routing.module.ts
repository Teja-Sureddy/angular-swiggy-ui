import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './utils/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './utils/signup/signup.component';
import { AdminGuard } from './guards/admin.guard';
import { ManagerGuard } from './guards/manager.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
  { path: 'manager', loadChildren: () => import('src/app/manager/manager.module').then(m => m.ManagerModule), canActivate: [ManagerGuard] },
  { path: 'user', loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule), canActivate: [UserGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
