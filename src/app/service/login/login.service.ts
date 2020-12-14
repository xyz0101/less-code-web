import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginApiPath } from 'src/app/api_path/LoginApiPath';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { SecurityUtils } from 'src/app/util/SecurityUtils';

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
    return this.http.getResquest<any>(LoginApiPath.GET_PUBLIC_KEY).pipe( map(item => {
      return item.data.encoded;
    }));
 }
 /**
  * 登录
  */
  login(value) {
 
     this.getPublicKey().subscribe(item=>{
        console.log("res",item)
        let security = SecurityUtils.encrypt(item , value )
        let map = new Map()
        map.set("info",security)
      return this.http.postResquest(LoginApiPath.LOGIN_PATH,null,null,map).subscribe(item=>{
        this.notifly.success("提示信息！","登陆成功！")
        localStorage.setItem("token",item.data)
        this.http.route("/nav/user",{})
       })
    }) ;
    

     
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
