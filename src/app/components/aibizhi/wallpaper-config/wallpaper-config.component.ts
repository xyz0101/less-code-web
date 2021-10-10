import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { QueryFields } from 'src/app/entity/QueryFields';
import { AibizhiService, Category, Startegy, WallpaperConfigVO } from 'src/app/service/files/aibizhi/aibizhi.service';
import { CommonUtils } from 'src/app/util/CommonUtils';
import { BaseComponent } from '../../BaseComponent';

@Component({
  selector: 'app-wallpaper-config',
  templateUrl: './wallpaper-config.component.html',
  styleUrls: ['./wallpaper-config.component.css']
})
export class WallpaperConfigComponent extends BaseComponent implements OnInit  {
  public getListData(param: any): Observable<any> {
    return null
  }
  public onDeleteData(ids: any): Observable<any> {
    return null
  }
  public afterLoadData() {
    
  }
  public getSearchFields(): QueryFields {
    return null
  }
   /**
     * form 类型 表单提交前操作
     */
    beforeFormSubmit() {
      this.loading = true;
  }
  afterSubmitForm(data) {
    this.loading = false;
    this.loadForm()
}
  timeUnitList=[
    {key:0,label:"秒"},
    {key:1,label:"分钟"},
    {key:2,label:"小时"},
    {key:3,label:"天"}
  ]
  loading = false;
  categoryList : Category[]
  strategyList : Startegy[]
  constructor(public fb: FormBuilder,
              public msg: NzMessageService ,
              public aibizhiService: AibizhiService,
              public modelService: NzModalService) {
     super(fb, modelService)
    }
    
  ngOnInit(): void {
    this.aibizhiService.getCategory().subscribe(item=>{
      if(item.code=="200"){
          this.categoryList = item.data
      }
    })
    this.aibizhiService.getWallpaperStrategy().subscribe(item=>{
      if(item.code=="200"){
          this.strategyList = item.data
      }
    })
     
    this.loadForm()
  }
  loadForm() {
    this.aibizhiService.getWallpaperConfig().subscribe(item=>{
      if(item.code=="200"){
        this.editData(item.data,"form")
      }
    })
  }
  
  initFormEditForm(data : any){
    console.log("初始化表单")
    this.validateForm = this.fb.group({
      
          on: new FormControl({ value: data.on, disabled: false } ),
          strategyCode:  new FormControl({ value: data.data.strategyCode, disabled: false } ),
          categories: new FormControl({ value: data.data.categories, disabled: false } ),
          timeGap: new FormControl({ value: data.data.timeGap, disabled: false } ),
          timeUnit: new FormControl({ value: data.data.timeUnit, disabled: false } ),
         
 
        }
        )

  }

  
  saveFormData(data: any)  :Observable<any>{
    var configVo = new WallpaperConfigVO()
    var strategy = new Startegy()
    strategy.onFlag = data.on;
    strategy.strategyCode = data.strategyCode
    strategy.timeGap = data.timeGap
    strategy.categories = data.categories
    strategy.timeUnit = data.timeUnit
    configVo.on = data.on
    configVo.data = strategy;
    console.log(data)
    return this.aibizhiService.saveWallpaperConfig(configVo)
   
  }

}
