import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/components/BaseComponent';
import { QueryFields } from 'src/app/entity/QueryFields';
import { LscFileService } from 'src/app/service/files/file/LscFile.service';
import { TaskService } from 'src/app/service/task/task.service';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { RouteUtils } from 'src/app/util/RouteUtils';
import { FileTypeConst } from '../const/FileTypeConst';
import { FileTypeUtils } from '../util/FileTypeUtils';

@Component({
  selector: 'app-file-manage',
  templateUrl: './file-manage.component.html',
  styleUrls: ['./file-manage.component.css']
})
export class FileManageComponent extends BaseComponent implements OnInit {


  showSub = false;








  public getListData(param: any): Observable<any> {
   return this.fileService.listByPage(param)
  }
  public onDeleteData(ids: any): Observable<any> {
    return this.fileService.deleteInfo(ids);
  }
  public afterLoadData() {
   
  }
  public getSearchFields(): QueryFields {
    return null;
  }
beforeDrawerSubmit(){
  this.validataFormAndTrowError()
}

  saveDrawerData(data){
    return this.fileService.save(data)
  }

  constructor(public fb: FormBuilder,
              private taskService:TaskService,
              public msg: NzMessageService ,
              private router:RouteUtils,
              private request: HttpClient,
              private fileService:LscFileService,
              public modelService: NzModalService) {
     super(fb, modelService)
    }

  ngOnInit(): void {
    this.taskService.addTask(false,'showSub')
    FileTypeUtils.initType()
    this.taskService.getTask('showSub').subscribe(item=>{
      this.showSub = item
      console.log('父组件收到消息',item)
    })
  }

  beforeAddButton(){

  }
 
initDrawerEditForm(data){
  
  this.validateForm = this.fb.group({
        id: new FormControl({ value: data.id, disabled: false } ),
        fileCode: new FormControl({ value: data.fileCode, disabled: false } ),
        fileName: new FormControl({ value: data.fileName, disabled: false } ),
        fileType: new FormControl({ value: data.fileType, disabled: false } ),
        fileCategories: new FormControl({ value: data.fileCategories, disabled: false } ),
        fileSize: new FormControl({ value: data.fileSize, disabled: false } ),
       
   
      }
      )

}


 
  fileType;
  fileName;
  fileSize;
  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.fileList = [file]
      let uploadedFileCode = file.response.data
      this.validateForm.get('fileCode').setValue(uploadedFileCode)
      this.validateForm.get('fileType').setValue(this.fileType)
      this.validateForm.get('fileName').setValue(this.fileName)
      this.validateForm.get('fileSize').setValue(this.fileSize)
      this.msg.success(`${file.name} 上传成功`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} 上传失败`);
    }
  }
  fileList = []
  customUpload = async (item) => {


    this.fileType = item.file.type
    this.fileName = item.file.name
    this.fileSize = item.file.size 
    console.log(item.file)
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();

    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', item.action!, formData, {
      headers: new HttpHeaders({ "token": localStorage.getItem("token") }),
      reportProgress: true,
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.request.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        // console.log('文件上传响应' ,event)
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // 处理上传进度条，必须指定 `percent` 属性来表示进度
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // 处理成功
          // console.log('文件上传响应' ,event)
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        // 处理失败
        item.onError!(err, item.file!);
      }
    );
  };


  preview(data){

   let type =  FileTypeUtils.getFileTypeByName(data.fileName);
    console.log('文件类型：',data.fileName,type)
    switch(type){
      case FileTypeConst.OFFICE_TYPE:
        this.taskService.addTask(true,'showSub')
        this.router.route("/nav/doc/filelist/office",{code:data.fileCode,name:data.fileName })
        break;
      case FileTypeConst.VEDIO_TYPE:
        this.taskService.addTask(true,'showSub')
        this.router.route("/nav/doc/filelist/video",{code:data.fileCode,name:data.fileName })
        break;

      default:
        RequestUtil.notifyError("目前暂不支持该格式！")
        break;

    }

    
     
    
  }

}
