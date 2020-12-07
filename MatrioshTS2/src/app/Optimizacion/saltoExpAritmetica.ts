import { Optimizacion } from "./Optimizacion";
import { salto } from "./salto";
import Tabla_Optimizacion from './Tabla_Optimizacion';

export class saltoExpAritmetica extends salto {
    private texto = "";
    private dato1: any;
    private dato2: any;
    private signo: any;
    private dato3: any;

    constructor(tipoDato: any, tipoDato2: any, signo: any, tipoDato3: any, line: number, column: number) {
        super(line, column);
        this.dato1 = tipoDato;
        this.dato2 = tipoDato2;
        this.signo = signo;
        this.dato3 = tipoDato3;
    }

    public execute() {
        console.log("esto es la expresion");
        this.dato1.execute();
        console.log("dato1" + this.dato1.valor);
        this.dato2.execute();
        console.log("dato2" + this.dato2.valor);
        console.log("signo" + this.signo);
        this.dato3.execute();
        console.log("dato3" + this.dato3.valor);

        if (this.dato1.valor == this.dato2.valor) {

            //REGLA 6 
            //p + 0 || temp + 0        
            //REGLA 7
            // p - 0 || temp - 0
            if (this.dato3.valor == 0 && this.signo == "+" || this.signo == "-") {
                let val;
                let mensage;
                if (this.signo == "+") {
                    val = "REGLA6 p + 0 || temp + 0";
                    Optimizacion.generarCommentario("REGLA6");
                }
                if (this.signo == "-") {
                    val = "REGLA7 p - 0 || temp - 0";
                    Optimizacion.generarCommentario("REGLA7");
                }
                Optimizacion.generarCommentario("Codigo Eliminado " + this.dato1.valor + " = " + this.dato2.valor);
                mensage = "Codigo Eliminado " + this.dato1.valor + " = " + this.dato2.valor;
                let optimizacion = {linea : this.line.toString(), columna: this.column.toString(), tipo: val, mensaje: mensage}
                Tabla_Optimizacion.getInstance().push(optimizacion);
            }

            //REGLA 8
            // p * 1 || temp * 1
            //REGLA 9
            // p / 1 || temp / 1
            else if (this.dato3.valor == 1 && this.signo == "*" || this.signo == "/") {
                let val;
                let mensage;
                if (this.signo == "*") {
                    val = "REGLA8 p * 1 || temp * 1";
                    Optimizacion.generarCommentario("REGLA8");
                }
                if (this.signo == "/") {
                    val = "REGLA9 p / 1 || temp / 1";
                    Optimizacion.generarCommentario("REGLA9");
                }
                Optimizacion.generarCommentario("Codigo Eliminado " + this.dato1.valor + " = " + this.dato2.valor);
                mensage = "Codigo Eliminado " + this.dato1.valor + " = " + this.dato2.valor;
                let optimizacion = {linea : this.line.toString(), columna: this.column.toString(), tipo: val, mensaje: mensage};
                Tabla_Optimizacion.getInstance().push(optimizacion);
            } else {
                Optimizacion.agregarC(this.dato1.valor + " = " + this.dato2.valor + " " + this.signo + " " + this.dato3.valor);
            }
        }
        else {

            if (this.dato3.valor == 0 && this.signo == "+" || this.signo == "-") {
                let val;
                let men;
                if (this.signo == "+") {
                    val = "REGLA10";
                    Optimizacion.generarCommentario("REGLA10");
                }
                if (this.signo == "-") {
                    val = "REGLA11";
                    Optimizacion.generarCommentario("REGLA11");
                }
                Optimizacion.generarCommentario("Codigo Optimizacionmizado " + this.dato1.valor + " = " + this.dato2.valor);
                Optimizacion.agregarC(this.dato1.valor + "=" + this.dato2.valor);
                let optimizacion = {linea : this.line.toString(), columna: this.column.toString(), tipo: val, mensaje: "Codigo Optimizacionmizado " + this.dato1.valor + " = " + this.dato2.valor};
                Tabla_Optimizacion.getInstance().push(optimizacion);
            }
            else if (this.dato2.valor == 0 && this.signo == "/") {
                Optimizacion.generarCommentario("REGLA16");
                Optimizacion.generarCommentario("Codigo Optimizacionmizado");
                Optimizacion.agregarC(this.dato1.valor + " = 0");
                let optimizacion = {linea : this.line.toString(), columna: this.column.toString(), tipo: "REGLA 16", mensaje: "Codigo Optimizacionmizado "+this.dato1.valor + " = 0"};
                Tabla_Optimizacion.getInstance().push(optimizacion);
            }
            else if (this.dato3.valor == 1 && this.signo == "*" || this.signo == "/") {
                let val;
                if (this.signo == "*") {
                    val = "REGLA12";
                    Optimizacion.generarCommentario("REGLA12");
                }
                if (this.signo == "/") {
                    val = "REGLA13";
                    Optimizacion.generarCommentario("REGLA13");
                }
                Optimizacion.generarCommentario("Codigo Optimizacionmizado " + this.dato1.valor + " = " + this.dato2.valor);
                Optimizacion.agregarC(this.dato1.valor + "=" + this.dato2.valor);
                let optimizacion = {linea : this.line.toString(), columna: this.column.toString(), tipo: val, mensaje: "Codigo Optimizacionmizado " + this.dato1.valor + " = " + this.dato2.valor};
                Tabla_Optimizacion.getInstance().push(optimizacion);
            }
            else if (this.dato3.valor == 2 && this.signo == "*") {
                Optimizacion.generarCommentario("REGLA14");
                Optimizacion.generarCommentario("Codigo Optimizacionmizado");
                Optimizacion.agregarC(this.dato1.valor + "=" + this.dato2.valor + " + " + this.dato2.valor);
                let optimizacion = {linea : this.line.toString(), columna: this.column.toString(), tipo: "REGLA14", mensaje: "Codigo Optimizacionmizado " + this.dato1.valor + " = " + this.dato2.valor};
                Tabla_Optimizacion.getInstance().push(optimizacion);
            }
            else if (this.dato3.valor == 0 && this.signo == "*") {
                Optimizacion.generarCommentario("REGLA15");
                Optimizacion.generarCommentario("Codigo Optimizacionmizado");
                Optimizacion.agregarC(this.dato1.valor + " = 0");
                let optimizacion = {linea : this.line.toString(), columna: this.column.toString(), tipo: "REGLA15", mensaje: "Codigo Optimizacionmizado "+ this.dato1.valor + " = 0"};
                Tabla_Optimizacion.getInstance().push(optimizacion);
            }
            else
                Optimizacion.agregarC(this.dato1.valor + " = " + this.dato2.valor + " " + this.signo + " " + this.dato3.valor);
        }
    }
}
