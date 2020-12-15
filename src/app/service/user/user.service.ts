import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserApiPath } from 'src/app/api_path/UserApiPath';
import { MyResponse } from 'src/app/util/MyResponse';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: RequestUtil, private notifly: NzNotificationService) { }

  /**
   * 分页获取用户信息
   */
  listUserByPage( param): Observable<MyResponse>{
    return this.http.postResquest(UserApiPath.LIST_USER_PATH, param);
  }

  /**
   * 根据ID获取用户信息
   */
  getUserInfoById(id): Observable<MyResponse>{
    return null;
  }
  /**
   * 删除用户信息
   */
  deleteUser(): Observable<MyResponse>{
    return null;
  }
  /**
   * 保存用户信息
   */
  saveUser(): Observable<MyResponse>{
    return null;
  }



 dealData<T>(data: any): Observable<T>{
    return new Observable(obs => {
      obs.next( );
    });
 }
}
