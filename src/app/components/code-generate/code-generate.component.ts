import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, PatternValidator, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { QueryFields } from 'src/app/entity/QueryFields';
import { CodeGenerateService } from 'src/app/service/code-generate/code-generate.service';
import { FileService } from 'src/app/service/system/file/file.service';
import { UserService } from 'src/app/service/system/user/user.service';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { BaseComponent } from '../BaseComponent';

@Component({
  selector: 'app-code-generate',
  templateUrl: './code-generate.component.html',
  styleUrls: ['./code-generate.component.css']
})
export class CodeGenerateComponent extends BaseComponent implements OnInit {
  static TABLE_COL_NAME_PATTERN="^(?!_)[a-zA-Z0-9_]+(?<!_)$"
   
  /**
   * 表字段类型的信息
   *  "DATE": {
            "sqlType": "DATE",
            "javaType": "java.util.Date",
            "defaultLength": null,
            "needDecimalLength": null,
            "needIncrement": false,
            "needEnCode": false
        },
   */
  typeInfoMap =new Map();

  typeInfos = []
  /**
   * 字段的排序信息
   * "cp1257": [
            "cp1257_bin",
            "cp1257_general_ci",
            "cp1257_lithuanian_ci"
        ],
   */
  collationInfoMap = new Map()

  encodeList = []
  /**
   * -->
   * @param data 
   */
  initDialogEditForm(data: any) {

    this.validateForm= this.fb.group({
      projectModule: new FormControl({ value: null, disabled: false }),
      basePackageName: new FormControl({ value: "com.jenkin", disabled: false },
        [Validators.required 
           ] ),
      packageName: new FormControl({ value:"com.jenkin."
      , disabled: true }, Validators.required),
      entityPackageName: new FormControl({ value: 'com.jenkin.common.entity', disabled: false }, Validators.required),
      author: new FormControl({ value: "jenkin", disabled: false }, Validators.required),
      className: new FormControl({ value: null, disabled: false }, Validators.required),
      classNameLower: new FormControl({ value: null, disabled: false } ),
      moduleName: new FormControl({ value: null, disabled: false } ),
      tableInfo: new FormControl({ value:data, disabled: false } ),

    })
  }

  changePackageName(){
    let val = this.validateForm.get("basePackageName").value+'.'+ 
    this.validateForm.get('projectModule').value
    this.validateForm.get('packageName').setValue(val)  
    
  }

  beforeDialogAddButton(){

  }

  async initFormEditForm(data: any) {
    this.validateForm= this.fb.group({
      id: new FormControl({ value: data.id, disabled: false }),
      tableName: new FormControl({ value: data.tableName, disabled: false },
        [Validators.required,Validators.pattern(CodeGenerateComponent.TABLE_COL_NAME_PATTERN),
           ] ),
      tableSchema: new FormControl({ value: data.tableSchema, disabled: false }, Validators.required),
      encode: new FormControl({ value: data.encode, disabled: false }, Validators.required),
      tableCollation: new FormControl({ value: data.tableCollation, disabled: false }, Validators.required),
      engine: new FormControl({ value: data.engine, disabled: false }, Validators.required),
      tableComments: new FormControl({ value: data.tableComments, disabled: false } ),
      columns: new FormControl({ value:this.editTable, disabled: false } ),

    })
    //初始化表字段类型信息
    this.initTypeInfoMap();
    //初始化字符集和排序
    let table = await this.initCollationInfoMap(data);
    this.editTable = table;
  }
  initTypeInfoMap() {
   this.codegenerateService.getTypeInfoMap().subscribe(item=>{
      if(item.code=='200'){
        console.log("类型信息", Object.keys(item.data))
        this.typeInfoMap = item.data;
        this.typeInfos = Object.keys(item.data)
        
         
      }
   })
  }
  initCollationInfoMap(data):Promise<any> {
    return new Promise((resolve=>{
      this.codegenerateService.getCollationInfoMap().subscribe(item=>{
        if(item.code=='200'){
          this.collationInfoMap = item.data;
          this.encodeList=Object.keys(item.data);
           //初始化MySQLType字段
        if(ObjectUtils.isNotEmpty( data.columns)){
          this.editTable=data.columns
          this.editTable.forEach(item=>{
            let t = this.typeInfoMap[item.type];
            item.mysqlType= ObjectUtils.isNotEmpty(t)?t:{};
          })
  
        }
        }
        resolve(this.editTable)
     })
    }))
   
    
  }
  public saveFormData(data: any):Observable<any> {
    this.editTable.forEach(item=>item.id=null)
    this.validateForm.value.columns = this.editTable;
     return this.codegenerateService.saveTableInfo(data)
  }
  public getListData(param: any): Observable<any> {
   
    return this.codegenerateService.listDbTables()
  }
   
  public beforeFormSubmit() {
    console.log(this.validateForm.status)
    if(this.validateForm.status=='INVALID'){
      throw new Error('表单验证不通过');
    }
  }
  public beforeFormAddButton() {
     this.editTable=[]
  }
  public onDeleteData(ids: any): Observable<any> {
     return this.codegenerateService.deleteByIds(ids) 
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

 
 





 /**
     * 表格新增一行
     */
    addTableRow(){
      let id = new Date().getTime()
      this.editTable = [
          ...this.editTable,
          {id:id ,mysqlType:{}}
      ]
      
      
  }




  /**
   * 输入列名称时候的变化
   * @param row 
   */
  onInputTableName(table,row){
    // table = table.filter(item=>item.id!=null)
    //获取驼峰名称
    let name =row.name;
    let reg =new RegExp(CodeGenerateComponent.TABLE_COL_NAME_PATTERN)
    if(reg.test(name)){
       this.codegenerateService.getCamelName(name).subscribe(item=>{
        if(item.code=='200'){
          row.javaColName = item.data      
        }
      })
    }else{
      row.name=null
      row.javaColName =null
    }
   

  }
 
  /**
   * 当选择类型时候的回调
   * @param row 当前行 
   */
  onSelectType(table,row){
    row.mysqlType = this.typeInfoMap[row.type]
    row.javaType = this.typeInfoMap[row.type].javaType
    //切换类型的时候要清空参数
    if(!row.mysqlType.needIncrement){
      row.autoIncFlag=false
    }
    if(!row.mysqlType.needEnCode){
      row.encode=null
      row.sort = null
    }
    if(row.mysqlType.needDecimalLength==null){
      row.decimalLength=null
    }
    if(!ObjectUtils.isNotEmpty(row.mysqlType.defaultLength)){
      row.defaultLength=null
    }

  }

  onSelectSort(table,row){

  }
  /**
   * 当选择当前行是否是ID的时候的回调
   * @param row 
   */
  onChangeIdFlag(table,row){
   console.log('当前值：',row.idFlag)
    if(row.idFlag){
      row.nullFlag = false;
    }
    let index = 0;
    for ( index = 0; index < table.length; index++) {
      const element = table[index];
      if(row.id!=element.id){ 
        element.autoIncFlag=false
        element.idFlag=false
      }
    }
     
    
  }


  createTable(data){
    let param = [];
    param.push(data)
      this.codegenerateService.createTable(param).subscribe(item=>{
        if(item.code=='200'){
          RequestUtil.notifySuccess("创建成功")
        }
        this.reload()
      })

  }

  generateCode(data){
    let param = [];
    param.push(data)
    this.codegenerateService.generateCode(param)
  }


  beforeDialogSubmit(){

  }

  saveDialogData(data):Observable<any>{
    console.log("生成代码的数据",data)
    let arr = [];
    arr.push(data)
   return  this.codegenerateService.generateCode(arr)
  }

}
