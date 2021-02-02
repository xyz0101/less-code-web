import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SomeToolRoutingModule } from './some-tool-routing.module';
import { HistoryComponent } from './history/history.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [HistoryComponent, TaskListComponent],
  imports: [
    CommonModule,
    NzGridModule,
    FormsModule,
    SomeToolRoutingModule,
    NzDescriptionsModule,
    NzFormModule,
    NzSpaceModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    ReactiveFormsModule
  ]
})
export class SomeToolModule { }
