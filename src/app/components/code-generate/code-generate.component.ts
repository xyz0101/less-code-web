import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { QueryFields } from 'src/app/entity/QueryFields';
import { CodeGenerateService } from 'src/app/service/code-generate/code-generate.service';
import { FileService } from 'src/app/service/system/file/file.service';
import { UserService } from 'src/app/service/system/user/user.service';
import { BaseComponent } from '../BaseComponent';

@Component({
  selector: 'app-code-generate',
  templateUrl: './code-generate.component.html',
  styleUrls: ['./code-generate.component.css']
})
export class CodeGenerateComponent extends BaseComponent implements OnInit {
  
  
  
  public initForm(data: any) {
    this.fb.group({
      tableName: new FormControl({ value: data.tableName, disabled: true }, Validators.required),
      tableSchema: new FormControl({ value: data.tableName, disabled: true }, Validators.required),
      encode: new FormControl({ value: data.tableName, disabled: true }, Validators.required),
      tableCollation: new FormControl({ value: data.tableName, disabled: true }, Validators.required),
      engine: new FormControl({ value: data.tableName, disabled: true }, Validators.required),
      tableComments: new FormControl({ value: data.tableName, disabled: true } ),
    })
  }
  public saveData(data: any) {
    throw new Error('Method not implemented.');
  }
  public getListData(param: any): Observable<any> {
   
    return this.codegenerateService.listDbTables()
  }
  public beforeInitForm(data: any) {
   
  }
  public beforeSubmitForm() {
    throw new Error('Method not implemented.');
  }
  public beforeAddButton() {
     
  }
  public onDeleteData(ids: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  public afterLoadData() {
    this.dataList.forEach(item=>{
      item.expand = false
    })
    console.log('afterLoadData')
  }
  public getSearchFields(): QueryFields {
    return null
  }

  constructor(public codegenerateService: CodeGenerateService,public fb: FormBuilder,
    public msg: NzMessageService,public fileService:FileService,
    public modelService:NzModalService,private request:HttpClient) {
        super(fb,modelService)
   }
  

  ngOnInit(): void {
    this.reload()
  }

}
