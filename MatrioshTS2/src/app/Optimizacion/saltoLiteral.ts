import { salto } from "./salto";

export class saltoLiteral extends salto {
    private texto = "";
    private cad:any;
    public cad2:any;
    public valor:any;

    constructor(cad:any, cad2:any, valor:any, line: number, column: number) {
        super(line, column);
        this.cad = cad;
        this.cad2 = cad2;
        this.valor = valor;
    }

    public execute() {
        return { tipo: this.cad2, valor: this.valor};
    }
}