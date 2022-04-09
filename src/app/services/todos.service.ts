import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { ToDo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http:HttpClient) {

  }

  getLists():Observable<ToDo[]>{
    return this.http.get<ToDo[]>('http://localhost:3000/api/v1/ToDoList')
  }
  createList(todo:ToDo):Observable<ToDo>{
    return this.http.post<ToDo>('http://localhost:3000/api/v1/ToDoList/',todo);
  }
  getListById(listId:string):Observable<ToDo>{
    return this.http.get<ToDo>(`http://localhost:3000/api/v1/ToDoList/${listId}`)
  }
  deleteList(listId:string):Observable<Object>{
    return this.http.delete<Object>(`http://localhost:3000/api/v1/ToDoList/${listId}`);
  }
  updateList(list:ToDo):Observable<ToDo>{
    return this.http.put<ToDo>(`http://localhost:3000/api/v1/ToDoList/${list._id}`,list);
  }
  

}
