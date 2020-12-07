import { Bloque } from './Bloque';

export class BloqueP{

    public arregloDeBloques = new Array();
    public id = "";

    public agregarNombre(nuevo:string){
        this.id = nuevo;
    }

    public nuevoBloque(nuevo:any){
        this.arregloDeBloques.push(nuevo);
    }
    
    public getBloque(){
        return this.arregloDeBloques;
    }


}