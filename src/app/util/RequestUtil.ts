import { HttpParams, HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError,  OperatorFunction } from 'rxjs';
import { Injectable    } from '@angular/core';
import { catchError , mergeMap } from 'rxjs/operators';
import {   NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { MyResponse } from '../entity/MyResponse';
import { GetParams } from '../entity/GetParams';
import { ObjectUtils } from './ObjectUtils';
@Injectable()
export class RequestUtil{


    static notification: NzNotificationService;
    static router:Router;
    static defaultHeader = new Map();
    constructor(private http: HttpClient, private notifly: NzNotificationService,
        private router:Router) {
        RequestUtil.defaultHeader.set('uid', 'jenkin');
        RequestUtil.notification = this.notifly;
        RequestUtil.router = this.router;
     }


     /**
      * 执行GET请求
      * @param url 请求路径
      * @param param 请求参数
      * @param header 请求头
      */
    public   getResquest<T extends MyResponse<any>|any >(url: string, param?: Map<string, any>|GetParams, header?: Map<string, string>): Observable<T|any>{
                const option = this.handleOption(param, header);
                console.log('getResquest', url, option);

                return this.http.get<T>(url, option).pipe(mergeMap(this.dealData), catchError(this.handleError)
                );


    }
     /**
      * 执行POST请求
      * @param url 请求路径
      * @param param 请求参数
      * @param header 请求头
      */
    public postResquest<T extends MyResponse<any>|any >(
            url: string,
            body: any ,
            param?: Map<string, string>|GetParams, 
            header?: Map<string, string>): Observable<T|any>{
            console.log('posturl   ', url,"参数：",body);
            const option = this.handleOption(param, header);
            return this.http.post<T>(url, body, option).pipe(mergeMap(this.dealData), catchError(this.handleError)
            );


    }

 
 /**
      * 执行文件下载，不去检查返回结果
      * @param url 请求路径
      * @param param 请求参数
      * @param header 请求头
      */
     public   downLoadFile (url: string, param?: Map<string, any>|GetParams, header?: Map<string, string>): Observable< any>{
        const option = this.handleOption(param, header);
        option.responseType= 'blob'
        option.observe= 'response'
        console.log('downLoadFile', url, option);
         
        return this.http.get<any>(url, option ).pipe(catchError(this.handleError),mergeMap(this.dealDownload),
        );
    
    
    }
 /**
      * 执行文件下载，不去检查返回结果
      * @param url 请求路径
      * @param param 请求参数
      * @param header 请求头
      */
     public   downLoadFilePost (url: string,
        body: any ,
         param?: Map<string, any>|GetParams,
         header?: Map<string, string>): Observable< any>{
        const option = this.handleOption(param, header);
        option.responseType= 'blob'
        option.observe= 'response'
        console.log('downLoadFilePost', url, option);
        return this.http.post<any>(url, body,option ).pipe(catchError(this.handleError),mergeMap(this.dealDownload),
        );
    
    
    }
 /**
      * 执行GET请求，不去检查返回结果
      * @param url 请求路径
      * @param param 请求参数
      * @param header 请求头
      */
public   getResquestNoCheck (url: string, param?: Map<string, any>|GetParams, header?: Map<string, string>): Observable< any>{
    const option = this.handleOption(param, header);
    console.log('getResquestNoCheck', url, option);
    
    return this.http.get<any>(url, option).pipe(catchError(this.handleError)
    );


}
 /**
      * 执行POST请求，不去检查返回结果
      * @param url 请求路径
      * @param param 请求参数
      * @param header 请求头
      */
public postResquestNoCheck<T extends MyResponse<any>|any >(
url: string,
 body: any ,
 param?: Map<string, string>|GetParams, 
 header?: Map<string, string>): Observable<T|any>{
console.log('posturl   ', url);
const option = this.handleOption(param, header);
return this.http.post<T>(url, body, option).pipe(  catchError(this.handleError)
);


}

private handleOption(param?: Map<string, any>|GetParams, header?: Map<string, string>): any{
   //添加token
    let token = localStorage.getItem("token")
   
    let headers =null;
    if(token!=undefined&&token!=null){
        headers=new HttpHeaders({"token":token});
    }else{
        headers=new HttpHeaders();
    }
     
    var params = new HttpParams();

    if (param !== undefined&& param!=null){
        if (param instanceof GetParams){
            param = param.param;
        }
        param.forEach((val, key) => {
            params = params.set(key, val);
        });
    }
    RequestUtil.defaultHeader.forEach((val, key) => {
        headers=headers.set(key, val);
    });
    if (header !== undefined&& header!=null){
        header.forEach((val, key) => {
            headers =  headers.set(key, val);
        });
    }
    const option = {headers, params};
    return option;
}


private dealData<T extends MyResponse<any>|any>(event: any  ): Observable< T> {
    console.log('请求拦截', event);


    if (event.code == '200'){
            // this.notification.create('success','操作成功',event.msg);
            return new Observable(observer => observer.next(event)); // 请求成功返回响应
        }else{
            if(event.code=='401'){
                RequestUtil.router.navigate(["/login"],{} );
                
            }else{
                RequestUtil.notification.error( '操作失败', event.msg);
            return new Observable(observer => observer.next(event)); // 请求成功返回响应
            }
            
        }



}

private dealDownload (res:  HttpResponse<any>  ): Observable< any> {
    console.log('dealDownload请求拦截',);
    let attach =  res.headers.get("content-disposition");
    attach=ObjectUtils.isNotEmpty(attach)?attach:"result"
     let data = MyResponse.ok(res.body)
     data.extraData={fileName:attach.replace('attachment;filename=',''),responseType: res.headers.get("content-type")}

    return new Observable(observer => observer.next(data)); // 请求成功返回响应


}









private handleError(res: HttpResponse<any>)  {   // 请求失败处理
    console.log('失败事件', res);
    // switch (res.status) {
    //   case 401:
    //     break;
    //   case 200:
    //     break;
    //   case 404:
    //     break;
    //   case 403:
    //     break;
    // }
    if (res.status != 200){
            RequestUtil.notification.error( '系统错误: ' + res.status, '系统异常，请联系管理员');
            throw new Error('系统异常，请联系管理员')
    }

    return throwError(res);
  }


 
  public static notifySuccess (msg){
    RequestUtil.notification.success("提示信息",msg);
  }

  public static notifyError (msg){
    RequestUtil.notification.success("错误信息",msg);
  }

 /**
  * 请求成功之后保存成文件
  * @param data
  * @param name
  */
 public static downloadFileInLocal(data: Blob, name: string,type:string) {
    var a = document.createElement('a');
    var blob = new Blob([data], { 'type': ObjectUtils.isNotEmpty(type)?
    type:'application/octet-stream' });
    a.href = URL.createObjectURL(blob);
    if(ObjectUtils.isNotEmpty(name)){
        a.download = name ;
    }
    a.click();
  }
 

}
