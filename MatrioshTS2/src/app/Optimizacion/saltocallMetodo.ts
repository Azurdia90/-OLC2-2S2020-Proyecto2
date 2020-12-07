import { Optimizacion } from "./Optimizacion";
import { salto } from "./salto";

export class saltocallMetodo extends salto {
    private texto = "";
    private ide:any;

    constructor(identificador:any, line: number, column: number) {
        super(line, column);
        this.ide  = identificador;

    }

    public execute() {
        Optimizacion.agregarC("call "+this.ide);
    }
}
