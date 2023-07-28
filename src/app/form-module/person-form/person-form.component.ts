import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  childrenList: any[] = [];
  favoriteMoviesList: any[] = [];

  constructor(private formBuilder: FormBuilder) { 
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
    const childForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required]
    });
    this.childrenList.push(childForm.value);
    (this.personForm.get('children') as FormArray).push(childForm);
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
