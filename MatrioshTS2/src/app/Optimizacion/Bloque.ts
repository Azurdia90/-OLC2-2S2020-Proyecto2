export class Bloque{

    public arregloInstrucciones = new Array();
    public siguiente:Bloque;

    public agregar(nuevo:any){
        this.arregloInstrucciones.push(nuevo);
    }

    public enlazar(nuevo:Bloque){
        this.siguiente = nuevo;
    }
}