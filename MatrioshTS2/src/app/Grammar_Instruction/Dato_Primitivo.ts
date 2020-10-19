import Expresion from './Expresion';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from './Instruction';

class Dato_Primitivo extends Expresion
{
    private dimensiones: Array<Instruction>;

    constructor(p_fila : number, p_columna : number, p_tipo : Tipo, p_valor : String, p_dimensiones: Array<Instruction>) {
        super(p_fila, p_columna, tipo_operacion.VALOR, undefined, undefined, p_tipo, p_valor);
        this.dimensiones = p_dimensiones;
    }

    public analizar(entorno: String, entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        let posicion: number
        try
        {   posicion = 0;
            if(this.tipo.getTipo() == tipo_dato.NULO && this.dimensiones.length == 0)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NULO),"");
                _return.setMensaje("null");
                return _return;
            }
            else if(this.tipo.getTipo() == tipo_dato.BOOLEANO && this.dimensiones.length == 0)
            {
                if(this.valor == "true")
                {
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                    _return.setMensaje("true");
                    return _return;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                    _return.setMensaje("false");
                    return _return;
                }
            }
            else if(this.tipo.getTipo() == tipo_dato.NUMERO && this.dimensiones.length == 0)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),"");
                _return.setMensaje(this.valor);
                return _return;
            }
            else if(this.tipo.getTipo() == tipo_dato.CADENA && this.dimensiones.length == 0)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),"");
                _return.setMensaje(this.valor.substring(1,this.valor.length - 1));
                return _return;
            }                
            else if(this.tipo.getTipo() == tipo_dato.IDENTIFICADOR && this.dimensiones.length == 0)
            {   
                if(entorno_padre.has(this.valor))
                {                 
                    _return = entorno_padre.get(this.valor);
                }
                else
                {   
                    _return = Tabla_Simbolos.getInstance().getStack().getSimbolo(this.valor);                    
                }  
                return _return; 
            }
            else if(this.tipo.getTipo() == tipo_dato.IDENTIFICADOR && this.dimensiones.length > 0)
            {   
                var simbolo_tmp : Simbolo;
                posicion = 2;

                if(entorno_padre.has(this.valor))
                {                 
                    simbolo_tmp = entorno_padre.get(this.valor);
                }
                else
                {   
                    simbolo_tmp = Tabla_Simbolos.getInstance().getStack().getSimbolo(this.valor);                    
                }   
                
                if(simbolo_tmp.getRol() == tipo_rol.arreglo)
                {          
                    _return = simbolo_tmp;
                    return _return;
                }
                else if(simbolo_tmp.getRol() == tipo_rol.error)
                {
                    _return = simbolo_tmp;
                    return _return;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Se especificaron dimension(es) de acceso para un No arreglo.");
                    return _return;
                } 
            }                               
            else
            {
                _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No pudo ser reconocido el tipo de dato");
                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error generación de valor Primitivo: " + posicion + " " + Exception.Message);
            return _return;
        }
    }  
    
    public getThis() 
    {
        var clon_dimensiones : Array<Instruction>;
        clon_dimensiones = new Array<Instruction>();
        
        for(var d =0; d < this.dimensiones.length; d++)
        {   
            clon_dimensiones.push(this.dimensiones[d].getThis());
        }

        return new Dato_Primitivo(this.fila, this.columna, this.tipo, this.valor,clon_dimensiones);
    }

}
export default Dato_Primitivo;