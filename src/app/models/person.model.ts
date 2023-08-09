import { Pelicula } from "./pelicula.model";

export class Persona {
    nombres!: string;
    apellidos!: string;
    hijos!: Persona[];
    peliculas!: Pelicula[];
    constructor(){
    }
}