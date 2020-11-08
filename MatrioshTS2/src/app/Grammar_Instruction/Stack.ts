import Tipo from './Tipo';
import Entorno from './Entorno';
import Simbolo from "./Simbolo";
import SubStack from './SubStack';
import SubEntorno from './SubEntorno';
import Funcion_Log from './Funcion_Log';

class Stack extends Array<SubStack>
{
    //este objeto tiene metodo pop para
    //Eliminar el ultimo de la lista

    //este objeto tiene metodo push para
    //Eliminar el ultimo de la lista

    public _push(p_fila : number, p_columna : number, p_substack : SubStack, p_entorno?: String)
    {
        let object_console : Simbolo;
        let funcion_log : Funcion_Log;
        let entorno_global : Entorno;
        let subEntorno_global : SubEntorno;

        entorno_global = new Entorno(p_substack);
        subEntorno_global = new SubEntorno(p_entorno != undefined ? p_entorno + "_global" : "global");
        entorno_global._push(subEntorno_global);
        p_substack.push(entorno_global);
        this.push(p_substack);

        object_console = new Simbolo(tipo_rol.type, new Tipo(tipo_dato.IDENTIFICADOR,"console"), "console");
        funcion_log = new Funcion_Log(p_fila,p_columna)

        object_console.getListaFunciones().push(funcion_log);

        subEntorno_global.set("console",object_console);   
    }

}

export default Stack;