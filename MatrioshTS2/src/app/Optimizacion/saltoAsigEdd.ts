import { salto } from "./salto";

export class saltoAsigEdd extends salto {
    private texto = "";
    private edd:any;
    private tipo:any;
    private resul:any;
    constructor(edd:any, tipoDato: any, tipoResultado: any, line: number, column: number) {
        super(line, column);
        this.edd = edd;
        this.tipo = tipoDato;
        this.resul = tipoResultado;
    }

    public execute() {
        

    }
}
