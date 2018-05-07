import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokemonDataService } from '../pokemon-data.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {

  ngOnInit() {
  }

  @Input()
  pokemon: Pokemon[];

  @Output('pokemon')
  pokemonEmitter = new EventEmitter<Pokemon>();
}
