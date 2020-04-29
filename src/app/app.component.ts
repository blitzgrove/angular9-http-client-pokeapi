import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PokemonApiService } from './services/pokemon-api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  pokemons = [];
  idForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _pokemonApiService: PokemonApiService) {
      this.createIdForm();
    }

  ngOnInit(){
    this.getPokemonList();
  }

  private createIdForm() {
    this.idForm = this._formBuilder.group({
      start: ['1', [Validators.maxLength(4), Validators.min(1)]],
      end: ''
    })
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

  onIdSubmit() {
    console.log('submitted');
  }

}
