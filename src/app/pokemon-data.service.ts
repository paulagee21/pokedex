import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { forkJoin } from 'rxjs/observable/forkJoin';

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
  

  //get everything needed for pokedex page
  //1. pokemon basic information (e.g. name, description, species)
  //2. pokemon's evolution chain
  //3. sprites of all pokemon included in evolution chain
  public getPokedexPage(name) {
    let getPokemonSpecies = this.getSpecies(name);
    let getPokemonInfo = this.getPokemonInfo(name); 

    return forkJoin([getPokemonInfo, getPokemonSpecies]).map(results => {
      //first, get pokemon info and species
      const pokemon = results[0];
      const species = results[1];
      pokemon.evolution_chain = species.evolution_chain.url;
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
      return pokemon;
    })
    .mergeMap(pokemon => {
      //after getting pokemon info, get the pokemon's evolutin chain
      return this.genericGet(pokemon.evolution_chain).map(evolution => {
        let e = [];
        let loop = true;
        let chain = [evolution.chain];
        chain.forEach(loop) {
          let triggerVal: any = 0;
          let triggerCondition: string = ''; 
          chain.forEach(link =>{
            console.log(link);
            if (link.evolution_details.length) {
              triggerCondition = link.evolution_details[0].trigger.name;
              switch (triggerCondition) {
                case 'level-up':
                  triggerVal = (link.evolution_details[0].min_level);
                  break;
                case 'trade':
                  triggerVal = 'trade';
                  break;
                default:
                  triggerVal = (link.evolution_details[0].item.name);
                  break;
              }
            } 
            let name = link.species.name;
            e.push({trigger_condition: triggerCondition, trigger_val: triggerVal, name: name});
            if (link.evolves_to.length) {
              let temp_chain =[];
              link.evolves_to.forEach(new_chain => {
                temp_chain.push(new_chain);
              chain = temp_chain;
              })
            } else {
              loop = false;
            }
          })
        }
        pokemon.evolution = e;
        return pokemon;
      });
    })
    .mergeMap(pokemon => {
      let getSpritesChain = [];
      pokemon.evolution.forEach(stage => {
        getSpritesChain.push(this.getSprite(stage.name));
      })
      return forkJoin(getSpritesChain).map(sprites => {
        pokemon.evolution.forEach((stage, index) => {
          pokemon.evolution[index].sprites = sprites[index];
        })
        return pokemon;
      });
    })
  }

  public getPokemonInfo(name) {
    return this.http
      .get(API_URL + '/pokemon/' + name + '/')
      .map(data => {
        return data.json()
      });
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

  public getTypeInfo(name) {
    return this.http
      .get(API_URL + '/type/' + name + '/')
      .map(data => {

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

  public getEvolution(id) {
    return this.http
      .get(API_URL + '/evolution-chain/' + id + '/')
      .map(data => {
        const evolution = data.json();
        return evolution
      })
    //get pokemon evolution chain
  }

  public getSprite(name) {
    return this.getPokemonInfo(name)
      .map(data => {
        return data.sprites;
      });
  }

  public genericGet(url) {
    return this.http 
      .get(url)
      .map(data => {
        return data.json();
      })
  }

}
