import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { PreviewComponent } from './preview/preview.component';
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


@NgModule({
  declarations: [PreviewComponent, FileManageComponent],
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
  ]
})
export class DocModule { }
