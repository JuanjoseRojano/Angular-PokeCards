import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-card',
  standalone: true,
  imports: [],
  templateUrl: './empty-card.html',
  styleUrl: './empty-card.css',
})



export class EmptyCard {

  @Input() changeEmptyCard!:boolean;

  @Output() changeChoosenPokemon = new EventEmitter <boolean>();

  changeChoosenPokemonState:boolean = false;

  ngOnChanges() {
    
    this.changeStateEmptyCard(this.changeEmptyCard);
  }


  emptyCardChangeStatePokeball:String="images/Pokeball.png";
  emptyCardChangeStateDitto:String="images/Ditto.jpg";

  emptyCardChangeState:String=this.emptyCardChangeStatePokeball;

  setemptyCardChangeState(emptyCardChangeState:String){
    this.emptyCardChangeState = emptyCardChangeState;
  }


  changeStateEmptyCard(controlChangeCard:Boolean){
    
    switch(controlChangeCard){

      case true:

        this.emptyCardChangeState = this.emptyCardChangeStatePokeball;
        this.changeChoosenPokemon.emit(this.changeChoosenPokemonState);
        break;

      case false:

        this.emptyCardChangeState = this.emptyCardChangeStateDitto;
        this.changeChoosenPokemon.emit(this.changeChoosenPokemonState);
        break;

      default:

        this.emptyCardChangeState = this.emptyCardChangeStatePokeball;
        this.changeChoosenPokemon.emit(this.changeChoosenPokemonState);
        break;
    }

  }




}
