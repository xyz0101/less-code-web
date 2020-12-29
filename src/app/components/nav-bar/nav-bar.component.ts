import { Component, OnInit } from '@angular/core';
import { LoginApiPath } from 'src/app/api_path/system/LoginApiPath';
import { CommonConst } from 'src/app/common/constant/CommonConst';
import { LocalStorageConst } from 'src/app/common/constant/LocalStorageConst';
import { MenuService, TreeNode } from 'src/app/service/system/menu/menu.service';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { RouteUtils } from 'src/app/util/RouteUtils';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  fieldMapping={
    'key':'id',
    'parentId':'parent',
    'title':'name',
    'menuCode':'code',
    'level':'menuLevel',
    'routeUrl': 'menuUrl',
    'icon':'menuIcon',
    'menuOrder':'menuOrder',
    'menuType':'menuType',
   }
 

  mode = false;
  dark = false;
  
  constructor(private http:RequestUtil,private menuService:MenuService,private router:RouteUtils) { }
  isCollapsed = false;
  menuTree :TreeNode[]
  ngOnInit(): void {
    this.menuService.getMenuListByUserNoButton(this.fieldMapping).subscribe(item=>{
      if(item.code=='200'){
        this.menuTree=item.data
      }
    })
  }
 

  logOut(){
    this.http.getResquest(LoginApiPath.LOGOUT_PATH).subscribe(res=>{
      if(res.code=='200'){
        RequestUtil.notifySuccess("注销成功")
        this.router.simpleRoute('/login')
      }
    })
  }

}
