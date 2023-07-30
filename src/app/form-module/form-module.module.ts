import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChildrenFormComponent } from './children-form/children-form.component';


@NgModule({
  declarations: [
    ChildrenFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    ChildrenFormComponent
  ]
})
export class FormModuleModule { }
