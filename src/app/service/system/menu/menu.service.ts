import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuApiPath } from 'src/app/api_path/system/MenuApiPath';
import { MyResponse } from 'src/app/entity/MyResponse';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { RequestUtil } from 'src/app/util/RequestUtil';
export class TreeNode {
  key;
  level;
  expand?: boolean;
  parent;
  parentId;
  children?: TreeNode[];
  name;
  code;
  menuUrl;
  menuIcon;
  menuOrder;
  menuType;
  isLeaf;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
   
  constructor(private http:RequestUtil) { }

  fieldMapping={
   'key':'id',
   'parentId':'parent',
   'menuName':'name',
   'menuCode':'code',
   'level':'menuLevel',
   'menuUrl': 'menuUrl',
   'menuIcon':'menuIcon',
   'menuOrder':'menuOrder',
   'menuType':'menuType',
  }


  getMenuList():Observable<MyResponse<TreeNode[]>>{
    return this.http.getResquest(MenuApiPath.MENU_TREE_PATH).pipe(map(item=>{
        if(item.code=='200'){
            return MyResponse.ok<TreeNode[]>(this.mappingData(item.data))
        }
    }))
  }
  mappingData(data: []): TreeNode[] {
    let res = [];
      if(ObjectUtils.isNotEmpty(data)&&data.length>0){
        data.forEach(item=>{
           this.mapping(item,res);
        })
       
      } 
      return res
  }
  mapping(item,res:any[]) {
    let d = new TreeNode()
    d.key = item['id'];
    d.level = item['menuLevel']
    d.parentId = item['parent']
    d.children=[]
    let sub = item['subList']
    this.mapObject(d,item,this.fieldMapping);
    res.push(d)
    if(ObjectUtils.isNotEmpty(sub)&&sub.length>0){
      sub.forEach(element => {
        this.mapping(element,d.children)
      });
      
    }else{
      d.isLeaf = true;
    }
  }
  mapObject( source  , target,   fieldMapping ) {
     Object.keys(fieldMapping).forEach(item=>{
       source[item] = target[fieldMapping[item]]
     })
  }

  revertMapObject( source  , target,   fieldMapping ) {
    Object.keys(fieldMapping).forEach(item=>{
      source[fieldMapping[item]] = target[item]
    })
 }
}
