import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Tabla_Errores from 'src/app/Grammar_Instruction/Tabla_Errores';
import { Errores } from 'src/app/Interfaces/Errores';

@Component({
  selector: 'app-formulario-tabla-errores',
  templateUrl: './formulario-tabla-errores.component.html',
  styleUrls: ['./formulario-tabla-errores.component.scss'],
})
export class FormularioTablaErroresComponent implements OnInit {

  public lista : Errores[];

  constructor(private formBuilder: FormBuilder) 
  { 
    this.buildForm();
  }

  ngOnInit() 
  {
    this.lista = Tabla_Errores.getInstance();
  }

  private buildForm() 
  {
    this.lista = Tabla_Errores.getInstance();
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
