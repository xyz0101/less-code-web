import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoveTypewritingComponent } from './love-typewriting/love-typewriting.component';

const routes: Routes = [
  {
    path:'love',component:LoveTypewritingComponent,data: {
      customBreadcrumb: '表白页面'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SomeToolRoutingModule { }
