import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptimizacionC } from 'src/app/Interfaces/OptmizacionC';
import AST_Optimizacion from 'src/app/Optimizacion/AST_Optimizacion';
import { BloqueP } from 'src/app/Optimizacion/BloqueP';
import { listaBloque } from 'src/app/Optimizacion/ListaBloque';
import { saltoCondicional } from 'src/app/Optimizacion/saltoCondicional';
import { saltoDecMetodo } from 'src/app/Optimizacion/saltoDecMetodo';
import { saltoEtiqueta } from 'src/app/Optimizacion/saltoEtiqueta';
import { saltoExpAritmetica } from 'src/app/Optimizacion/saltoExpAritmetica';
import { saltoIncondicional } from 'src/app/Optimizacion/saltoIncondicional';
import { saltoLiteral } from 'src/app/Optimizacion/saltoLiteral';
import Tabla_Optimizacion from 'src/app/Optimizacion/Tabla_Optimizacion';

declare const Optimizacion: any;

@Component({
  selector: 'app-formulario-optimizacion',
  templateUrl: './formulario-optimizacion.component.html',
  styleUrls: ['./formulario-optimizacion.component.scss'],
})
export class FormularioOptimizacionComponent implements OnInit {

  formulario_optimizar : FormGroup;
  lista : OptimizacionC[];
  salida: String;
  
  constructor(private formBuilder: FormBuilder) { this.buildForm() }

  ngOnInit() {}

  private buildForm() 
  {
    this.formulario_optimizar = this.formBuilder.group({
      textarea: ['//ingrese el código a optimzar',  [Validators.required]],
      consola: ['...',  [Validators.required]],
    });
  }

  ejecutar(event: Event)
  {
    try 
    {
      event.preventDefault();
      const value = this.formulario_optimizar.value;
      this.Optimizar(value['textarea']);
    }catch (error) 
    {
      alert("Aun no valido errores")
    }
  }

  Optimizar(entrada : String) {
    try {
      const result = Optimizacion.parse(entrada);
      const optimizacion : AST_Optimizacion = new AST_Optimizacion(result,false);
      const ast = optimizacion.build_ast();
      console.log(ast);
      for (const instr of ast) {
        try {
          if (instr instanceof saltoDecMetodo) {
            //agrupar en la lista bloques padre
            let nuevo = (instr as saltoDecMetodo);
            let blo: BloqueP = new BloqueP();
            blo.agregarNombre(nuevo.ide);
            let lider = 0;
            let eliminarSiguienteGoto = 0;
            let anterior = "";
            for (let bloque of nuevo.lista) {
              if (bloque instanceof saltoExpAritmetica && lider == 1) {
                if (anterior == "saltoIncondicional") {
                  let optimizacion = {linea : instr.line.toString(), columna: instr.column.toString(), tipo: "REGLA1", mensaje: "Se elimino instrucciones anteriores"};
                  Tabla_Optimizacion.getInstance().push(optimizacion);
                  anterior = "";
                  //b.nuevoBloque(bloque);
                } else {
                  blo.nuevoBloque(bloque);
                }
                lider = 0;
              }
              else if (bloque instanceof saltoCondicional) {
                let x = bloque as saltoCondicional;
                if (x.dato instanceof saltoLiteral && x.dato2 instanceof saltoLiteral) {
                  let y = x.dato as saltoLiteral;
                  let z = x.dato2 as saltoLiteral;

                  if (y.valor.indexOf('t') == -1 && z.valor.indexOf('t') == -1) {
                    if (y.valor == z.valor && x.signo == "==") {
                      eliminarSiguienteGoto = 1;
                    }
                    else if (y.valor != z.valor && x.signo == "!=") {
                      let optimizacion = {linea : instr.line.toString(), columna: instr.column.toString(), tipo: "REGLA4", mensaje: "Se elimino instruccion de if " + y.valor + "y" + z.valor + " goto"};
                      Tabla_Optimizacion.getInstance().push(optimizacion);
                    }
                    else {
                      blo.nuevoBloque(bloque);
                    }
                  } else {
                    blo.nuevoBloque(bloque);
                  }
                  console.log("holis");
                } else {
                  blo.nuevoBloque(bloque);
                }
                lider = 0;
              }
              else if (bloque instanceof saltoIncondicional && lider == 0) {
                if (eliminarSiguienteGoto == 0) {
                  blo.nuevoBloque(bloque);
                  lider = 1;
                  anterior = "saltoIncondicional";
                } else {
                  eliminarSiguienteGoto = 0;
                  let optimizacion = {linea : instr.line.toString(), columna: instr.column.toString(), tipo: "REGLA3", mensaje: "Se elimino instruccion de goto"};
                  Tabla_Optimizacion.getInstance().push(optimizacion);
                }
              }
              else if (bloque instanceof saltoEtiqueta && lider == 0) {
                //if (anterior == "saltoIncondicional") {
                //TablaOptimizacion.push(new Optimizado(instr.line, instr.column, "REGLA1", "Se elimino instrucciones anteriores"));
                blo.nuevoBloque(bloque);
                //}
                lider = 1;
              }
              else {
                blo.nuevoBloque(bloque);
                lider = 0;
              }
            }
            listaBloque.push(blo);
          }
        } catch (error) {
          //errores.push(error);
        }
      }

      for (let i of listaBloque) {
        let val = i.getBloque();
        for (let x of val) {
          if(x != undefined)
          { 
            x.execute();
          }
        }
      }
    }
    catch (error) {
      console.log(error);
    }
    this.lista = Tabla_Optimizacion.getInstance();
  }

  imprimirConsola()
  {
    this.salida = this.salida + '\n' + '//fin de la ejecución';
  }

}
