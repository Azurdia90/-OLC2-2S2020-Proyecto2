export class grafica {
    private contador: any;
    private grafo: any;

    constructor() {
    }

    public getDOT(raiz: any) {
        this.grafo = "";
        this.contador = 0;
        this.grafo = "digraph G{";
        this.grafo += "nodo0[label=\"" + raiz.nombre + "\"];\n";
        this.contador = 1;
        this.recorrerAST("nodo0", raiz);
        this.grafo += "}";

        return this.grafo;
    }

    public recorrerAST(padre: any, hijos: any) {
        if (hijos != null) {
            if (hijos.hijos != null) {
                var a = hijos.hijos.length;
                for (const x of hijos.hijos) {
                    var nombreHijo = "nodo" + this.contador;
                    this.grafo += nombreHijo + "[label=\"" + x.nombre + "\"];\n";
                    this.grafo += padre + "->" + nombreHijo + ";\n";
                    this.contador++;
                    this.recorrerAST(nombreHijo, x);
                }
            }
        }
    }
}