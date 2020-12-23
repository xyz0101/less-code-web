import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { QueryFields } from 'src/app/entity/QueryFields';
import { RoleService } from 'src/app/service/system/role/role.service';
import { BaseComponent } from '../../BaseComponent';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent extends BaseComponent implements OnInit {



 

  public getListData(param: any): Observable<any> {
    return this.roleService.listRolesByPage(param)
  }
  public onDeleteData(ids: any): Observable<any> {
   return this.roleService.deleteRole(ids)
  }
  public afterLoadData() {
     
  }
  beforeDrawerSubmit(){
    this.validataFormAndTrowError()
  }
  beforeAddButton(){

  }


  beforeDrawerAddButton(){
    this.validataFormAndTrowError()
  }

  initDrawerEditForm(data){
    //TODO 检查菜单的格式

    this.validateForm = this.fb.group({
      id: new FormControl({ value: data.id, disabled: false } ),
      menuNames: new FormControl({ value: data.menuNames, disabled: false } ),
      menuKeys: new FormControl({ value: data.menuKeys, disabled: false } ),
      roleCode: new FormControl({ value: data.roleCode, disabled: false } ,Validators.required),
      roleName: new FormControl({ value: data.roleName , disabled: false } ,Validators.required),
        }
        )
  }
  

  saveDrawerData(data:any){
    return this.roleService.saveRole(data)
  }

  public getSearchFields(): QueryFields {
    return null
  }

   constructor(private roleService:RoleService,
               public fb: FormBuilder,
               public msg: NzMessageService ,
               public modelService: NzModalService) {
      super(fb, modelService)
     }
  ngOnInit(): void {
    
    super.reload()
  }

  confirmChooseMenu(data){
      console.log('选择了菜单：',data)
      let names = '';
      let ids = []
      data.forEach(element => {
        names = names+','+element.title 
        ids.push(element.key)
      });
     
      this.validateForm.get('menuNames').setValue(names)
      this.validateForm.get('menuKeys').setValue( ids)
  }





}
