import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { RequestUtil } from './util/RequestUtil';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersComponent } from './components/system/user/users/users.component';
import { LoginComponent } from './components/system/login/login.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthGuard } from './guard/AuthGuard';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CodeGenerateComponent } from './components/code-generate/code-generate.component';



registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    NavBarComponent,
    CodeGenerateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    BrowserAnimationsModule,
    NzTableModule ,
    NzDrawerModule ,
    NzModalModule,
    NzRadioModule,
    NzUploadModule,
    NzSpaceModule,
    NzCardModule,
    NzAvatarModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, RequestUtil, NzNotificationService,AuthGuard,NzMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
