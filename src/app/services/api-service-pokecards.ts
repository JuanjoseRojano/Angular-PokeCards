import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';


import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class ApiServicePokecards {

  private apiUrL = 'https://api.tcgdex.net/v2/en/cards';

  //Creo httpclient para escuchar llamadas de la API
  constructor(private http: HttpClient) { };

  
async getCardPokemonByName(pokemonName: String): Promise<any> {

  try {

    return await firstValueFrom(

      this.http
        .get(this.apiUrL + "?name=" + pokemonName)
        .pipe(
          catchError((error: HttpErrorResponse) => {

            throw 'Error';
          })
        )
    );
  } catch (error) {

    return 'Error';
  }
}


//Devuelve una promesa de cualquier tipo, este permite que sea legible a diferencia del anterior código devuelvo Observable y puedo usat trycatch
//para manejo de errores y espera de la respuesta
async getCardPokemonById(cardId: String): Promise<any> {

  try {

    return await firstValueFrom(

      this.http
        .get(this.apiUrL + "/" + cardId)
        .pipe(
          catchError((error: HttpErrorResponse) => {

            throw 'Error';
          })
        )
    );
  } catch (error) {

    return 'Error';
  }
}



  // getCardPokemonById(id:String): Observable<any> {

  //   return this.http.get(this.apiUrL+"/"+id).pipe(catchError((error:HttpErrorResponse)=>{

  //     var message:String="Error";
  //     return throwError(()=>message);

  //   }));
  // }

}


// Versión vieja de recogida de datos
// this.getCardPokemonByName(pokemonName).subscribe(respuesta => {

//         console.log(respuesta);

//         prueba = respuesta;

//     });




//version antigua, presentaba problemas de asincronía o devolvía datos vacíos
 // returnPokemonCardsByName(pokemonName:String): String | any[]{

  //   var returnData:String | any;



  //   this.getCardPokemonByName(pokemonName).subscribe({

  //     // Subscribe se divide en 3 partes principales
  //     // Next cuando la respuesta llega de manera correcta
  //     // Error cuando sucede un error http, de red etc...
  //     // Complete cuando finaliza solo y únicamente cuando termina next es decir, la petición fue fructífera

  //     next: data => {

  //       console.log(data);
  //       returnData = data;
  //     },

  //     error: error=>{

  //       returnData = "Error";
  //       console.log("Error inesperado");
  //     },

  //     complete: () => {

  //       console.log("Completado");
  //     }


  //   });

  //   return returnData;
  
  // }






//Esta versión también muestra fallos de asincronía
    // getCardPokemonByName(pokemonName:String): Promise <any> {

  //   return this.http.get(this.apiUrL+"?name="+pokemonName).pipe(catchError((error:HttpErrorResponse)=>{

  //     var message:String="Error";
  //     return throwError(()=>message);

  //   }));

  // }