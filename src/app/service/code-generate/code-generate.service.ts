import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { CodeGenerateApiPath } from 'src/app/api_path/code-generate/CodeGenerateApiPath';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class CodeGenerateService {

  constructor(private http:RequestUtil,private notify:NzNotificationService) { }

  /**
   * 获取数据库里面的所有表信息
   */
  listDbTables():Observable<Response>{
      return this.http.getResquest(CodeGenerateApiPath.LIST_DB_TABLES_PATH)
  }

}
