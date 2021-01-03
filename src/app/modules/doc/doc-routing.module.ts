import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileManageComponent } from './file-manage/file-manage.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  {
    path:'office',component:PreviewComponent,data: {
      customBreadcrumb: '详情'
    }
  },
  {
    path:'filelist',component:FileManageComponent,data: {
      customBreadcrumb: '文件列表'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocRoutingModule { }
