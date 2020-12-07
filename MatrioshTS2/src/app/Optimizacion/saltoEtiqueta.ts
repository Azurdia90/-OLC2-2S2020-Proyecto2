import { Optimizacion } from "./Optimizacion";
import { salto } from "./salto";

export class saltoEtiqueta extends salto {
    private texto = "";
    private etiq:any;

    constructor(etiq:any,line: number, column: number) {
        super(line, column);
        this.etiq = etiq;
    }

    public execute() {
        Optimizacion.agregarLabel(this.etiq);
    }
}
