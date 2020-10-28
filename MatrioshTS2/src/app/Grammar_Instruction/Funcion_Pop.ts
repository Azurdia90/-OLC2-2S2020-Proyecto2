import Entorno from './Entorno';
import Funcion from './Funcion';
import Instruction from './Instruction';
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tipo from './Tipo';

class Funcion_Pop extends Funcion
{
    private padre : Simbolo;
    
    constructor(p_fila : number, p_columna : number)
    {
        super(p_fila, p_columna, "pop", new Array<Instruction>(), undefined);
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
            _return.setMensaje("Función Pop: no requiere parametros.");
            return _return;
        }    
    }
    
    public analizar(entorno_local : Entorno, salida : Middle) 
    {
        let _return : Simbolo;

        try
        {  
            //console.log(this.padre);
            
            if(this.padre.getRol()== tipo_rol.arreglo)
            {
                var arreglo_tmp: Array<Simbolo>;
                arreglo_tmp = <Array<Simbolo>> this.padre.getMensaje();

                arreglo_tmp.pop();

                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia Pop succesful.");
                return _return;
            }
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia Pop aplica únicamente en arreglos.");
                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error en Sentencia Pop: " + Exception);
            return _return;
        }
    }  

    public getThis() 
    {
        return new Funcion_Pop(this.fila,this.columna);
    }
    
}

export default Funcion_Pop;