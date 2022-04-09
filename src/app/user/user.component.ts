import { UserRegisterService } from './../services/user-register.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { timer } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form!:FormGroup;
  isSubmitted:boolean=false;
  passError:string='';
  constructor(
    private router:Router,
    private formBuilder:FormBuilder,private userService:UserRegisterService) {
      this._initUserForm();
    }

  ngOnInit(): void {
    this._initUserForm();
  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.form.invalid){return};
    const loginUser:User={
      name:this.form.controls["name"].value,
      email:this.form.controls["email"].value,
      password:this.form.controls["password"].value,
    }
    if(loginUser.password !== this.form.controls["confirm"].value){
      this.passError="Password Not Matched";
      return;
    }
      this.userService.createUser(loginUser).subscribe(user=>{
            this.router.navigateByUrl('/login')
            console.log("Heloooooooooooooooooooooooo")
      });

  }

  private _initUserForm(){
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      confirm:['',Validators.required]
    })
  }

  gotoLogin(){
    this.router.navigateByUrl("/login")
  }
}
