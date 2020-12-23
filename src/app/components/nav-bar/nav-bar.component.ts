import { Component, OnInit } from '@angular/core';
import { LoginApiPath } from 'src/app/api_path/system/LoginApiPath';
import { MenuService, TreeNode } from 'src/app/service/system/menu/menu.service';
import { RequestUtil } from 'src/app/util/RequestUtil';

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
  
  constructor(private http:RequestUtil,private menuService:MenuService) { }
  isCollapsed = false;
  menuTree :TreeNode[]
  ngOnInit(): void {
    this.menuService.getMenuListNoButton(this.fieldMapping).subscribe(item=>{
      if(item.code=='200'){
        this.menuTree=item.data
      }
    })
  }

  logOut(){
    this.http.getResquest(LoginApiPath.LOGOUT_PATH).subscribe(res=>{
      if(res.code=='200'){
        RequestUtil.notifySuccess("注销成功")
        this.http.simpleRoute('/login')
      }
    })
  }

}
