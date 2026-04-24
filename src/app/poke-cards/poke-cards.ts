import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {ApiServicePokecards} from '../services/api-service-pokecards';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';


/**
 * 
 *   NOTA IMPORTANTE
 *   Las interfaces tienen que ir por encima del componente porque la interfaz es una definición de tipos mientras
 *   que el componente es un uso de tipos
 * 
 */

interface Attack{
  name:string
  effect:string
  damage:string
}

interface Abilities{
  type:string
  name:string
  effect:string
}


@Component({
  selector: 'app-poke-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poke-cards.html',
  styleUrl: './poke-cards.css',
})



export class PokeCards {

  @Input() choosenCardPokemon!:string;

  constructor(

    private apiService: ApiServicePokecards, 
    //Fuerce de detección de cambios por asincronía
    private cdr: ChangeDetectorRef
) { }

  controlEffectOrAttacksPokeCard:boolean = true;
  controlShowInfoCard:boolean = false;


  imagePokeCard:string = "";
  namePokeCard:string = "";
  categoryPokeCard:string = "";
  illustratorPokeCard:string = "";
  rarityPokeCard:string = "";
  typePokeCard:string = "";
  setNamePokeCard:string = "";


  effectPokeCard:string = "";
  attacksPokeCard:Attack[]=[];
  abilitiesPokeCard:Abilities[]=[];

  

  ngOnChanges():void {

    this.searchPokemonById(this.choosenCardPokemon);
  }

  async searchPokemonById(choosenCardPokemon:string){

    var responseFromApi = await this.apiService.getCardPokemonById(choosenCardPokemon);

    if(responseFromApi.image){

      this.imagePokeCard = responseFromApi.image+"/low.png";
    }

    if(responseFromApi.name){

      this.namePokeCard = responseFromApi.name;
    }

    if(responseFromApi.category){

      this.categoryPokeCard = responseFromApi.category;
    }

    if(responseFromApi.rarity){

      this.rarityPokeCard = responseFromApi.rarity;
    }

    if(responseFromApi.illustrator){

      this.illustratorPokeCard = responseFromApi.illustrator;
    }

    if(responseFromApi.types){

      this.typePokeCard = responseFromApi.types[0];
    }

    if(responseFromApi.set.name){

      this.setNamePokeCard = responseFromApi.set.name;
    }

    if(responseFromApi.effect){

      this.controlEffectOrAttacksPokeCard = false;
      this.effectPokeCard = responseFromApi.effect;
    } else if(responseFromApi.attacks){

      this.controlEffectOrAttacksPokeCard = true;
      this.attacksPokeCard = responseFromApi.attacks;
    }

    if(responseFromApi.abilities){

      this.abilitiesPokeCard = responseFromApi.abilities;
    }

    this.cdr.detectChanges();

  }


  showInfoAboutPokeCards(){
    
    this.controlShowInfoCard = !this.controlShowInfoCard;
  }


  //Versión chatgpt para confirmar que funciona tras observar problemas de asincronía
//   ngOnChanges(changes: SimpleChanges) {
//   if (changes['pokemons']) {
//     const current = changes['pokemons'].currentValue;

//     if (current && current.length > 0) {
//       console.log('DATOS BUENOS:', current);
//     }
//   }
// }


}
