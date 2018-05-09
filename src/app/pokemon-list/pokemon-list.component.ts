import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokemonDataService } from '../pokemon-data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {

  ngOnInit() {
  }

  @Input()
  pokemons: any[];

  @Output('pokemon')
  pokemonEmitter = new EventEmitter<any>();
}
