import { LocalStorageService } from './../services/local-storage.service';
import { Group } from './../models/group';
import { ToDo } from './../models/todo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { GroupsService } from '../services/groups.service';
import { TodosService } from '../services/todos.service';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  groups: Group[] = [];
  todos: ToDo[] = [];
  arr= new Array();
  arrnew=new Array();
  arrdelete=new Array();

  constructor(private groupServices: GroupsService,
    private todoService: TodosService,
    private location: Location,
    private localStorage:LocalStorageService,
    private router:Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.groupServices.getGroups().subscribe((group) => {
      group.forEach(element => {
        if(element.user==this.localStorage.getId()){
          this.arrnew.push(element);
        }
      });
      this.groups = this.arrnew;
    });

    this.todoService.getLists().subscribe((todo) => {
      todo.forEach(element => {
        if(element.groupName==null){
          this.todoService.deleteList(element._id).subscribe(response => {
            this.todoService.getLists().subscribe((lists) => {
              this.todos = lists;
            });
          });
        }
        else{
          this.arr.push(element);
        }
      });
      this.todos = this.arr;
    });
  }

  deleteGroup(id: string) {
    var result = confirm("Do You Want to delete this Item");
    if (result == true) {
      this.groupServices.deleteGroup(id).subscribe(response => {
        this.groupServices.getGroups().subscribe((cats) => {
          this.arrnew=[];
        cats.forEach(item => {
             if(item.user==this.localStorage.getId()){
               this.arrnew.push(item);
            }
          });
          this.groups = this.arrnew;
        });
      });
    }
  }

  updateGroup(id:string){
    this.router.navigateByUrl(`Groupform/${id}`)
  }

  deleteToDo(id:string){
    var result = confirm("Do You Want to delete this Item");
    if (result == true) {

      this.todoService.deleteList(id).subscribe(response => {
        this.todoService.getLists().subscribe((lists) => {
          this.todos = lists;
        });
      });
    }
  }
  updateToDo(id:string){
    this.router.navigateByUrl(`ToDoform/${id}`)
  }

  logoutUser(){
    this.authService.logout();
  }

  filter(event:any){
    console.log(event.target.value);
    if(event.target.value ==0){
      this.groupServices.filterStatus("done").subscribe((filter)=>{
          this.arrnew=[];
           filter.forEach(item => {
             if(item.user==this.localStorage.getId()){
               this.arrnew.push(item);
            }
          });
          this.groups = this.arrnew;
      })
    }
    else if(event.target.value ==1){
      this.groupServices.filterStatus("pending").subscribe((filter)=>{
          this.arrnew=[];
           filter.forEach(item => {
             if(item.user==this.localStorage.getId()){
               this.arrnew.push(item);
            }
          });
          this.groups = this.arrnew;
      })
    }
  }
}
