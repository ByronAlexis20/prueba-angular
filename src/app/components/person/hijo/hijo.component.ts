import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Persona } from 'src/app/models/person.model';
import { PersonComponent } from '../person.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss']
})
export class HijoComponent {
  hijo: Persona = new Persona();
  childrenForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PersonComponent>, private formBuilder: FormBuilder
  ) {
    this.childrenForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required, this.ageAsyncValidator.bind(this)]
    });
  }

  onNoClick(): void {
    this.dialogRef.close( null );
  }
  
  addChild(): void {
    if (this.childrenForm.invalid) {
      this.childrenForm.markAllAsTouched();
      return;
    }
    this.hijo.nombres = this.childrenForm.get('lastName')?.value;
    this.hijo.apellidos = this.childrenForm.get('name')?.value;
    this.hijo.edad = this.childrenForm.get('age')?.value;
    this.dialogRef.close( this.hijo );
  }

  async ageAsyncValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    const age = control.value;
    if (age !== null && (isNaN(age) || age >= 18)) {
      return { 'invalidAge': true };
    }
  
    return null;
  }
  
}
