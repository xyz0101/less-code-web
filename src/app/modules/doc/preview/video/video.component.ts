import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task/task.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit,OnDestroy {

  constructor( private taskService:TaskService ) { }
  ngOnDestroy(): void {
    this.taskService.addTask(false,'showSub')
  }

  ngOnInit(): void {
    this.taskService.addTask(true,'showSub')


  }

}
