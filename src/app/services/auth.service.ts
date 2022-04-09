import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.apiUrl+'User';
  constructor(private httpClient:HttpClient ,
              private token:LocalStorageService,
              private router:Router) { }

  login(email:string , password:string):Observable<User>{
    return this.httpClient.post<User>(`${this.apiURL}/login`,{email:email ,password:password});
  }
  logout(){
    this.token.removeToken();
    this.token.removeId();
    this.router.navigateByUrl('/login');
  }
}
