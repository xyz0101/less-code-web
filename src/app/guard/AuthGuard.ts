import { Injectable } from '@angular/core';
import {
 CanActivate,
 Router,
 ActivatedRouteSnapshot,
 RouterStateSnapshot,
} from '@angular/router';
import { ObjectUtils } from '../util/ObjectUtils';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate    {
 constructor(
  private router: Router
 ) {

 }
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  // 权限控制逻辑如 是否登录/拥有访问权限
  console.log('canActivate',localStorage.getItem("token"));
  
  if( ObjectUtils.isNotEmpty(localStorage.getItem("token") )){
      return true;
  }else{
      this.router.navigate(["/login"],{})
  }
 }
  
}