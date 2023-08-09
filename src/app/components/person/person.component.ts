import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      hijos: this.formBuilder.array([]),
      peliculas: this.formBuilder.array([])
    });

  }
  get hijos(): FormArray {
    return this.formPerson.get('hijos') as FormArray;
  }
  get peliculas(): FormArray {
    return this.formPerson.get('peliculas') as FormArray;
  }
  register(){
    console.log(this.formPerson.value);
  }
  addHijos(){
    this.hijos.push(
      this.formBuilder.group({
        nombres: ['', [ Validators.required]],
        apellidos: ['', [ Validators.required]],
      })
    );
  }
  addPeliculas(){
    this.peliculas.push(
      this.formBuilder.group({
        nombre: ['', [ Validators.required]],
        director: ['', [ Validators.required]],
        anio: [1999, [ Validators.required]],
        ganoOscar: [false],
      })
    );
  }
  removeHijos(i:number) {
    this.hijos.removeAt(i);
  }
  removePelicula(i:number) {
    this.peliculas.removeAt(i);
  }
}
