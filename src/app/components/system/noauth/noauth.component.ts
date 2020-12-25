import { Component, OnInit } from '@angular/core';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Component({
  selector: 'app-noauth',
  templateUrl: './noauth.component.html',
  styleUrls: ['./noauth.component.css']
})
export class NoauthComponent implements OnInit {

  constructor(private http:RequestUtil) { }

  ngOnInit(): void {
  }

  backHome(){
    this.http.simpleRoute("/")
  }
}
