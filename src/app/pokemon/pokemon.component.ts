import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { PokemonDataService } from '../pokemon-data.service'; 
import { Pokemon } from '../pokemon';

import 'rxjs/add/operator/do';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.sass']
})
export class PokemonComponent implements OnInit {

  public pokemon$: Observable<Pokemon>;
  public type: String;

  constructor(private activeRoute: ActivatedRoute, private pokemonService: PokemonDataService) { }

  ngOnInit() {
    const pokemon = this.activeRoute.snapshot.params.name;
    this.pokemonService.getPokedexPage(pokemon) 
     //.do(result => this.pokemon$ = result)
     //.flatMap(result => this.pokemonService.genericGet(result.evolution_chain))
      .subscribe(
        (results) => {
          this.pokemon$ = results;
          this.pokemon$.types.forEach((type, index) => {
            if (type.slot == 1) {
              this.type = type.type.name;
            }
            this.pokemon$.types[index] = type.type.name;
          });
        }
      );
  }
}
