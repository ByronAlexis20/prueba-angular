import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChildrenFormComponent } from '../children-form/children-form.component';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  childrenList: any[] = [];
  favoriteMoviesList: any[] = [];

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { 
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      children: this.formBuilder.array([]),
      favoriteMovies: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      children: this.formBuilder.array([]),
      favoriteMovies: this.formBuilder.array([])
    });
  }

  get childrenControls() {
    return (this.personForm.get('children') as FormArray).controls;
  }

  get favoriteMoviesControls() {
    return (this.personForm.get('favoriteMovies') as FormArray).controls;
  }

  addChild() {
    let dialogRef = this.dialog.open( ChildrenFormComponent, {
      width: '1000px', height: '400px', data: null });

    dialogRef.afterClosed().subscribe((result: any) => {
      const childForm = this.formBuilder.group({
        name: [result.name, Validators.required],
        age: [result.age, Validators.required]
      });
      console.log(childForm)
      
      this.children.push(childForm);
      this.children.updateValueAndValidity();
      
    });
  }

  get children(): FormArray {
    return this.personForm.get('children') as FormArray;
  }

  addFavoriteMovie() {
    const movieForm = this.formBuilder.group({
      name: ['', Validators.required],
      director: ['', Validators.required],
      year: ['', Validators.required],
      oscarWinner: [false]
    });
    this.favoriteMoviesList.push(movieForm.value);
    (this.personForm.get('favoriteMovies') as FormArray).push(movieForm);
  }

  removeChild(index: number) {
    this.childrenList.splice(index, 1);
    (this.personForm.get('children') as FormArray).removeAt(index);
  }

  removeFavoriteMovie(index: number) {
    this.favoriteMoviesList.splice(index, 1);
    (this.personForm.get('favoriteMovies') as FormArray).removeAt(index);
  }

  onSubmit() {
    console.log(this.personForm.value);
  }
}
