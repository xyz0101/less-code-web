import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LscFileApiPath } from 'src/app/api_path/files/LscFileApiPath';
import { GetParams } from 'src/app/entity/GetParams';
import { MyResponse } from 'src/app/entity/MyResponse';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class LscFileService {

  /**
   * 分页获取信息
   */
  listByPage(param):Observable<any>{
    return this.http.postResquest(LscFileApiPath.LIST_BY_PAGE_PATH,param)
  }
  /**
   * 保存 信息
   */
  save(param):Observable<any>{
    return this.http.postResquest(LscFileApiPath.SAVE_INFO_PATH,param)
  }

  /**
   * 删除
   */
  deleteInfo(ids):Observable<any>{
    return this.http.postResquest(LscFileApiPath.DELETE_BY_ID_PATH,ids)
  }


  /**
   * 获取所有的信息
   */
  listAllData():Observable<any>{
    return this.http.getResquest(LscFileApiPath.LIST_ALL_DATA_PATH)
  }

  /**
   * 根据ID获取 信息
   */
  getInfoById(id):Observable<any>{
    return this.http.getResquest(LscFileApiPath.GET_BY_ID_PATH,id)
  }


  constructor(private http: RequestUtil) {



  }


 
}
