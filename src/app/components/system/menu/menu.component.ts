import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryFields } from 'src/app/entity/QueryFields';
import { MenuService, TreeNode } from 'src/app/service/system/menu/menu.service';
import { PermissionService } from 'src/app/service/system/permission/permission.service';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { BaseComponent } from '../../BaseComponent';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  extends BaseComponent  implements OnInit {
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
    'isLevel1':'level1Flag',
     'permissions':'permissions',
   }
   /**
    * 权限列表
    */
   permissionList=[]
   maxOrder =0;

  MENU_TYPE={
    1:'菜单',
    2:'按钮',
    3:'子模块' 
  }

  menuTypeChooseList : {key:number;value:string}[]
  tempFormData
  menuMap = new Map();

  public getListData(param: any): Observable<any> {
    return this.menuService.getMenuList(this.fieldMapping) 
  }
  public onDeleteData(ids: any): Observable<any> {
    return  this.menuService.deleteMenu(ids)
  }
  public afterLoadData() {
    this.dataList.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
   
  }
  
  public getSearchFields(): QueryFields {
    return null;
  }

  beforeDrawerSubmit(){
    
    this.validataFormAndTrowError()
    let permissions =this.validateForm.get('selectedPermission').value

    if(permissions){
      let val = '';
      permissions.forEach(element => {
       val = val+','+element
      });
      this.validateForm.get( "permissions" ).setValue(val.substring(1,val.length))

    }
  }
  saveDrawerData(data:any):Observable<any>{
    console.log('保存表单',data)
    return this.menuService.saveMenu(data,this.fieldMapping)
    
  }

  initDrawerEditForm(data){
    this.tempFormData = data
    this.initMaxOrder(data.parentId)
    this.initMenuType()
    this.initPermissionList()
    let selectedPermission = [];
    if(data.permissions){ 
      data.permissions.split(",").forEach(element => {
        selectedPermission.push(Number(element))
      });
   }


    console.log('初始化表单：',data)
    let node =  data.parent
    this.validateForm = this.fb.group({
      key: new FormControl({ value: data.key, disabled: false }, this.isAdd?null:Validators.required),
      menuCode: new FormControl({ value: data.menuCode, disabled: false }, Validators.required),
      menuName: new FormControl({ value: data.menuName, disabled: false }, Validators.required),
      level: new FormControl({ value: data.level, disabled: false } ),
      isLevel1: new FormControl({ value: data.level1Flag, disabled: false } ),
      menuOrder: new FormControl({ value: data.menuOrder, disabled: false }, Validators.required),
      menuIcon: new FormControl({ value: data.menuIcon, disabled: false }),
      menuType: new FormControl({ value: data.menuType, disabled: false }, Validators.required),
      menuUrl: new FormControl({ value: data.menuUrl, disabled: false }, Validators.required),
      parentId: new FormControl({ value: data.parentId, disabled: false }, Validators.required),
      parent: new FormControl({ value: data.parent, disabled: false } ),
      parentName: new FormControl({ value: node?node.menuName:'', disabled: false },  ),
      selectedPermission: new FormControl({ value: selectedPermission, disabled: false },  ),
      permissions: new FormControl({ value: data.permissions, disabled: false },  ),
      
    }
    )
    console.log('初始化表单：',this.validateForm.value)
  }
  initPermissionList() {
    let fieldMapping = {
      'permissionName':'name',
      'permissionCode':'code',
      'permissionId':'id',
    }
     this.permissionService.listPermission().subscribe(item=>{
       let arr = []
       item.data.forEach(item=>{
         let data = {}
          ObjectUtils.mapObject(data,item,fieldMapping)
          arr.push(data);
       })
       this.permissionList = arr;
     })
  }

  onSelectLevel1(){
    if(   this.validateForm.get("isLevel1").value){
      this.validateForm.get("parentId").setValue(-1);
    }else{
      this.validateForm.get("parentId").setValue(this.tempFormData.parentId);
    }
    this.validateForm.get("menuOrder").setValue(this.tempFormData.menuOrder);
    console.log('一级菜单选择后：',this.validateForm.get("parentId").value)
    this.initMaxOrder(this.validateForm.get("parentId").value)
  }

  /**
   * 初始化最大序号
   */
  initMaxOrder(parentId: any) {
    if(ObjectUtils.isNotEmpty(parentId)){ 
      this.menuService.getMaxOrder(parentId).subscribe(order=>{
          this.maxOrder = this.isAdd?order:order-1;
      })
    }else{
      this.maxOrder = 0;
    }
  }
  initMenuType() {
    let arr = []
    Object.keys(this.MENU_TYPE).forEach(item=>{
      arr.push({'key':Number(item),'value':this.MENU_TYPE[item]}) 
    })
    this.menuTypeChooseList = arr
  }



beforeDrawerAddButton(){
 
}

  constructor(public fb: FormBuilder, public modelService: NzModalService,
    private permissionService:PermissionService,
          private menuService:MenuService) {
    super(fb,modelService);
  }

  ngOnInit(): void {
   
    this.reload()
  }


  mapOfExpandedData: { [key: string]: TreeNode[] } = {};




   collapse(array: TreeNode[], data: TreeNode, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNode): TreeNode[] {
    const stack: TreeNode[] = [];
    const array: TreeNode[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });
 
    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.menuMap.set(root.key,root)
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNode, hashMap: { [key: string]: boolean }, array: TreeNode[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }


  confirmChooseIcon(data){
    this.validateForm.get("menuIcon").setValue(data)
    console.log('当前选择了icon：',data)
  }

  confirmChooseMenu(data){
    this.validateForm.get("parentName").setValue(data.title)
    this.validateForm.get("parentId").setValue(data.key)
    this.initMaxOrder(data.key)
    console.log('当前选择了Menu：',data)
  }
  
  defaultSelectIcon(){
    return this.validateForm.get("menuIcon").value
  }

  


}
