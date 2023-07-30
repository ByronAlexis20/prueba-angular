import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-children-form',
  templateUrl: './children-form.component.html',
  styleUrls: ['./children-form.component.css']
})
export class ChildrenFormComponent implements OnInit {
  childrenForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ChildrenFormComponent>) {
    this.childrenForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.childrenForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  addChild() {
    console.log(this.childrenForm.value)
    this.dialogRef.close(this.childrenForm.value);
  }
}
