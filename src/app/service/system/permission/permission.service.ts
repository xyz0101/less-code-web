import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionApiPath } from 'src/app/api_path/system/PermissionApiPath';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http:RequestUtil) { }

/**
 * 获取所有的权限
 */
listPermission():Observable<any>{
  return this.http.getResquest(PermissionApiPath.LIST_ALL_PERMISSION_API_PATH)
}

}
