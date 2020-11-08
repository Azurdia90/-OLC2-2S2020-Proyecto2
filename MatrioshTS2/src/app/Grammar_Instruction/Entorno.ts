import SubEntorno from './SubEntorno';
import SubStack from './SubStack';
import Simbolo from "./Simbolo";
import Tipo from './Tipo';

class Entorno extends Array<SubEntorno>
{
    private padre: SubStack;
    private nivel: number;

    constructor(p_padre: SubStack)
    {
        super();
        this.padre = p_padre;
        this.nivel = -1;
    }

    public getPadre()
    {
        return this.padre;
    }

    public getSize()
    {
        return this.padre.getSize();
    }

    public _push(entorno_actual : SubEntorno)
    {
        this.push(entorno_actual);
        this.nivel = this.nivel + 1;
    }
    
    public getLastNivel()
    {
        return this.nivel;
    }

    public existsSimbolo(key : String, nivel? : number)
    {
        let _return : Boolean = false;
        let entorno_local : SubEntorno;

        if(this.length > 0)
        {
            if(nivel == undefined)
            {
                for(var x : number = this.length-1; x >= 0; x--)
                {   //if(key == "hola"){console.log(this[x])}
                    entorno_local  = this[x];
                    if(entorno_local.has(key))
                    {
                        return true;
                    }            
                }  
            }
            else
            {   //if(key == "hola"){console.log(this[nivel])}
                for(var x : number = nivel; x >= 0; x--)
                { 
                    entorno_local  = this[x];
                    if(entorno_local.has(key))
                    {
                        return true;
                    }
                } 
            }
        }
 
        let ambito_global = this.padre[0];
        let entorno_global = ambito_global[0];
        //if(key == "hola"){console.log(entorno_global)}
        if(entorno_global.has(key))
        {
            return true;
        }          

        return _return;
    }
    
    public getSimbolo(key : String, nivel? : number)
    {
        let entorno_local : SubEntorno;
        let _return : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
        _return.setMensaje("El valor \"" + key + "\" no existe en el ámbito actual");

        if(this.length > 0)
        {
            if(nivel == undefined)
            {
                for(var x : number = this.length -1; x >= 0; x--)
                { 
                    entorno_local = this[x];
                    if(entorno_local.has(key))
                    {
                        return entorno_local.get(key);
                    }            
                }  
            }
            else
            {   
                for(var x : number = nivel; x >= 0; x--)
                { 
                    entorno_local = this[x];
                    if(entorno_local.has(key))
                    {
                        return entorno_local.get(key);
                    }  
                }
            }
        }

        let ambito_global  = this.padre[0];
        let entorno_global = ambito_global[0];

        if(entorno_global.has(key))
        {
            return entorno_global.get(key);
        }    
        
        return _return;
    }

    public set_e(identificador: String, new_simbol: Simbolo)
    {
        let subentorno =  this[this.length -1];

        new_simbol.setPos_S(this.padre.getPos_Stack());
        subentorno.set(identificador, new_simbol);
    }   
}

export default Entorno;