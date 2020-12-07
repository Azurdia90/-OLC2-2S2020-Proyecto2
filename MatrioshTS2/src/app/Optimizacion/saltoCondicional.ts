import { Optimizacion } from "./Optimizacion";
import { salto } from "./salto";

export class saltoCondicional extends salto {
    private texto = "";
    public dato:any;
    public signo:any;
    public dato2:any;
    public etV:any;

    constructor(tipoDato:any, signo:any, tipoDato2: any, etiquetaV:any, line: number, column: number) {
        super(line, column);
        this.dato = tipoDato;
        this.signo = signo;
        this.dato2 = tipoDato2;
        this.etV = etiquetaV;
    }

    public execute() {
        this.dato.execute();
        this.dato2.execute();
        Optimizacion.agregarIfGoto(this.dato.valor,this.signo,this.dato2.valor,this.etV);
    }
}
