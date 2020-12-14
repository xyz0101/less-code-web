import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/system/login/login.component';
import { UsersComponent } from './components/system/user/users/users.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/nav' },
  { path: 'nav', component: NavBarComponent ,children:[
    { path: 'user', component: UsersComponent },
    { path: 'login', component: LoginComponent },
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
