import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Pokemon } from './pokemon';

const API_URL = environment.apiUrl;

@Injectable()
export class PokemonDataService {

  constructor(private http: Http) { 

  }

  public handleError() {
    console.log();
  }

  public getAllPokemon() {
    //get all pokemon
    return this.http
      .get(API_URL + '/pokemon/')
      .map(data => {
        const pokemonList = data.json();
        pokemonList.results.forEach((pokemon, index) => {
          this.getType(pokemon.name).subscribe(
            (types) => {
              pokemonList.results[index].id = types[0];
              pokemonList.results[index].types = types[1];
            }
          );
        });
        return pokemonList.results;
      })
  }
  

  public getPokemon(name) {
    return this.http
      .get(API_URL + '/pokemon/' + name +'/')
      .map(data => {
        const pokemon = data.json();
        return pokemon.results;
      })
    //get pokemon by name
  }

  public getType(name) {
    //get pokemon type
    return this.http
      .get(API_URL + '/pokemon/' + name +'/')
      .map(data => {
        const pokemonType = data.json();
        const types = [];
        types.push(pokemonType.id);
        pokemonType.types.forEach(type => {
         types.push(type.type.name);
        });
        return types;
      })
  }

  public getEvolution() {
    //get pokemon evolution chain
  }

}
