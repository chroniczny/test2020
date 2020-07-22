import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {User} from "../home/home.model";
import * as moment from 'moment';

@Component({
  selector: 'app-editor-dialog',
  templateUrl: './editor-dialog.component.html',
  styleUrls: ['./editor-dialog.component.scss']
})
export class EditorDialogComponent implements OnInit {
  editUserForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditorDialogComponent>,) {}

  public emailPattern: RegExp = /^[\s]*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))[\s]*$/;

  ngOnInit() {
    this.createForm(this.data);
  }

  createForm(data: any) {
    this.editUserForm = this.fb.group(({
      date: [data.date ? data.date : '', Validators.required],
      enabled: [data.enabled ? data.enabled : '', Validators.required],
      name: [data.name ? data.name : '', Validators.required],
      role: [data.role ? data.role : '', Validators.required],
      surname: [data.surname ? data.surname : '', Validators.required],
      userName: [data.userName ? data.userName : '', Validators.required],
      email: [data.email ? data.email : '', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])] // or use: Validators.email
    }));
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.editUserForm.value);
  }
}
