import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AST from 'src/app/Grammar_Instruction/AST';
import Middle from 'src/app/Grammar_Instruction/Middle';
import Tabla_Errores from 'src/app/Grammar_Instruction/Tabla_Errores';

declare const Grammar_MatrioshTS: any;

@Component({
  selector: 'app-formulario-traducir',
  templateUrl: './formulario-traducir.component.html',
  styleUrls: ['./formulario-traducir.component.scss'],
})
export class FormularioTraducirComponent implements OnInit 
{

  formulario_traducir : FormGroup;
  salida: String;

  constructor(private formBuilder: FormBuilder) 
  { 
    this.buildForm();
  }

  ngOnInit() {}

  private buildForm() 
  {
    this.formulario_traducir = this.formBuilder.group({
      textarea: ['let hola = 10; \nhola = 50;\nconsole.log(hola);',  [Validators.required]],
      consola: ['...',  [Validators.required]],
    });
    //this.salida = "..."
  }

  ejecutar(event: Event)
  {
    event.preventDefault();
    const value = this.formulario_traducir.value;

    Tabla_Errores.clear();
    Middle.getInstance().clear();
    Middle.getInstance().setInput(value['textarea']);
    var resultado = Grammar_MatrioshTS.parse(Middle.getInstance().getInput());
    var ast : AST = new AST(resultado,false);
    ast.build_ast();
    ast.exec_ast();
    Middle.getInstance().initOuput();
    this.imprimirConsola(value);
  }

  imprimirConsola(value : FormGroup)
  {
    const text_out = Middle.getInstance().getOuput();
    this.salida = ''
    this.salida = text_out + '\n' + '//fin de la ejecución';
  }
}
