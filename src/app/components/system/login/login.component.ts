import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  async submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm)
    this.loginService.login(this.validateForm.value) 

  }

  constructor(private fb: FormBuilder,private loginService:LoginService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userCode: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
