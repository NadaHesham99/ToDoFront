import { LocalStorageService } from './../../services/local-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup!:FormGroup;
  isSubmitted:boolean =false;
  authError = false;
  authMessage = 'Email or Password are wrong';


  constructor( private formBuilder: FormBuilder,
    private auth: AuthService,
    private localStorageServices:LocalStorageService,
    private router: Router) {
      this._initLoginForm();
     }

  ngOnInit(): void {
    this._initLoginForm();
  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.loginFormGroup.invalid){return};
    const loginUser={
      email:this.loginFormGroup.controls["email"].value,
      password:this.loginFormGroup.controls["password"].value,
    }
    this.auth.login(loginUser.email ,loginUser.password).subscribe(user=>
    {
      this.authError=false;
      this.localStorageServices.setToken(user.token);
      this.localStorageServices.setId(user._id);
      this.router.navigateByUrl('/todolist')
    },
    (error:HttpErrorResponse)=>{
      this.authError=true;
      console.log(error);
      if(error.status !==400){
        this.authMessage="Error in Server,Please try again later"
      }
    });

  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  gotoRegister(){
    this.router.navigateByUrl('/');
  }

}




