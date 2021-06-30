import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { PreviewComponent } from './preview/office/preview.component';
import { FileManageComponent } from './file-manage/file-manage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { VideoComponent } from './preview/video/video.component';
import { Options, WebUploaderConfig, WebUploaderModule } from 'ngx-webuploader';
import { FileApiPath } from 'src/app/api_path/system/FileApiPath';
import { FilesToolsComponent } from './files-tools/files-tools.component';


@NgModule({
  declarations: [PreviewComponent, FileManageComponent, VideoComponent, FilesToolsComponent],
  imports: [
    CommonModule,
    DocRoutingModule,

    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    NzFormModule ,
    NzInputModule ,
    NzButtonModule,
    NzCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzTableModule ,
    NzDrawerModule ,
    NzModalModule,
    NzRadioModule,
    NzUploadModule,
    NzSpaceModule,
    NzCardModule,
    NzAvatarModule,
    NzInputNumberModule,
    NzSelectModule,
    NzToolTipModule,
    NzTreeModule,
    NzSpinModule,
    NzIconModule,
    NzTabsModule,
    NzTagModule,
    NzResultModule,
    NzBreadCrumbModule,
    NzDividerModule,
    NzBackTopModule,
    WebUploaderModule.forRoot(<WebUploaderConfig>{
      // 全局默认Options配置
      options: <Options>{
        auto: true,
        threads :10,
        chunked: true,// 开起分片上传。
        chunkSize :1024*1024/5,
          swf: './assets/webuploader-0.1.5/Uploader.swf',
          server:  FileApiPath.UPLOAD_FILE_PATH
      },
      // webuploader的存储路径
      path: './assets/webuploader-0.1.5/',
      // 依赖库
      dependentLib: './assets/jquery.min.js'
    })
  ]
})
export class DocModule { }
