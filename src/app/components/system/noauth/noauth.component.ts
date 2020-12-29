import { Component, OnInit } from '@angular/core';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { RouteUtils } from 'src/app/util/RouteUtils';

@Component({
  selector: 'app-noauth',
  templateUrl: './noauth.component.html',
  styleUrls: ['./noauth.component.css']
})
export class NoauthComponent implements OnInit {

  constructor(private router:RouteUtils) { }

  ngOnInit(): void {
  }

  backHome(){
    this.router.simpleRoute("/")
  }
}
