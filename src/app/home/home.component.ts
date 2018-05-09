import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { PokemonDataService } from '../pokemon-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public pokemons$: Observable<any[]>

  constructor(private pokemonService: PokemonDataService) { }

  public ngOnInit() {
    this.pokemonService
      .getAllPokemon()
      .subscribe(
        (pokemonList) => {
          this.pokemons$ = pokemonList;
        }
      );
  }

}
