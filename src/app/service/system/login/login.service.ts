import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginApiPath } from 'src/app/api_path/system/LoginApiPath';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { RouteUtils } from 'src/app/util/RouteUtils';
import { SecurityUtils } from 'src/app/util/SecurityUtils';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: RequestUtil,private router:RouteUtils , private notifly: NzNotificationService) { }
  /**
   * 获取公钥
   */
  getPublicKey(): Observable<any>{
    console.log('getPublicKey');
    return this.http.getResquest<any>(LoginApiPath.GET_PUBLIC_KEY).pipe( map(item => {
      return item.data.encoded;
    }));
 }
 /**
  * 获取当前登录的用户
  */
  getCurrentUser(): Observable<any>{
 
    return this.http.getResquest(LoginApiPath.GET_CURRENT_USER);
    
  }
  /**
   * 登出
   */
  logout(): Observable<any>{
    return null;
  }
  /**
   * 注册
   */
  register(): Observable<any>{
    return null;
  }
  /**
   * 获取验证码
   */
  getCheckCode(): Observable<any>{
    return null;
  }


}
