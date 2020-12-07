import { Optimizacion } from "./Optimizacion";
import { salto } from "./salto";

export class saltoIncondicional extends salto {
    private texto = "";
    private etiq:any;
    constructor(etiqueta:any, line: number, column: number) {
        super(line, column);
        this.etiq = etiqueta;
    }

    public execute() {
        Optimizacion.agregarC("goto "+this.etiq);
    }
}
