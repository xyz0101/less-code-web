import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoryApiPath } from 'src/app/api_path/system/HistoryApiPath';
import { TaskListApiPath } from 'src/app/api_path/system/TaskListApiPath';
import { BaseComponent } from 'src/app/components/BaseComponent';
import { QueryFields } from 'src/app/entity/QueryFields';
import { TaskService } from 'src/app/service/task/task.service';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent extends BaseComponent implements OnInit {

  statusMap= new Map()


  public getListData(param: any): Observable<any> {
     return this.http.postResquest(TaskListApiPath.TASK_LIST_PATH,param).pipe(map(item=>{
        item.data.records.forEach(element => {
          element.taskStatus=this.statusMap.get(element.taskStatus)
          element.currentGrade='-'
        }) 
        return item
     }))
  }
  public onDeleteData(ids: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  public afterLoadData() {
    
  }
  public getSearchFields(): QueryFields {
    return null;
  }
  constructor(public fb: FormBuilder,
              public msg: NzMessageService ,
              private http:RequestUtil,
              private message:TaskService,
              public modelService: NzModalService) {
     super(fb, modelService)
    }
 
  ngOnInit(): void {
    this.statusMap.set(1,'等待中')
    this.statusMap.set(2,'进行中')
    this.statusMap.set(6,'已完成且成功')
    this.statusMap.set(7,'已完成但失败')
    this.statusMap.set(8,'停止')
    console.log(localStorage.getItem('userInfo'))
    this.message.getTask('TASK-SSXX-GRADE').subscribe(item=>{
      
      let msg = item.triggerMsg
      console.log('TASK-SSXX-GRADE    ',msg)
      if(msg!=null){
        let val = JSON.parse(msg)
        let taskCode =val.taskCode
       
        let grade = val.grade
        console.log('TASK-SSXX-GRADE  OK   ',taskCode,grade)
        this.dataList.forEach(element=>{
          if(taskCode == element.taskCode){ 
            element.currentGrade=grade
          }else{
            element.currentGrade='-'
          }
        })
      }
    })
    this.message.getTask('TASK-STATUS').subscribe(item=>{
      
       let msg = item.triggerMsg
       console.log('TASK-STATUS    ',msg)
       if(msg!=null){
        let val = JSON.parse(msg)
        let taskCode =JSON.parse(val.taskCodes)[0]
        let statusIntCode = val.statusIntCode
        console.log('TASK-STATUS OK  ',taskCode,val)
        this.dataList.forEach(element=>{
          if(taskCode == element.taskCode){ 
            element.taskStatus=this.statusMap.get(statusIntCode)
           }
        })
       }
    })

  }


  stop(){
    this.http.getResquest(HistoryApiPath.STOP_TASK_PATH).subscribe(item=>{
      if(item.code=='200'){
          RequestUtil.notifySuccess('操作成功')
      }
    })
  }


}
