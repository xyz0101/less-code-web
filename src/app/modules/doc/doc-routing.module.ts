import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/AuthGuard';
import { FileManageComponent } from './file-manage/file-manage.component';
import { PreviewComponent } from './preview/office/preview.component';
import { VideoComponent } from './preview/video/video.component';

const routes: Routes = [

  {

    path: 'filelist', component: FileManageComponent, data: {
      customBreadcrumb: '文件列表'
    }, children: [
      {
        path: 'office', component: PreviewComponent, data: {
          customBreadcrumb: '文档详情'
        }//路由守卫，登陆检测
    , canActivate: [AuthGuard],
      },
      {
        path: 'video', component: VideoComponent, data: {
          customBreadcrumb: '视频详情'
        }//路由守卫，登陆检测
    , canActivate: [AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocRoutingModule { }
