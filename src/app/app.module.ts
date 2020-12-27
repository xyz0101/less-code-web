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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RoleComponent } from './components/system/role/role.component';
import { MenuComponent } from './components/system/menu/menu.component';
import { ChooseMenuComponent } from './common/choose-menu/choose-menu.component';
import { ChooseIconComponent } from './common/choose-icon/choose-icon.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { UsersComponent } from './components/system/users/users.component';
import { NoauthComponent } from './components/system/noauth/noauth.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { DocViewComponent } from './components/doc-view/doc-view.component';



const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const iconsArr: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    NavBarComponent,
    CodeGenerateComponent,
    MenuComponent,
    RoleComponent,
    ChooseMenuComponent,
    ChooseIconComponent,
    NoauthComponent,
    DocViewComponent,
    
  ],
  imports: [
    NzIconModule.forRoot(iconsArr),
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
    NzAvatarModule,
    NzInputNumberModule,
    NzSelectModule,
    NzToolTipModule,
    NzTreeModule,
    NzSpinModule,
    NzIconModule,
    NzTabsModule,
    NzResultModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, RequestUtil, 
    NzNotificationService,AuthGuard,NzMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
