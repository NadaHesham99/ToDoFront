import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(data:any){
    localStorage.setItem(TOKEN,data);
  }
  getToken():any{
    return localStorage.getItem(TOKEN)
  }
  removeToken(){
    localStorage.removeItem(TOKEN)
  }
  setId(data:any){
    localStorage.setItem('userId',data);
  }
  getId(){
    return localStorage.getItem('userId');
  }
  removeId(){
    localStorage.removeItem('userId');
  }
}
