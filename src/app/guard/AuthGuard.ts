import { Injectable } from '@angular/core';
import {
 CanActivate,
 Router,
 ActivatedRouteSnapshot,
 RouterStateSnapshot,
} from '@angular/router';
import { CommonConst } from '../common/constant/CommonConst';
import { LocalStorageConst } from '../common/constant/LocalStorageConst';
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
  let urlStr = localStorage.getItem(LocalStorageConst.USER_URLS_KEY)
  let currentURL= state.url;
  if(currentURL.indexOf("?")>0){
    currentURL = currentURL.substring(0,currentURL.indexOf("?"))
  }
  console.log("当前地址：",currentURL)
  console.log("所有地址：",urlStr)
  let urls = ObjectUtils.isNotEmpty(urlStr)? urlStr.split(","):[]
  urls.push("/")
  urls.push("/nav")
  urls.push("/nav/noauth")
  if(currentURL){
      hasAccessPermission = urls.indexOf(currentURL)>0;
     if(!hasAccessPermission){
         this.router.navigate(['/nav/noauth'])
     }
  }
 
  return isLogin&&hasAccessPermission
 }
  
}