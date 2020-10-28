import Entorno from './Entorno';
import Funcion from './Funcion';
import Instruction from './Instruction';
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tipo from './Tipo';

class Funcion_Length extends Funcion
{
    private padre : Simbolo;

    constructor(p_fila : number, p_columna : number)
    {
        super(p_fila, p_columna, "length", new Array<Instruction>(), undefined);
    }

    public pasarParametros(p_padre: Simbolo, lista_parametros_enviados : Array<Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        
        if(lista_parametros_enviados.length == 0)
        {
            this.padre = p_padre;

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna); 
            _return.setMensaje("Paso de Parametros Succesful");
            return _return;
        }
        else
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Función Length: No requiere parametros");
            return _return;
        }      
    }
    
    public analizar(entorno_local: Entorno, salida : Middle) 
    {
        let _return : Simbolo;

        try
        {  
            //console.log(this.padre);
            
            if(this.padre.getRol()== tipo_rol.arreglo)
            {
                var arreglo_tmp: Array<Simbolo>;
                arreglo_tmp = <Array<Simbolo>> this.padre.getMensaje();

                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO), "");
                _return.setMensaje(arreglo_tmp.length);
                return _return;
            }
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia Length aplica únicamente en arreglos.");
                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error en Sentencia Length: " + Exception);
            return _return;
        }
    }  

    public getThis() 
    {
        return new Funcion_Length(this.fila,this.columna);
    }
    
}

export default Funcion_Length;