import { LocalStorageService } from './../../services/local-storage.service';
import { TodosService } from './../../services/todos.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Group } from 'src/app/models/group';
import { ToDo } from 'src/app/models/todo';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  currentGroupId: string = '';
  currentToDoId: string = '';
  group: Group[] = [];
  arrnew = new Array();
  self:any;

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupsService,
    private todosService: TodosService,
    private localStorage:LocalStorageService,
    private location: Location,
    private activiateRoute: ActivatedRoute,
    ) {
    this.form = this.formBuilder.group({
      title: [''],
      groupName: {
        _id: this.currentGroupId,
      },
      dateCreated: Date.now()
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      groupName: {
        _id: this.currentGroupId,
      },
      dateCreated: Date.now()
    });
    this.groupService.getGroups().subscribe((cats) => {
      cats.forEach(item => {
           if(item.user==this.localStorage.getId()){
             this.arrnew.push(item);
          }
        });
        this.group = this.arrnew;
    });

    this.checkEditMode();
  }
  changed(event: any) {
    this.currentGroupId = event.target.value;
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.currentToDoId);
    if (this.currentGroupId == '') {
      return;
    }
    if (this.form.invalid) {
      return;
    }
    const todo: ToDo = {
      _id: this.currentToDoId,
      title: this.form.controls["title"].value,
      status: "pending",
      groupName: {
        _id: this.currentGroupId
      }
    }

    if (this.editMode) {

      this.todosService.updateList(todo).subscribe(response => {
        timer(1000).toPromise().then(() => {
          this.location.back();
        })
      });
    }
    else {
      this.todosService.createList(todo).subscribe(response => {
        timer(1000).toPromise().then(done => {
          this.location.back();
        })
      });
    }
  }

  goBack(){
    timer(200).toPromise().then(()=>{
      this.location.back();
    })
  }
  // onEdit(){

  // }

  private checkEditMode() {
    this.activiateRoute.params.subscribe((response) => {
      if (response["id"]) {
        this.editMode = true;
        this.self = this;
        this.currentToDoId = response["id"];
        this.todosService.getListById(response["id"]).subscribe(todo => {
          this.form.controls["title"].setValue(todo.title);
          this.self.currentGroupId= todo.groupName["_id"];
          console.log(this.self.currentGroupId);
        })
      }
    })
  }
}
