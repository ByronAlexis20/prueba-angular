import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  formPerson: FormGroup;
  constructor(private formBuilder: FormBuilder){
    this.formPerson = formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      
    });

  }
  register(){
    console.log(this.formPerson.value);

  }
}
