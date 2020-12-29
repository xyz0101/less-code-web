import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallpaperCategoryComponent } from './components/aibizhi/wallpaper-category/wallpaper-category.component';
import { WallpaperListComponent } from './components/aibizhi/wallpaper-list/wallpaper-list.component';
import { WallpaperComponent } from './components/aibizhi/wallpaper/wallpaper.component';
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
  {
    path: '', pathMatch: 'full', redirectTo: '/nav', data: {
      customBreadcrumb: '首页'
    }
  },
  //d登录模块
  {
    path: 'login', component: LoginComponent, data: {
      customBreadcrumb: '登录'
    }
  },
  {
    path: 'nav', component: NavBarComponent, data: {
      customBreadcrumb: '首页'
    },
    // 导航条子模块
    children: [
      { path: 'noauth', component: NoauthComponent },
      {
        path: 'system', children: [
          // 用户模块
          {
            path: 'user', component: UsersComponent, data: {
              customBreadcrumb: '用户管理'
            }
          },
          {
            path: 'menu', component: MenuComponent, data: {
              customBreadcrumb: '菜单管理'
            }
          },
          {
            path: 'role', component: RoleComponent, data: {
              customBreadcrumb: '角色管理'
            }
          },
          
        ],

      },
      {
        path: 'wpManage', component:WallpaperComponent, data: {
          customBreadcrumb: '壁纸管理'
        },children:[
          {
            path: 'category', component: WallpaperCategoryComponent , data: {
              customBreadcrumb: '壁纸分类'
            },children:[
              {
                path: 'wallpaper', component: WallpaperListComponent , data: {
                  customBreadcrumb: '壁纸列表'
                }
              }
            ]
          }
        ]
      },
      //代码生成器 
      {
        path: 'code', children: [
          { path: 'codegenerate', component: CodeGenerateComponent, data: {
            customBreadcrumb: '代码生成器 '
          } },
        ]
      },
    ]
    //路由守卫，登陆检测
    , canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' ,onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
