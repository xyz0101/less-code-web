import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    throw new Error('Method not implemented.');
  }
  public afterLoadData() {
     
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
    this.pageSize=2;
    this.reload()
  }

}
