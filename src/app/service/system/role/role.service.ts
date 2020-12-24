import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleApiPath } from 'src/app/api_path/system/RoleApiPath';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:RequestUtil) { }
  /**
   * 分页获取角色
   */
  listRolesByPage(param):Observable<any>{
    return this.http.postResquest(RoleApiPath.LIST_ROLE_BY_PAGE_API_PATH,param)
  }
 /**
   * 保存角色信息
   */
  saveRole(param):Observable<any>{
    return this.http.postResquest(RoleApiPath.SAVE_ROLE_API_PATH,param)
  }

   /**
   * 删除角色
   */
  deleteRole(ids):Observable<any>{
    return this.http.postResquest(RoleApiPath.DELETE_ROLE_API_PATH,ids)
  }
 

   /**
   * 获取所有的角色
   */
  listAllRoles():Observable<any>{
    return this.http.getResquest(RoleApiPath.LIST_ALL_ROLE_API_PATH)
  }


}
