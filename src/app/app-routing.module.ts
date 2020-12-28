import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeGenerateComponent } from './components/code-generate/code-generate.component';
import { FilesComponent } from './components/files/files.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/system/login/login.component';
import { MenuComponent } from './components/system/menu/menu.component';
import { NoauthComponent } from './components/system/noauth/noauth.component';
import { RoleComponent } from './components/system/role/role.component';
import { UsersComponent } from './components/system/users/users.component';
import { AuthGuard } from './guard/AuthGuard';

const routes: Routes = [
  //导航栏
  { path: '', pathMatch: 'full', redirectTo: '/nav' },
  //d登录模块
  { path: 'login', component: LoginComponent },
  {
    path: 'nav', component: NavBarComponent,
    // 导航条子模块
    children: [
      { path: 'noauth', component: NoauthComponent },
      { 
        path: 'system', children: [
          // 用户模块
          { path: 'user', component: UsersComponent },
          { path: 'menu', component: MenuComponent },
          { path: 'role', component: RoleComponent },
           { path: 'aibizhi', component: FilesComponent },
        ],

      },
      //代码生成器 
      {
        path: 'code', children: [
          { path: 'codegenerate', component: CodeGenerateComponent },
        ]
      },
    ]
    //路由守卫，登陆检测
    , canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
