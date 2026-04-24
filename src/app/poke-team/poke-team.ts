import { Component, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';


import {PokeCards} from '../poke-cards/poke-cards';


@Component({
  selector: 'app-poke-team',
  standalone: true,
  imports: [PokeCards],
  templateUrl: './poke-team.html',
  styleUrl: './poke-team.css',
})



export class PokeTeam {

  constructor(

    private cdr: ChangeDetectorRef
) { }

  @Input() choosenCardPokemon!:string;
  @Input() flagAddNewCard!:boolean;

  // @Output() refreshList = new EventEmitter <any[]>();

  control:boolean = true;
  idListOfTeamPokemon:any[]=[];

  idFocusPokeCard:number | null = null;
  pokeCardSelected:number | null = null;
  controlChangePokeCardSelected:boolean = false;

  controlDeletePokeCardSelected:boolean = false;

  ngOnChanges(){

    if(this.flagAddNewCard != this.control){

      this.addPokeCardOnTeam(this.choosenCardPokemon);
      this.control = this.flagAddNewCard;
    }

  }



  addPokeCardOnTeam(choosenCardPokemon:string){
    
    if(choosenCardPokemon !=""){

      if(this.idListOfTeamPokemon.length != 0){

        if(this.idListOfTeamPokemon.length !=60){
        
        var checkRepeatId:number = 0;


        this.idListOfTeamPokemon.forEach((element:string) => {

          if(element === choosenCardPokemon){
            
            checkRepeatId++;
          }
        });

        if(checkRepeatId <= 3){

          this.idListOfTeamPokemon.push(choosenCardPokemon);
          this.controlChangePokeCardSelected = true;
          this.controlDeletePokeCardSelected = true;

          this.idListOfTeamPokemon.sort();

        }
      }

      } else{

        this.idListOfTeamPokemon.push(choosenCardPokemon);
        this.controlChangePokeCardSelected = true;
        this.controlDeletePokeCardSelected = true;

        this.pokeCardSelected = 0;
        this.idFocusPokeCard = 1;

        this.idListOfTeamPokemon.sort();


      }

    }

    this.cdr.detectChanges();

  }



  prevPokeCard(){

    if(this.pokeCardSelected != null && this.idFocusPokeCard != null){

      if(this.pokeCardSelected != 0){

        this.pokeCardSelected--;
        this.idFocusPokeCard--;

      }

    }

  }

  nextPokeCard(){

    if(this.pokeCardSelected != null  && this.idFocusPokeCard != null){
      
      if(this.pokeCardSelected != this.idListOfTeamPokemon.length-1){
        
        this.pokeCardSelected++;
        this.idFocusPokeCard++;
        

      }

    }

  }

  deletePokeCard(){

    if(this.pokeCardSelected != null  && this.idFocusPokeCard != null){

      this.idListOfTeamPokemon.splice(this.pokeCardSelected, 1);

      if(this.pokeCardSelected != 0){
        this.pokeCardSelected--;
        this.idFocusPokeCard--;
      }

      if(this.idListOfTeamPokemon.length === 0){
        this.pokeCardSelected = null;
        this.idFocusPokeCard = null;

      }
    }

  }


}
