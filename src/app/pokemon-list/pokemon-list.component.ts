import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../pokemon-data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {

  constructor(private _data: PokemonDataService) { 
    this._data.getAllPokemon();
  }

  ngOnInit() {
  }

}
