import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LscFileToolsApiPath } from 'src/app/api_path/files/LscFileToolsApiPath';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class FileToolsService {

  constructor(private http: RequestUtil) {
  }

  generate(param):Observable<any>{
    return this.http.postResquest(LscFileToolsApiPath.GENERATE_INFO_PATH,param)
  }



  }
