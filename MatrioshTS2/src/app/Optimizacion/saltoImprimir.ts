import { Optimizacion } from "./Optimizacion";
import { salto } from "./salto";

export class saltoImprimir extends salto {
    private texto = "";
    private dato: any;
    private cad: any; 
    private dato2: any;

    constructor(tipoDato: any, cad: any, tipoDato2: any, line: number, column: number) {
        super(line, column);
        this.dato = tipoDato;
        this.cad = cad;
        this.dato2 = tipoDato2;
    }

    public execute() {
        Optimizacion.agregarC("printf(\"" + this.dato + "\"," + this.dato2.valor + ")");
    }
}
