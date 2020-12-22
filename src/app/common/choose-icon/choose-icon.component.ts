import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { ObjectUtils } from 'src/app/util/ObjectUtils';


@Component({
  selector: 'app-choose-icon',
  templateUrl: './choose-icon.component.html',
  styleUrls: ['./choose-icon.component.css']
})
export class ChooseIconComponent implements OnInit {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };




  icons = [


    /**
     * 方向性图标
     */
    {

      name: '方向性图标',
      data: ['step-backward', 'step-forward', 'fast-backward', 'fast-forward', 'shrink', 'arrows-alt', 'down', 'up', 'left', 'right', 'caret-up', 'caret-down', 'caret-left', 'caret-right', 'up-circle', 'down-circle', 'left-circle', 'right-circle', 'up-circle-o', 'down-circle-o', 'right-circle-o', 'left-circle-o', 'double-right', 'double-left', 'vertical-left', 'vertical-right', 'forward', 'backward', 'rollback', 'enter', 'retweet', 'swap', 'swap-left', 'swap-right', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'play-circle', 'play-circle-o', 'up-square', 'down-square', 'left-square', 'right-square', 'up-square-o', 'down-square-o', 'left-square-o', 'right-square-o', 'login', 'logout', 'menu-fold', 'menu-unfold', 'border-bottom', 'border-horizontal', 'border-inner', 'border-left', 'border-right', 'border-top', 'border-verticle', 'pic-center', 'pic-left', 'pic-right', 'radius-bottomleft', 'radius-bottomright', 'radius-upleft', 'radius-upright', 'fullscreen', 'fullscreen-exit']


    },
    /**
    * 指示性图标
    */
    {

      name: '指示性图标',
      data: ['question', 'question-circle', 'plus', 'plus-circle', 'pause', 'pause-circle', 'minus', 'minus-circle', 'plus-square', 'minus-square', 'info', 'info-circle', 'exclamation', 'exclamation-circle', 'close', 'close-circle', 'close-square', 'check', 'check-circle', 'check-square', 'clock-circle', 'warning', 'issues-close', 'stop']


    },
    /**
     * 编辑类图标
     */
    {

      name: '编辑类图标',
      data: ['edit', 'form', 'copy', 'scissor', 'delete', 'snippets', 'diff', 'highlight', 'align-center', 'align-left', 'align-right', 'bg-colors', 'bold', 'italic', 'underline', 'strikethrough', 'redo', 'undo', 'zoom-in', 'zoom-out', 'font-colors', 'font-size', 'line-height', 'dash', 'small-dash', 'sort-ascending', 'sort-descending', 'drag', 'ordered-list', 'radius-setting']


    },
    /**
     * 数据类图标
     */
    {

      name: '数据类图标',
      data: ['area-chart', 'pie-chart', 'bar-chart', 'dot-chart', 'line-chart', 'radar-chart', 'heat-map', 'fall', 'rise', 'stock', 'box-plot', 'fund', 'sliders']


    },
    /**
     * 网站通用图标
     */
    {

      name: '网站通用图标',
      data: ['lock', 'unlock', 'bars', 'book', 'calendar', 'cloud', 'cloud-download', 'code', 'copy', 'credit-card', 'delete', 'desktop', 'download', 'ellipsis', 'file', 'file-text', 'file-unknown', 'file-pdf', 'file-word', 'file-excel', 'file-jpg', 'file-ppt', 'file-markdown', 'file-add', 'folder', 'folder-open', 'folder-add', 'hdd', 'frown', 'meh', 'smile', 'inbox', 'laptop', 'appstore', 'link', 'mail', 'mobile', 'notification', 'paper-clip', 'picture', 'poweroff', 'reload', 'search', 'setting', 'share-alt', 'shopping-cart', 'tablet', 'tag', 'tags', 'to-top', 'upload', 'user', 'video-camera', 'home', 'loading', 'loading-3-quarters', 'cloud-upload', 'star', 'heart', 'environment', 'eye', 'camera', 'save', 'team', 'solution', 'phone', 'filter', 'exception', 'export', 'customer-service', 'qrcode', 'scan', 'like', 'dislike', 'message', 'pay-circle', 'calculator', 'pushpin', 'bulb', 'select', 'switcher', 'rocket', 'bell', 'disconnect', 'database', 'compass', 'barcode', 'hourglass', 'key', 'flag', 'layout', 'printer', 'sound', 'usb', 'skin', 'tool', 'sync', 'wifi', 'car', 'schedule', 'user-add', 'user-delete', 'usergroup-add', 'usergroup-delete', 'man', 'woman', 'shop', 'gift', 'idcard', 'medicine-box', 'red-envelope', 'coffee', 'copyright', 'trademark', 'safety', 'wallet', 'bank', 'trophy', 'contacts', 'global', 'shake', 'api', 'fork', 'dashboard', 'table', 'profile', 'alert', 'audit', 'branches', 'build', 'border', 'crown', 'experiment', 'fire', 'money-collect', 'property-safety', 'read', 'reconciliation', 'rest', 'security-scan', 'insurance', 'safety-certificate', 'project', 'thunderbolt', 'block', 'cluster', 'deployment-unit', 'dollar', 'euro', 'pound', 'file-done', 'file-exclamation', 'file-protect', 'file-search', 'file-sync', 'gateway', 'gold', 'robot', 'shopping']


    },

    /**
     * 品牌和标识
     */
    {

      name: '品牌和标识',
      data: ['android', 'apple', 'windows', 'ie', 'chrome', 'github', 'aliwangwang', 'dingding', 'weibo-square', 'weibo-circle', 'taobao-circle', 'html5', 'weibo', 'twitter', 'wechat', 'youtube', 'alipay-circle', 'taobao', 'skype', 'qq', 'medium-workmark', 'gitlab', 'medium', 'linkedin', 'google-plus', 'dropbox', 'facebook', 'codepen', 'amazon', 'google', 'codepen-circle', 'alipay', 'ant-design', 'aliyun', 'zhihu', 'slack', 'slack-square', 'behance', 'behance-square', 'dribbble', 'dribbble-square', 'instagram', 'yuque', 'alibaba', 'yahoo']


    },
  ]

  constructor(private iconService: NzIconService) { }

  ngOnInit(): void {

  }


  @Input()
  defaultSelectIcon = 'apple'


  @Output("onConfirm")
  onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @Output("onCancel")
  onCancel: EventEmitter<any> = new EventEmitter<any>();

  searchValue = null;

  chooseData = null;
  loading = false;
  isChooseVisible = false;

  showModal(): void {
    this.isChooseVisible = true;

  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.defaultSelectIcon=this.chooseData
    this.onConfirm.emit(this.chooseData);
    this.isChooseVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.onCancel.emit()
    this.chooseData = null
    this.isChooseVisible = false;
  }

  showIconChoose() {


    this.isChooseVisible = true

  }

  getChooseStyle(data) {

    if (this.chooseData == data) {
      return "background-color: #1890ff;"
    } else {
      if (!ObjectUtils.isNotEmpty(this.chooseData) && this.defaultSelectIcon == data) {
        return "background-color: #1890ff;"
      } else {
        return '';
      }
    }
  }
  onChooseIcon(data) {

    console.log('选择icon ', data)
    this.chooseData = data;
  }

}