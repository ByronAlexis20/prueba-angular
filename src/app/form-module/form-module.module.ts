import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from './person-form/person-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormModuleModule { }
