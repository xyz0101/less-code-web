import { HttpParams, HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError,  OperatorFunction } from 'rxjs';
import { Injectable    } from '@angular/core';
import { catchError , mergeMap } from 'rxjs/operators';
import { GetParams } from './GetParams';
import {   NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
@Injectable()
export class RequestUtil{


    static notification: NzNotificationService;
    static defaultHeader = new Map();
    constructor(private http: HttpClient, private notifly: NzNotificationService,
        private router:Router) {
        RequestUtil.defaultHeader.set('uid', 'jenkin');
        RequestUtil.notification = this.notifly;
     }



    public   getResquest<T extends Response|any >(url: string, param?: Map<string, any>|GetParams, header?: Map<string, string>): Observable<T|any>{
            const option = this.handleOption(param, header);
            console.log('getResquest', url, option);

            return this.http.get<T>(url, option).pipe(mergeMap(this.dealData), catchError(this.handleError)
            );


}
    public postResquest<T extends Response|any >(
        url: string,
         body: any ,
         param?: Map<string, string>|GetParams, 
         header?: Map<string, any>): Observable<T|any>{
        console.log('posturl   ', url);
        const option = this.handleOption(param, header);
        return this.http.post<T>(url, body, option).pipe(mergeMap(this.dealData), catchError(this.handleError)
        );


}

private handleOption(param?: Map<string, any>|GetParams, header?: Map<string, string>): any{
    let headers = new HttpHeaders();
    let params = new HttpParams();

    if (param !== undefined&& param!=null){
        if (param instanceof GetParams){
            param = param.param;
        }
        param.forEach((val, key) => {
            params = params.set(key, val);
        });
    }
    RequestUtil.defaultHeader.forEach((val, key) => {
        headers.append(key, val);
    });
    if (header !== undefined&& header!=null){
        header.forEach((val, key) => {
            headers =  headers.set(key, val);
        });
    }

    const option = {headers, params};
    return option;
}


private dealData<T extends Response|any>(event: any  ): Observable< T> {
    console.log('请求拦截', event);


    if (event.code == '200'){
            // this.notification.create('success','操作成功',event.msg);
            return new Observable(observer => observer.next(event)); // 请求成功返回响应
        }else{
            RequestUtil.notification.error( '操作失败', event.msg);
            return new Observable(observer => observer.next(event)); // 请求成功返回响应
        }



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
    }

    return throwError(res);
  }


  public   route(path,param){
    this.router.navigate([path],param );
  }


}
