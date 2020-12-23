import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuApiPath } from 'src/app/api_path/system/MenuApiPath';
import { GetParams } from 'src/app/entity/GetParams';
import { MyResponse } from 'src/app/entity/MyResponse';
import { MenuUtils } from 'src/app/util/MenuUtils';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { RequestUtil } from 'src/app/util/RequestUtil';
export class TreeNode {
  key;
  level;
  expand?: boolean;
  parent;
  parentId;
  children?: TreeNode[];
  menuName;
  menuCode;
  menuUrl;
  menuIcon;
  menuOrder;
  menuType:number;
  isLeaf;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
   
  constructor(private http:RequestUtil) { }

 

  deleteMenu(ids):Observable<any>{
    return this.http.postResquest(MenuApiPath.DELETE_MENU_PATH,ids)
  }


  saveMenu(data,fieldMapping):Observable<any>{
    let param = {}
    this.revertMapObject(param,data, fieldMapping)
    console.log("当前保存操作的参数",param)
    return this.http.postResquest(MenuApiPath.SAVE_MENU_PATH,param)
  }

  getMenuListNoButton(fieldMapping):Observable<MyResponse<TreeNode[]>>{
    return this.http.getResquest(MenuApiPath.MENU_TREE_PATH).pipe(map(item=>{
        if(item.code=='200'){
            return MyResponse.ok<TreeNode[]>(this.mappingData(item.data,fieldMapping,false))
        }
    }))
  }

  getMenuList(fieldMapping):Observable<MyResponse<TreeNode[]>>{
    return this.http.getResquest(MenuApiPath.MENU_TREE_PATH).pipe(map(item=>{
        if(item.code=='200'){
            return MyResponse.ok<TreeNode[]>(this.mappingData(item.data,fieldMapping,true))
        }
    }))
  }
  mappingData(data: any[],fieldMapping,needButton:boolean): TreeNode[] {
    let res = [];
      if(ObjectUtils.isNotEmpty(data)&&data.length>0){
        data=MenuUtils.removeNotShowItem(data,needButton)
        data.forEach(item=>{
           this.mapping(item,res,fieldMapping,needButton);
        })
      } 
      return res
  }
  mapping(item,res:any[],fieldMapping,needButton:boolean) {
    let d = new TreeNode()
    d.children=null
    let sub = item['subList']
    sub=MenuUtils.removeNotShowItem(sub,needButton)
    this.mapObject(d,item, fieldMapping);
    res.push(d)
    if(ObjectUtils.isNotEmpty(sub)&&sub.length>0){
      d.children=[]
      sub.forEach(element => {
        this.mapping(element,d.children,fieldMapping,needButton)
      });
      
    }else{
      d.children=null
      d.isLeaf = true;
    }
  }
  /**
   * source 为接收值的对象
   */
  mapObject( source  , target,   fieldMapping ) {
     Object.keys(fieldMapping).forEach(item=>{
       source[item] = target[fieldMapping[item]]
     })
  }
  /**
   * source 为接收值的对象
   */
  revertMapObject( source  , target,   fieldMapping ) {
    Object.keys(fieldMapping).forEach(item=>{
      source[fieldMapping[item]] = target[item]
    })
 }
 /**
  * 获取当前menu的最大序号
  */
 getMaxOrder(id):Observable<number>{
   if(id){
      let param = GetParams.buildParams().setParam("menuId",id);
      return this.http.getResquest(MenuApiPath.GET_MANU_MAX_ORDER_PATH,param).pipe(map(item=>{
          return item.data;
      }))
   }else{
     return new Observable(observer=>{
       observer.next(-1)
     })
   }
  
 }

}
