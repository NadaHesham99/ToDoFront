import { LocalStorageService } from './../../services/local-storage.service';
import { Group } from './../../models/group';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from 'src/app/services/groups.service';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  currentGroupId: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupsService,
    private location: Location,
    private activiateRoute: ActivatedRoute,
    private localStorage:LocalStorageService) {
    this.form = this.formBuilder.group({
      title: ['']
    })
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      status:['pending']
    });

    this.checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const group: Group = {
      _id: this.currentGroupId,
      title: this.form.controls["title"].value,
      user:this.localStorage.getId(),
      status: this.form.controls["status"].value
    }
    if (this.editMode) {
      // this._updateGroup(group);
      this.groupService.updateGroup(group).subscribe(response => {
        timer(1000).toPromise().then(() => {
          this.location.back();
        })
      });
    }
    else {
      this.groupService.createGroup(group).subscribe(response => {
        timer(1000).toPromise().then(done => {
          this.location.back();
        })
      });
    }

  }

  private checkEditMode() {
    this.activiateRoute.params.subscribe((response) => {
      if (response["id"]) {
        this.editMode = true;
        this.currentGroupId = response["id"];
        this.groupService.getGroupById(response["id"]).subscribe(group => {
          this.form.controls["title"].setValue(group.title);
        })
      }
    })
  }

  goBack(){
    timer(200).toPromise().then(()=>{
      this.location.back();
    })
  }
}
