import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodeGenerateApiPath } from 'src/app/api_path/code-generate/CodeGenerateApiPath';
import { GetParams } from 'src/app/entity/GetParams';
import { MyResponse } from 'src/app/entity/MyResponse';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class CodeGenerateService {
  deleteByIds(ids: any):Observable<MyResponse<any>> {
    return this.http.postResquest(CodeGenerateApiPath.DELETA_TABLE_INFO_PATH,ids)
  }
  generateCode(data: any) :Observable<any>{
  
    let type = 'application/octet-stream';
    let name= 'result.zip'
    return this.http.downLoadFilePost(CodeGenerateApiPath.GENERATE_CODE_PATH,data).pipe(map(item=>{
      
      RequestUtil.downloadFileInLocal(item.data,name,type)
      return MyResponse.ok()
    }))

  }
  createTable(data: any): Observable<MyResponse<any>>{
   return this.http.postResquest(CodeGenerateApiPath.CREATE_TABLE_PATH,data);
  }
  getCamelName(name: any) {
    let param = GetParams.buildParams().setParam("code",name);
    return this.http.getResquest(CodeGenerateApiPath.UNDERLINE_TO_CAMEL_PATH,param)
  }
  getCollationInfoMap() {
    
    return this.http.getResquest(CodeGenerateApiPath.GET_COLLATION_INFO_PATH)
  }
  getTypeInfoMap() {
    return this.http.getResquest(CodeGenerateApiPath.GET_TYPE_INFO_PATH)
  }

  constructor(private http:RequestUtil,private notify:NzNotificationService) { }

  /**
   * 获取数据库里面的所有表信息
   */
  listDbTables():Observable<Response>{
      return this.http.getResquest(CodeGenerateApiPath.LIST_DB_TABLES_PATH);
  }

 saveTableInfo(data):Observable<any> {
    return  this.http.postResquest(CodeGenerateApiPath.SAVE_TABLE_INFO_PATH,data) 
 }



}
