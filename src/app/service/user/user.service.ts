import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserApiPath } from 'src/app/api_path/UserApiPath';
import { MyResponse } from 'src/app/entity/MyResponse';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
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
  deleteUser(ids:Set<number>): Observable<MyResponse>{
    let arr = [];
    if(ObjectUtils.isNotEmpty(ids)){
      ids.forEach(item=>{
        arr.push(item)
      })
    }
    return this.http.postResquest(UserApiPath.DELETE__USER_PATH,arr);
  }
  /**
   * 保存用户信息
   */
  saveUser(data) {
    return this.http.postResquest(UserApiPath.SAVE_USER_PATH,data,null,null).subscribe(item=>{
      if(item.code=='200'){
        this.notifly.success("提示信息","保存成功")
      }
    })
  }



 dealData<T>(data: any): Observable<T>{
    return new Observable(obs => {
      obs.next( );
    });
 }
}
