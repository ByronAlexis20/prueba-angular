import { Component } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula.model';
import { PersonComponent } from '../person.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent {
  pelicula: Pelicula = new Pelicula();
  constructor(
    public dialogRef: MatDialogRef<PersonComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
