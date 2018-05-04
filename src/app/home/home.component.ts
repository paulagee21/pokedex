import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../pokemon-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  pokemon: string[];

  constructor(private pokemonService: PokemonDataService) { }

  ngOnInit() {
  }

}
