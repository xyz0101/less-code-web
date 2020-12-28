import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AibizhiAipPath } from 'src/app/api_path/files/AibizhiApiPath';
import { MyResponse } from 'src/app/entity/MyResponse';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Injectable({
  providedIn: 'root'
})
export class AibizhiService {




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
