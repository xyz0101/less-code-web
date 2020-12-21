import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuApiPath } from 'src/app/api_path/system/MenuApiPath';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Component({
  selector: 'app-choose-menu',
  templateUrl: './choose-menu.component.html',
  styleUrls: ['./choose-menu.component.css']
})
export class ChooseMenuComponent implements OnInit {

  constructor(private http:RequestUtil) { }



  @Output("onConfirm") 
  onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output("onCancel") 
  onCancel: EventEmitter<any> = new EventEmitter<any>();

  searchValue=null;
  menus=[]
  chooseData=null;
  loading = false;
  isMenuChooseVisible = false;
  menuMap = new Map()
  defaultSelectedKeys = []
  defaultExpandedKeys=[]

  /**
   * 默认定位到的ID
   * TODO 
   * 需要暴露
   */
  defaultSelectId 

  /**
   * 映射关系，k，v 左边为控件的字段，右边为接口返回的字段
   * 暂时不暴露，如果要通用可以暴露
   */
  fieldMapping={
    'parent':'parent',
   'title':'name' , 
   'key':'id' , 
   'expanded':'expanded' , 
   'children':'subList' , 
  }


  ngOnInit(): void {
   
  }
  loadData() {
    this.loading =true;
    this.http.getResquest(MenuApiPath.MENU_TREE_PATH).subscribe(item=>{
      this.menus = this.mappingData(item.data);
      this.loading =false;
      this.locationData()
    })
  }
  locationData() {
    if(!ObjectUtils.isNotEmpty(this.defaultSelectId)){
      return 
    }
    let data = this.menuMap.get(this.defaultSelectId)
    let selected = [];
    selected.push(data.key);
    this.defaultSelectedKeys = selected
    this.explanData(data.parent)
     
  }
  explanData(key: any) {
     if(ObjectUtils.isNotEmpty(key)&&key!=-1){
      this.defaultExpandedKeys=[...this.defaultExpandedKeys,key]
       this.explanData(this.menuMap.get(key).parent)
     }
  }
  mappingData(data: any): any[] {
    let arr = [];
     data.forEach(element => {
       this.mapping(element,arr);
       
     });
     return arr
  }
  mapping(data: any, arr: any[]) {
    
     let val = {}
     Object.keys(this.fieldMapping).forEach(item=>{
      let d = data[this.fieldMapping[item]]
      val[item]= d;
     })
     this.menuMap.set(val['key'],val);
     arr.push(val)
     val['children']=[];
     val['isLeaf']=true
     let children=data[this.fieldMapping['children']];
     if(ObjectUtils.isNotEmpty(children)&&children.length>0){
      val['isLeaf']=false

      data[this.fieldMapping['children']].forEach(item => {
        this.mapping(item,val['children']);
      });
     }


  }
  showModal(): void {
    this.isMenuChooseVisible = true;
  
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    
    this.onConfirm.emit(this.chooseData);
    this.isMenuChooseVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.onCancel.emit()
    this.isMenuChooseVisible = false;
  }

  showMenuChoose(){
     this.loadData();
      this.isMenuChooseVisible=true
      
  }
  onChooseMenu(data){
    console.log(data)
    this.chooseData=data;
  }
}
