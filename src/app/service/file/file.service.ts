import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileApiPath } from 'src/app/api_path/FileApiPath';
import { GetParams } from 'src/app/util/GetParams';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:RequestUtil) {

    
   }


   public downloadFile(code):Observable<any>{
     let param = GetParams.buildParams().setParam("code",code);
    //  let header =GetParams.buildParams().setParam("Content-type","blob").param
     return this.http.downLoadFile(FileApiPath.DOWNLOAD_FILE_PATH,param ,null)
   }


}
