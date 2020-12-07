import { salto } from "./salto";

export class saltoGetEdd extends salto {
    private texto = "";
    private dato:any;
    private edd:any;
    private dato2:any;


    constructor(tipoDato:any, edd:any, tipoDato2:any,line: number, column: number) {
        super(line, column);
        this.dato=tipoDato;
        this.edd = edd;
        this.dato2=tipoDato2;
    }

    public execute() {
        /*
        OPTI.sacarP();
        OPTI.sacarH();
        */
       console.log(this.edd);
    }
}
