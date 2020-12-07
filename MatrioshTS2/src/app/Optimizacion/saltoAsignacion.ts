import { Optimizacion } from "./Optimizacion";
import { salto } from "./salto";

export class saltoAsignacion extends salto {
    private texto = "";
    private dato: any;
    private dato2: any;
    constructor(tipoDato: any, tipoDato2: any, line: number, column: number) {
        super(line, column);
        this.dato = tipoDato;
        this.dato2 = tipoDato2;
    }

    public execute() {
        Optimizacion.agregarC(this.dato.valor + " = " + this.dato2.valor);
    }
}
