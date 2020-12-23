import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuApiPath } from 'src/app/api_path/system/MenuApiPath';
import { MenuUtils } from 'src/app/util/MenuUtils';
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

  @Input()
  isMultiple
   @Input()
  showButton
 
  currentSelectedKeys = []

  currentExpandedKeys=[]

 /**
   * 默认选中的ID
   */
  @Input()
  defaultSelectId 

   /**
   * 默认选中的ID
   */
  @Input()
  defaultSelectIds: any[]

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
   'menuType':'menuType' , 
  }


  ngOnInit(): void {
   
  }
  loadData() {
    this.loading =true;
    this.http.getResquest(MenuApiPath.MENU_TREE_PATH).subscribe(item=>{
      this.menus = this.mappingData(item.data);
      this.loading =false;
      if(this.defaultSelectIds&&this.isMultiple){ 
        console.log('定位多选',this.defaultSelectIds)
        this.defaultSelectIds.forEach(item=>{
          this.locationData(item)
       })
      }
      if(this.defaultSelectId){
        console.log('定位单选',this.defaultSelectId)
        this.locationData(this.defaultSelectId)
      }
    })
  }
  locationData(id) {
    if(!ObjectUtils.isNotEmpty(id)){
      return 
    }
    
    let data = this.menuMap.get(id)
    if(!data){
      return
    }
   
    this.currentSelectedKeys = [...this.currentSelectedKeys, id]
    this.explanData(data.parent)
     
  }
  explanData(key: any) {
     if(ObjectUtils.isNotEmpty(key)&&key!=-1){
      this.currentExpandedKeys=[...this.currentExpandedKeys,key]
       this.explanData(this.menuMap.get(key).parent)
     }
  }
  mappingData(data: any[]): any[] {
    let arr = [];
    data=MenuUtils.removeNotShowItem(data,this.showButton)
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
     val['children']=null;
     val['isLeaf']=true
     let children=data[this.fieldMapping['children']];
     children=MenuUtils.removeNotShowItem(children,this.showButton)
     if(ObjectUtils.isNotEmpty(children)&&children.length>0){
      val['isLeaf']=false
      val['children']=[];
      data[this.fieldMapping['children']].forEach(item => {
        this.mapping(item,val['children']);
      });
     }


  }
  
  showModal(): void {
    this.isMenuChooseVisible = true;
  
  }

  handleOk(): void {
    console.log('Button ok clicked!',this.currentSelectedKeys );
    if(!this.isMultiple){
      this.defaultSelectId=this.chooseData.key
    }else{
      this.defaultSelectIds=[...this.currentSelectedKeys]
    }
   
  
    this.onConfirm.emit(this.chooseData);
    this.isMenuChooseVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.onCancel.emit()
    this.isMenuChooseVisible = false;
    if(!this.isMultiple){
      this.currentSelectedKeys= [this.defaultSelectId]
    }else{
      this.currentSelectedKeys= this.defaultSelectIds
    }
  }

  showMenuChoose(){
     this.loadData();
      this.isMenuChooseVisible=true
      
  }
  onChooseMenu(data){
    console.log('choose menu',data )
    if(this.isMultiple){
      this.chooseData =  []
  
      data.keys.forEach(item=>{
        this.chooseData.push(this.menuMap.get(item))
      })
     
       
    }else{
          this.chooseData=data;

    }
  }
}
