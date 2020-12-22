import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryFields } from 'src/app/entity/QueryFields';
import { MenuService, TreeNode } from 'src/app/service/system/menu/menu.service';
import { BaseComponent } from '../../BaseComponent';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  extends BaseComponent  implements OnInit {

  MENU_TYPE={
    1:'菜单',
    2:'按钮'
  }

  menuTypeChooseList = []

  public getListData(param: any): Observable<any> {
    return this.menuService.getMenuList() 
  }
  public onDeleteData(ids: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  public afterLoadData() {
    this.dataList.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });
   
  }
  public getSearchFields(): QueryFields {
    return null;
  }

  initDrawerEditForm(data){
    this.validateForm = this.fb.group({
      menuCode: new FormControl({ value: data.menuCode, disabled: false }, Validators.required),
      menuName: new FormControl({ value: data.menuName, disabled: false }, Validators.required),
      level: new FormControl({ value: data.level, disabled: false }, Validators.required),
      menuOrder: new FormControl({ value: data.menuOrder, disabled: false }, Validators.required),
      menuIcon: new FormControl({ value: data.menuIcon, disabled: false }, Validators.required),
      menuType: new FormControl({ value: data.menuType, disabled: false }, Validators.required),
      parentId: new FormControl({ value: data.parentId, disabled: false }, Validators.required),
      parent: new FormControl({ value: data.parent, disabled: false }, Validators.required),
    }
    )
  }

beforeDrawerAddButton(){
  Object.keys(this.MENU_TYPE).forEach(item=>{
    this.menuTypeChooseList.push({'key':item,'value':this.MENU_TYPE[item]})
  })
}
  constructor(public fb: FormBuilder, public modelService: NzModalService,
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


}
