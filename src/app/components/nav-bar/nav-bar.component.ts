import { Component, OnInit } from '@angular/core';
import { LoginApiPath } from 'src/app/api_path/system/LoginApiPath';
import { CommonConst } from 'src/app/common/constant/CommonConst';
import { MenuService, TreeNode } from 'src/app/service/system/menu/menu.service';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
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
    this.menuService.getMenuListByUserNoButton(this.fieldMapping).subscribe(item=>{
      if(item.code=='200'){
        this.menuTree=item.data
        this.cacheUserPermission(this.menuTree)
      }
    })
  }
  cacheUserPermission(menuTree: any[]) {
    let urls= []
    menuTree.forEach(item=>{
        this.loadPermission(item,urls)
    })
    let urlStr =''
    urls.forEach(item=>{urlStr=urlStr+','+item});
    urlStr =urls.length>0?urlStr.substring(1,urlStr.length):urlStr
    console.log('缓存用户的url:',urlStr)
    localStorage.setItem(CommonConst.USER_URLS_KEY,urlStr );
  }
  loadPermission(item: any , urls:any[]) {
     if(ObjectUtils.isNotEmpty(item.routeUrl)){
      urls.push(item.routeUrl)
     }
     if(ObjectUtils.isNotEmpty(item.children)&&item.children.length>0){
       item.children.forEach(child=>{
         this.loadPermission(child,urls)
       })
     }
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
