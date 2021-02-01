import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SomeToolRoutingModule } from './some-tool-routing.module';
import { HistoryComponent } from './history/history.component';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [HistoryComponent, TaskListComponent],
  imports: [
    CommonModule,
    SomeToolRoutingModule
  ]
})
export class SomeToolModule { }
