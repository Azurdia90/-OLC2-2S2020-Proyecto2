import { Component, OnInit } from '@angular/core';
import Tabla_Simbolos from 'src/app/Grammar_Instruction/Tabla_Simbolos';
import { Matrioshts } from 'src/app/Interfaces/Matrioshts';

@Component({
  selector: 'app-formulario-tabla-simbolos',
  templateUrl: './formulario-tabla-simbolos.component.html',
  styleUrls: ['./formulario-tabla-simbolos.component.scss'],
})
export class FormularioTablaSimbolosComponent implements OnInit {

  public lista : Matrioshts[];

  constructor() 
  { 
    this.buildForm();
  }

  ngOnInit() 
  {
    this.loadtabla();
  }

  private buildForm() 
  {
    this.loadtabla();
  }

  private loadtabla()
  {
    this.lista = [];
    let lista_types = Tabla_Simbolos.getInstance().getLista_types();
    let stack_tmp = Tabla_Simbolos.getInstance().getStack();

    for(var s = 0; s < stack_tmp.length; s++)
    {
      let substack_tmp = stack_tmp[s];
      for(var e = 0;  e < substack_tmp.length; e++)
      {
        let entorno_tmp = substack_tmp[e];
        for(var se = entorno_tmp.length-1; se >= 0; se--)
        {
          let subentorno = entorno_tmp[se];
          for(let [key,value] of entorno_tmp[se])
          {
            let simbolo_tmp = {ambito: substack_tmp.getIdentificador().toString(), subambito: entorno_tmp[se].getEntorno().toString(), rol: this.traducir_Rol(value.getRol()), constante: value.getConstante() == true? "Si": "No", tipo: value.getTipo().getTraduccion(), identificador: value.getIdentificador(), posicion_s: value.getPos_S().toString(), tamanio: "0"};
            this.lista.push(simbolo_tmp);
          }
        }
      }
    }
  }

  private traducir_Rol(p_tipo: number)
  {
    if(p_tipo == 0)
    {
      return "Valor";
    }
    else if(p_tipo == 1)
    {
      return "Arreglo";
    }
    else if(p_tipo == 2)
    {
      return "Type";
    }
    else if(p_tipo == 3)
    {
      return "Función";
    }
    else if(p_tipo == 4)
    {
      return "Parámetro";
    }
    else if(p_tipo == 5)
    {
      return "Aceptado";
    }
    else if(p_tipo == 6)
    {
      return "Continuar";      
    }
    else if(p_tipo == 7)
    {
      return "Retornar";
    }
    else if(p_tipo == 8)
    {
      return "Detener"
    }
    else
    {
      return "Error";
    }
  }

  header(dat) {
    console.log(dat);
    let h:any =[] //array to title columns
    let listHeader: any = Object.keys(dat) //getting the headings and adding
    listHeader.forEach(item => { //scanning the array of titles
      h.push({ name: item }) //adding the titles to the list
    })
    return h //retuning list
  }

}
