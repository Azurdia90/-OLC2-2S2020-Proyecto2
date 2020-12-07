import { Optimizacion } from "./Optimizacion";
import { salto } from "./salto";

export class saltoDeclaracion extends salto {
    private texto = "";
    private id:any;
    constructor(listaId:any, line: number, column: number) {
        super(line, column);
        this.id=listaId;
    }

    public execute() {
    }
}
