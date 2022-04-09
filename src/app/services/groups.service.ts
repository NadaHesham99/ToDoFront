import { Group } from './../models/group';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http:HttpClient) {

  }

  getGroups():Observable<Group[]>{
    return this.http.get<Group[]>('http://localhost:3000/api/v1/ToDoListGroup')
  }
  filterStatus(status:string):Observable<Group[]>{
    return this.http.get<Group[]>(`http://localhost:3000/api/v1/ToDoListGroup?status=${status}`);
  }
  getGroupById(groupId:string):Observable<Group>{
    return this.http.get<Group>(`http://localhost:3000/api/v1/ToDoListGroup/${groupId}`)
  }
  createGroup(group:Group):Observable<Group>{
    return this.http.post<Group>('http://localhost:3000/api/v1/ToDoListGroup/',group);
  }
  deleteGroup(groupId:string):Observable<Object>{
    return this.http.delete<Object>(`http://localhost:3000/api/v1/ToDoListGroup/${groupId}`);
  }
  updateGroup(group:Group):Observable<Group>{
    return this.http.put<Group>(`http://localhost:3000/api/v1/ToDoListGroup/${group._id}`,group);
  }
}
