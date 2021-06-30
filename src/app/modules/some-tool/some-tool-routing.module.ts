import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/AuthGuard';
import { HistoryComponent } from './history/history.component';
import { ImageFeaturesComponent } from './image-features/image-features.component';
import { LoveTypewritingComponent } from './love-typewriting/love-typewriting.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  {

    path: 'co-edit', component: LoveTypewritingComponent, data: {
      customBreadcrumb: '协作编辑'
    }, canActivate: [AuthGuard]
  } 
  ,  {

    path: 'picDeal', component: ImageFeaturesComponent, data: {
      customBreadcrumb: '图像处理'
    }, canActivate: [AuthGuard]
  } 
  , 
  {

    path: 'history', component: HistoryComponent, data: {
      customBreadcrumb: '四史刷题'
    }, canActivate: [AuthGuard]
  }
  , {

    path: 'taskList', component: TaskListComponent, data: {
      customBreadcrumb: '任务列表'
    }, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SomeToolRoutingModule { }
