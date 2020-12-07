import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { grafica } from 'src/app/Grammar_Instruction/grafica';

declare const Grammar_MatrioshTSGrafica: any;

@Component({
  selector: 'app-formulario-graficar',
  templateUrl: './formulario-graficar.component.html',
  styleUrls: ['./formulario-graficar.component.scss'],
})
export class FormularioGraficarComponent implements OnInit 
{
  formulario_graficar : FormGroup;
  entrada: String;
  salida: String;

  constructor(private formBuilder: FormBuilder) 
  { 
    this.buildForm();
  }
  ngOnInit() {}

  private buildForm() 
  {
    this.formulario_graficar = this.formBuilder.group({
      textarea: ['let hola = 10; \nhola = 50;\nconsole.log(hola);',  [Validators.required]],
      consola: ['...',  [Validators.required]],
    });
  }

  impresion(ast2: string) {
    const g = new grafica();
    const imp = g.getDOT(ast2);
    return imp;
  }
  
  graficar(event: Event) 
  {
    try 
    {
      event.preventDefault();
      const value = this.formulario_graficar.value;

      const ast2 = Grammar_MatrioshTSGrafica.parse(value['textarea']);
      const val = this.impresion(ast2);
      this.salida = val + '';
    }catch (error) 
    {
      alert("Aun no valido errores")
    }
  }

}
