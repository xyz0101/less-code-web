import { Injectable } from '@angular/core';
import {
 CanActivate,
 Router,
 ActivatedRouteSnapshot,
 RouterStateSnapshot,
} from '@angular/router';
import { CommonConst } from '../common/constant/CommonConst';
import { ObjectUtils } from '../util/ObjectUtils';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate    {
 constructor(
  private router: Router
 ) {

 }
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  // 权限控制逻辑如 是否登录/拥有访问权限
  console.log('权限校验拦截',localStorage.getItem("token"));
  let isLogin =false;
  if( ObjectUtils.isNotEmpty(localStorage.getItem("token") )){
    isLogin = true;
  }else{
      this.router.navigate(["/login"],{})
  }
  let hasAccessPermission = false
  let urlStr = localStorage.getItem(CommonConst.USER_URLS_KEY)
  console.log("所有地址：",urlStr)
  let urls = urlStr.split(",")
  urls.push("/")
  urls.push("/nav")
  urls.push("/nav/noauth")
  if(state.url){
      hasAccessPermission = urls.indexOf(state.url)>0;
     if(!hasAccessPermission){
         this.router.navigate(['/nav/noauth'])
     }
  }
 
  return isLogin&&hasAccessPermission
 }
  
}