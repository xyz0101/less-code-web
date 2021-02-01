import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
 
    //获取登录二维码
    //https://oauth.u.hep.com.cn/oauth/wxapp/qrcode/5f582dd3683c2e0ae3aaacee?random=Ud6JRGVf86vN&useSelfWxapp=true&enableFetchPhone=false
    // 获取token
    // https://ssxx.univs.cn/cgi-bin/authorize/token/?t=1612152761&uid=5fb278bff18a2c12929f495f&avatar=https:%2F%2Fnode2d-public.hep.com.cn%2Favatar-5fb278bff18a2c12929f495f-1605531839324&activity_id=5f71e934bcdbf3a8c3ba5061
  }

}
