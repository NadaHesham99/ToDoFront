import { LoginComponent } from './user/login/login.component';
import { TodoFormComponent } from './todo-list/todo-form/todo-form.component';
import { GroupFormComponent } from './todo-list/group-form/group-form.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthGuard } from './services/auth-guard.service';
const routes: Routes = [
  {
    path:'todolist',
    canActivate:[AuthGuard],
    component:TodoListComponent
  },
  {
    path:'user',
    component:UserComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:UserComponent
  },
  {
    path:'Groupform',
    canActivate:[AuthGuard],
    component:GroupFormComponent
  },
  {
    path:'Groupform/:id',
    canActivate:[AuthGuard],
    component:GroupFormComponent
  },
  {
    path:'ToDoform',
    canActivate:[AuthGuard],
    component:TodoFormComponent
  },
  {
    path:'ToDoform/:id',
    canActivate:[],
    component:TodoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
