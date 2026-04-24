import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//ChangeDetectorRef permite re-renderizar información dinámica
import { ChangeDetectorRef } from '@angular/core';

import {ApiServicePokecards} from './services/api-service-pokecards';
import {PokeCards} from './poke-cards/poke-cards';
import {EmptyCard} from './empty-card/empty-card';
import {PokeTeam} from './poke-team/poke-team';

//https://localhorse.net/

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    PokeCards,
    EmptyCard,
    PokeTeam,
    ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})



export class App {

  protected readonly title = signal('pokeCards');

  //Usamos constructor para servicios
  constructor(

    private apiService: ApiServicePokecards, 
    //Fuerce de detección de cambios por asincronía
    private cdr: ChangeDetectorRef
) { }

  pokemonName:string = "";

  buttonCardType1:string = "Card 1";
  buttonCardType2:string = "Card 2";
  buttonCardType3:string = "Card 3";

  controlEnableButtons:boolean = false;

  //Para pasar datos tenemos que pasarle algo al hijo ya que en angular
  //la filosofía actual es la de en el padre no se toca el hijo ni se usa nada de este mas que lectura
  changeEmptyCard:boolean  = true;
  controlShowMainCard:boolean = false;

  card1!:number;
  card2!:number;
  card3!:number;

  listOfChoosenPokemon:any[]=[];
  choosenCardPokemon:string="";


  changeChoosenPokemon(changeChoosenPokemon:boolean){
    if(!changeChoosenPokemon){
      this.choosenCardPokemon = "";
    }
  }

  listOfTeamPokemon:any[]=[];
  flagAddNewCard:boolean=false;

  // refreshList(refreshList:any[]){
  //   console.log(refreshList);
  //   this.listOfTeamPokemon = refreshList;
  // }


  async   searchPokemon (pokemonName:string) {

    this.changeEmptyCard = true;
    this.controlShowMainCard = false;

    this.card1 = 0;
    this.card2 = 0;
    this.card3 = 0;

    this.listOfChoosenPokemon = [];

    this.controlEnableButtons = false;
    

    if(pokemonName !=""){

      // var responseFromApi:Promise<any> = await this.apiService.getCardPokemonByName(pokemonName);

      
      var responseFromApi = await this.apiService.getCardPokemonByName(pokemonName);
      
      console.log(responseFromApi);

      if (typeof responseFromApi === "string"){

        this.returnDefautlValues()

        this.changeEmptyCard = false;
      } else if(Array.isArray(responseFromApi) && responseFromApi.length < 2){

        this.returnDefautlValues()

        this.changeEmptyCard = false;

      } else{

        this.controlEnableButtons = true;
        this.changeEmptyCard = true;


        this.changeEmptyCard = true;        


        let control:boolean=true;

        
        while (control){

          if (this.card1 !== this.card2 && this.card1 !== this.card3 && this.card2 !== this.card3) {

            control = false;
          } else{

            this.card1 = this.ramdomPokemonCard(responseFromApi);
            this.card2 = this.ramdomPokemonCard(responseFromApi);
            this.card3 = this.ramdomPokemonCard(responseFromApi);

            this.buttonCardType1 = responseFromApi[this.card1].name+" IdCard "+responseFromApi[this.card1].id;
            this.buttonCardType2 = responseFromApi[this.card2].name+" IdCard "+responseFromApi[this.card2].id;
            this.buttonCardType3 = responseFromApi[this.card3].name+" IdCard "+responseFromApi[this.card3].id;

            this.listOfChoosenPokemon = [responseFromApi[this.card1],responseFromApi[this.card2],responseFromApi[this.card3]]

            this.choosenCardPokemon = responseFromApi[this.card1].id.toString();

            this.controlShowMainCard = true;

          }

        }

      }

    } else{

      this.returnDefautlValues()
      this.changeEmptyCard = true;

    }

    //Fuerce de detección de cambios por asincronía
    this.cdr.detectChanges();
  }



  changeCard(selection:number){

    switch(selection){
      case 0:

        this.choosenCardPokemon = this.listOfChoosenPokemon[0].id;
        break;
      case 1:

        this.choosenCardPokemon = this.listOfChoosenPokemon[1].id;
        break;
      case 2:

        this.choosenCardPokemon = this.listOfChoosenPokemon[2].id;
        break;
      default:

        break;
    }
  }

  addCardOnTeam(){

    // if(this.listOfTeamPokemon.length === 0){
    //   console.log("Lista vacía botón desabilitado");
    // } else 
      if(this.choosenCardPokemon != ""){

        //Añadir carta
        this.flagAddNewCard = !this.flagAddNewCard;

    } else{
      console.log("Valor choosenCardPokemon necesario");

    }

  }

  returnDefautlValues(){

    this.controlEnableButtons = false;

    this.changeEmptyCard = false;
    this.controlShowMainCard = false;


    this.buttonCardType1 = "Card1";
    this.buttonCardType2 = "Card2";
    this.buttonCardType3 = "Card3";
  }

  ramdomPokemonCard (pokemonCardList:any[]): number {

    let control:boolean = true;
    let ramdomPosition:number = 0;

    while(control){

      ramdomPosition = Math.floor(Math.random() * pokemonCardList.length);

      if(pokemonCardList[ramdomPosition].image && pokemonCardList[ramdomPosition].id && pokemonCardList[ramdomPosition].name){

        control = false;
      }
    }

    return ramdomPosition;
  }

}















/** 

Primeras pruebas realizando consultas a la API

//Devuelve un array asique lo creamos
datos: any[] = [];


    var pokemonName:string = this.pokemonName;

    this.apiService.searchCardPokemonById(pokemonName).subscribe(respuesta => {
      this.datos = respuesta;

      console.log(respuesta);
    });


  searchPokemon () {

    var pokemonName:string = this.pokemonName;

    this.apiService.searchCardPokemonbyID(pokemonName).subscribe(respuesta => {
      this.datos = respuesta;

      console.log(respuesta);
    });


    */