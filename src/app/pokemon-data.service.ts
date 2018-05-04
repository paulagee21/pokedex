import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { environment } from '../environments/environment';
import { Http } from '@angular/http';

const API_URL = environment.apiUrl;

@Injectable()
export class PokemonDataService {

  constructor(private http: Http) { 

  }

  public getAllPokemon() {
    //get all pokemon
    return this.http
      .get(API_URL + '/pokemon/')
      .subscribe(
        data => console.log('success', data), 
        error => console.log('oops', error)
      );
  }
  

  public getPokemon() {
    //get pokemon by name
  }

  public getType() {
    //get pokemon type
  }

  public getEvolution() {
    //get pokemon evolution chain
  }

}
