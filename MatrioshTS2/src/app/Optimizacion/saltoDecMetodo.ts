import { salto } from "./salto";

export class saltoDecMetodo extends salto {
    private texto = "";
    public ide: any;
    public lista: any;

    constructor(ide: any, listaInstru: any, line: number, column: number) {
        super(line, column);
        this.ide = ide;
        this.lista = listaInstru;
    }

    public execute() {
        let i=0;
        for (let x of this.lista) {
            console.log(i);
            x.execute();
            i++;
        }
    }
}
