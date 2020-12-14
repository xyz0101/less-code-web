import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: RequestUtil, private notifly: NzNotificationService) { }
  /**
   * 获取公钥
   */
  getPublicKey(): Observable<any>{
    console.log('getPublicKey');
    return this.http.getResquest<any>('/lsc/system/user/getPublicKey').pipe( map(item => {
      return item.data.encoded;
    }));
 }
 /**
  * 登录
  */
  login(): Observable<any>{
      return null;
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
