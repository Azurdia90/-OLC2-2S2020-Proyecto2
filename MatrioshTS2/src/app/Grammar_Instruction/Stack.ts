import Entorno from './Entorno';
import Funcion_Log from './Funcion_Log';
import Simbolo from "./Simbolo";
import Tipo from './Tipo';

class Stack extends Array<Entorno>
{
    //este objeto tiene metodo pop para
    //Eliminar el ultimo de la lista

    //este objeto tiene metodo push para
    //Eliminar el ultimo de la lista

    private ambito: String;
    private subambito: String;

    public getambito()
    {
        return this.ambito;
    }

    public setambito(p_ambito: String)
    {
        this.ambito = p_ambito;
    }

    public getSubambito()
    {
        return this.subambito;
    }

    public setSubambito(p_subambito: String)
    {
        this.subambito = p_subambito;
    }

    public _push(p_fila : number, p_columna : number, p_entorno_actual : Entorno)
    {
        var object_console :Simbolo;
        object_console = new Simbolo(tipo_rol.type, new Tipo(tipo_dato.IDENTIFICADOR,"console"), "console");
        
        var funcion_log : Funcion_Log;
        funcion_log = new Funcion_Log(p_fila,p_columna)

        object_console.getListaFunciones().push(funcion_log);
        p_entorno_actual.set("console",object_console);

        this.push(p_entorno_actual);
    }

    public existsSimbolo(key : String)
    {
        let _return : Boolean = false;
        
        for(var x : number = (this.length -1); x >= 0; x--)
        { 
            let entorno_local : Map<String,Simbolo> = this[x];
            if(entorno_local.has(key))
            {
                return true;
            }            
        }        
        return _return;
    }
    
    public getSimbolo(key : String)
    {
        let _return : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
        _return.setMensaje("El valor no existe en ningun ámbito");
        
        for(var x : number = (this.length -1); x >= 0; x--)
        { 
            let entorno_local : Map<String,Simbolo> = this[x];
            if(entorno_local.has(key))
            {
                _return = entorno_local.get(key);
                break;
            }            
        }        
        return _return;
    }
}

export default Stack;