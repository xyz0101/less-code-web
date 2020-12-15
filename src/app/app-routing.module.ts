import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/system/login/login.component';
import { UsersComponent } from './components/system/user/users/users.component';
import { AuthGuard } from './guard/AuthGuard';

const routes: Routes = [
  //导航栏
  { path: '', pathMatch: 'full', redirectTo: '/nav'  },
  //d登录模块
  { path: 'login', component: LoginComponent },
  { path: 'nav', component: NavBarComponent ,
  // 导航条子模块
    children:[
      // 用户模块
      { path: 'user', component: UsersComponent },
      
    ]
  //路由守卫，登陆检测
  ,canActivate: [AuthGuard],},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
