import { Component, OnInit } from '@angular/core';
import {Base64} from 'js-base64/base64'
import { encode } from 'querystring';
import { get } from 'scriptjs';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { RouteUtils } from 'src/app/util/RouteUtils';
/**
 * 声明JS中的对象，避免编译不通过
 */
declare var DocsAPI:any;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(private router:RouteUtils) { }

  host = "192.168.3.53"
  // host="10.10.10.63"


  ngOnInit(): void {
  
    this.router.getRouteParams().subscribe(item=>{
      get("http://"+this.host+"/web-apps/apps/api/documents/api.js", () => {
        //Google Maps library has been loaded...
        console.log('load api.js 成功')
        // let url = 'http://mall.jenkin.tech:9002/jenkin/%E9%94%80%E5%94%AE01%EF%BC%88%E6%8C%89%E4%BB%BD%EF%BC%89-%E5%8B%BF%E5%8A%A8.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jenkin%2F20210102%2F%2Fs3%2Faws4_request&X-Amz-Date=20210102T132143Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=5cce89a0b8f6369659c8f7cee0f13ffa5362604eebe192b371fd3d8ede78bf80';
        // let name = '销售01（按份-勿动.docx';
        //npm install --save js-base64
        let token  = Base64.encode(localStorage.getItem('token'));
        // let url = "http://mall.jenkin.tech:10013/lsc/system/downloadFile?code="+item.code+"&token="+token
        let url = "http://192.168.3.48:8050/lsc/system/downloadFile?code="+item.code+"&token="+token
        // let url = "http://192.168.3.48:8050/lsc/system/downloadFile?code="+item.code
        console.log("文件下载地址:"+url)
        let name =   item.name;
        if(ObjectUtils.isNotEmpty(name)&&ObjectUtils.isNotEmpty(item.code)){
          let fileCode =  Base64.encode(item.code) 
          this.initEditor(name,url, fileCode ,"edit","desktop")

        }
    });
    })
    


  }
   

  
   initEditor(name,url,docKey, mode, type) {
     let token = localStorage.getItem('token');
    //creating object editing
    let pageH = document.documentElement.clientHeight
    let docType = name.substring(name.lastIndexOf(".") + 1).trim().toLowerCase();
    new DocsAPI.DocEditor("placeholder",

      {

        type: type,

        width: (type == "desktop" ? "100%" : undefined),

        height: (type == "desktop" ? pageH-(pageH*0.2) : undefined),

        documentType: this.getDocumentType(docType),

        document: {

          title: name,

          url: url,

          fileType: docType,

          key: docKey,

          permissions: {

            edit: true

          }

        },

        editorConfig: {

          mode: mode,

        },
        "services": {
          "CoAuthoring": {
              "token": {
                  "inbox": {
                      "inBody": true,
                  },
                  "outbox": {
                      "inBody": true
                  }
              }
          }
      },
        token: token,

      });
   }
   getDocumentType(ext) {

    if (".doc.docx.docm.dot.dotx.dotm.odt.fodt.ott.rtf.txt.html.htm.mht.pdf.djvu.fb2.epub.xps".indexOf(ext) != -1) return "text";

    if (".xls.xlsx.xlsm.xlt.xltx.xltm.ods.fods.ots.csv".indexOf(ext) != -1) return "spreadsheet";

    if (".pps.ppsx.ppsm.ppt.pptx.pptm.pot.potx.potm.odp.fodp.otp".indexOf(ext) != -1) return "presentation";

    return null;

};
}
