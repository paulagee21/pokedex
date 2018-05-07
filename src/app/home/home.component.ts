import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { PokemonDataService } from '../pokemon-data.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public pokemon$: Observable<Pokemon[]>

  constructor(private pokemonService: PokemonDataService) { 
  }

  public ngOnInit() {
    this.pokemonService
      .getAllPokemon()
      .subscribe(
        (pokemon) => {
          this.pokemon$ = pokemon;
        }
      );
  }

}
