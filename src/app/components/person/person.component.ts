import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HijoComponent } from './hijo/hijo.component';
import { Persona } from 'src/app/models/person.model';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { Pelicula } from 'src/app/models/pelicula.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  formPerson: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ){
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
  addHijos(hijo:Persona){
    let fh = this.formBuilder.group({
      nombres: ['', [ Validators.required]],
      apellidos: ['', [ Validators.required]],
      edad: [0, [ Validators.required]],
    });
    fh.patchValue(hijo);
    this.hijos.push(fh);
  }
  addPeliculas(pelicula:Pelicula){
    let fp = this.formBuilder.group({
      nombre: ['', [ Validators.required]],
      director: ['', [ Validators.required]],
      anio: [1999, [ Validators.required]],
      ganoOscar: [false],
    });
    fp.patchValue(pelicula);
    this.peliculas.push(
      fp
    );
  }
  removeHijos(i:number) {
    this.hijos.removeAt(i);
  }
  removePelicula(i:number) {
    this.peliculas.removeAt(i);
  }


  openDialogHijo(): void {
    const dialogRef = this.dialog.open(HijoComponent);
    dialogRef.afterClosed().subscribe((result:Persona) => {
      if( result )
        this.addHijos(result)
    });
  }
  openDialogPelicula(): void {
    const dialogRef = this.dialog.open(PeliculaComponent);
    dialogRef.afterClosed().subscribe((result:Pelicula) => {
      if( result )
        this.addPeliculas(result)
    });
  }
}
