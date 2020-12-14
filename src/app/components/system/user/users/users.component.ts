import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { SecurityUtils } from 'src/app/util/SecurityUtils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  

  ngOnInit(): void {
  }
  constructor(private userService:UserService) { }
 
}
