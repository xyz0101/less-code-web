import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
   
     
   private   taskMap = new Map();
  
 
 
 
 
   
   addTask(msg:any,code:string) {
    let task = this.taskMap.get(code);
     if(task==null){
      task = new Subject<any>();
     }
     task.next(msg);
     this.taskMap.set(code,task);
   }
 
   getTask(code):Observable<any>{
     let task = this.taskMap.get(code);
     let task$ =  task.asObservable();
     return task$;
   }
}
