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
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ImageFeaturesComponent } from './image-features/image-features.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { LoveTypewritingComponent } from './love-typewriting/love-typewriting.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [HistoryComponent, TaskListComponent, ImageFeaturesComponent,LoveTypewritingComponent],
  imports: [
    CommonModule,
    NzGridModule,
    FormsModule,
    SomeToolRoutingModule,
    NzDescriptionsModule,
    NzFormModule,
    NzSpaceModule,
    NzAlertModule,
    NzInputModule,
    NzTableModule,
    NzSpinModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzCardModule,
    MarkdownModule.forChild()
  ]
})
export class SomeToolModule { }
