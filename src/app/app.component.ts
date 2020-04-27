import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

import { PokemonApiService } from './pokemon-api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  pokemons = [];

  constructor(private _pokemonApiService: PokemonApiService) {}

  ngOnInit(){
    this.getPokemonList();
  }

  private getPokemonList() {
    this._pokemonApiService.getListOfPokemon('5').subscribe(
      response => { this.getPokemonDetails(response.map(response => response.url)); },
      error => { console.error(error); }
    );
  }

  private getPokemonDetails(urlList: Array<string>) {
    this._pokemonApiService.getPokemonDetails(urlList).subscribe(
      response => { this.pokemons = response; },
      error => { console.error(error); }
    );
  }

}
