import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task/task.service';
import DPlayer from 'dplayer';
import { RouteUtils } from 'src/app/util/RouteUtils';
import {Base64} from 'js-base64/base64'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit,OnDestroy {

  constructor( private router:RouteUtils,private taskService:TaskService ) { }
  ngOnDestroy(): void {
    this.taskService.addTask(false,'showSub')
  }
  /**
   * npm install dplayer --save

   */


  player :any


  ngOnInit(): void {
    this.taskService.addTask(true,'showSub')
    this.router.getRouteParams().subscribe(item=>{
      if(item.code){
        let option = this.initOption( item)
        this.player = new DPlayer(option);
      }
 
    })

  }
  initOption(param) :any{
    let token  = Base64.encode(localStorage.getItem('token'));
    let url = "/lsc/system/downloadFile?code="+param.code+"&token="+token
    return {
      container: document.getElementById('dplayer'),
      autoplay: false,
      theme: '#FADFA3',
      loop: true,
      lang: 'zh-cn',
      screenshot: true,
      hotkey: true,
      preload: 'auto',
      // logo: 'logo.png',
      volume: 0.7,
      mutex: true,
      video: {
          url: url,
          pic: '',
          thumbnails: '',
          type: 'auto',
      },
      // subtitle: {
      //     url: 'dplayer.vtt',
      //     type: 'webvtt',
      //     fontSize: '25px',
      //     bottom: '10%',
      //     color: '#b7daff',
      // },
      // danmaku: {
      //     id: '9E2E3368B56CDBB4',
      //     api: 'https://api.prprpr.me/dplayer/',
      //     token: 'tokendemo',
      //     maximum: 1000,
      //     addition: ['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'],
      //     user: 'DIYgod',
      //     bottom: '15%',
      //     unlimited: true,
      // },
      // contextmenu: [
      //     {
      //         text: 'custom1',
      //         link: 'https://github.com/DIYgod/DPlayer',
      //     },
      //     {
      //         text: 'custom2',
      //         click: (player) => {
      //             console.log(player);
      //         },
      //     },
      // ],
      // highlight: [
      //     {
      //         time: 20,
      //         text: '这是第 20 秒',
      //     },
      //     {
      //         time: 120,
      //         text: '这是 2 分钟',
      //     },
      // ],
  }
  }

}
