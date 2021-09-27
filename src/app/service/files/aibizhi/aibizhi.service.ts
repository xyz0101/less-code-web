import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AibizhiAipPath } from 'src/app/api_path/files/AibizhiApiPath';
import { GetParams } from 'src/app/entity/GetParams';
import { MyResponse } from 'src/app/entity/MyResponse';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class AibizhiService {
  
  /**
   * 设置壁纸
   * @param data 
   */
  setWallpaper(data: any):Observable<MyResponse<any>> {
    return this.http.postResquest(AibizhiAipPath.CHANGE_WALLPAPER_PATH,data) 
  }
  /**
   * 下载壁纸
   * @param code 
   */
  downloadDeskImg(code: any) {

    let param = GetParams.buildParams().setParam("imgId",code);
    this.http.downLoadFile(AibizhiAipPath.DOWNLOAD_WALLPAPER_PATH,param).subscribe(item=>{
      console.log('爱壁纸',item)
      RequestUtil.downloadFileInLocal(item.data,item.extraData.fileName,item.extraData.responseType)
    })
  }




  constructor(private http: RequestUtil) {



  }



  /**
   * 获取壁纸分类信息
   */
 public getCategory():Observable<MyResponse<Category[]>>{
   return this.http.getResquest(AibizhiAipPath.LIST_CATEGORY_PATH).pipe (map(item=>{
     if(item.code=='200'){
      return MyResponse.ok(item.data.res.category)
     }else{
       return item
     }
    
   }))
 }


  /**
   * 获取壁纸分类信息(网页版)
   */
  public getWebImageList(code,skip):Observable<MyResponse<Wallpaper[]>>{
    let param = GetParams.buildParams().setParam("category",code).setParam("skip",skip);
    return this.http.getResquest(AibizhiAipPath.GET_WEB_WALLPAPER_PATH,param).pipe (map(item=>{
      if(item.code=='200'){
       return MyResponse.ok(item.data.res.wallpaper)
      }else{
        return item
      }
     
    }))
  }
 
   /**
   * 获取壁纸分类信息(非网页版)
   */
  public getImageList(code,skip):Observable<MyResponse<Wallpaper[]>>{
    let param = GetParams.buildParams().setParam("category",code).setParam("skip",skip);
    return this.http.getResquest(AibizhiAipPath.GET_WALLPAPER_PATH,param).pipe (map(item=>{
      if(item.code=='200'){
       return MyResponse.ok(item.data.res.wallpaper)
      }else{
        return item
      }
     
    }))
  }
 
  

 






}
export class Category {
  count: number;
  ename: string;
  rname: string;
  cover_temp: string;
  name: string;
  cover: string;
  rank: number;
  filter: [];
  sn: number;
  icover: string;
  atime: number;
  type: number;
  id: string;
  picasso_cover: string;
}

export class Wallpaper {
  views: number;
  ncos: number;
  rank: number;
  tag: [];
  wp: string;
  xr: boolean;
  cr: boolean;
  favs: number;
  atime: number;
  id: string;
  desc: string;
  thumb: string;
  img: string;
  cid: [];
  url: [];
  preview: string;
  store: string;
}
