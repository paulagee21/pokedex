import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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
              types.splice(0,1)
              pokemonList.results[index].types = types;
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
        this.getSpecies(pokemon.name).subscribe(
          (species) => {
            species.flavor_text_entries.forEach((flavor_text) => {
              if (flavor_text.language.name == 'en') {
                pokemon.description = flavor_text.flavor_text;
              }
            });
            species.genera.forEach((value, index) => {
              if (value.language.name == 'en') {
                pokemon.species = value.genus.split(" ")[0];
              }
            });
          }
        )
        return pokemon;
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

  public getSpecies(name) {
    return this.http
      .get(API_URL + '/pokemon-species/' + name + '/')
      .map(data => {
        const species = data.json();
        return species;
      })

  }

  public getEvolution() {
    //get pokemon evolution chain
  }

}
