import Expresion from './Expresion';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from './Instruction';
import Entorno from './Entorno';

class Dato_Primitivo extends Expresion
{
    private dimensiones: Array<Instruction>;

    constructor(p_fila : number, p_columna : number, p_tipo : Tipo, p_valor : String, p_dimensiones: Array<Instruction>) {
        super(p_fila, p_columna, tipo_operacion.VALOR, undefined, undefined, p_tipo, p_valor);
        this.dimensiones = p_dimensiones;
    }

    public analizar(entorno_padre : Entorno, salida : Middle)
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

    public traducir(entorno_padre : Entorno, salida : Middle)
    {
        let _return : Simbolo;
        let posicion: number
        try
        {   
            posicion = 0;
            if(this.tipo.getTipo() == tipo_dato.NULO && this.dimensiones.length == 0)
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NULO),"");
                _return.setMensaje("-27");
                return _return;
            }
            else if(this.tipo.getTipo() == tipo_dato.BOOLEANO && this.dimensiones.length == 0)
            {
                if(this.valor == "true")
                {
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                    _return.setMensaje("1");
                    return _return;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                    _return.setMensaje("0");
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
                var cadena = this.valor;
                var temporal_pos_heap =  "t" + Tabla_Simbolos.getInstance().getTemporal();;
                var temporal_pos_heap_aux =  "t" + Tabla_Simbolos.getInstance().getTemporal();;

                Middle.getInstance().setOuput("\n");
                Middle.getInstance().setOuput(temporal_pos_heap + " =  H;");
                
                for(var i = 0; i < cadena.length; i++)
                {
                    var caracter= cadena.charCodeAt(i);
                    Middle.getInstance().setOuput("Heap[(int)H] = " + caracter + ";");
                    Middle.getInstance().setOuput("H = H + 1;");                    
                }

                Middle.getInstance().setOuput("Heap[(int)H] = 3;");
                Middle.getInstance().setOuput("H = H + 1;");

                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),"");
                _return.setMensaje(temporal_pos_heap);
                _return.getListaDimensiones().push(cadena.length);
                return _return;
            }                
            else if(this.tipo.getTipo() == tipo_dato.IDENTIFICADOR && this.dimensiones.length == 0)
            {   
                let retorno = entorno_padre.get(this.valor);

                var temporal_posicion_stack = "t" + Tabla_Simbolos.getInstance().getTemporal();
                var temporal_acceso = "t" + Tabla_Simbolos.getInstance().getTemporal();
                
                Middle.getInstance().setOuput("\n");
                Middle.getInstance().setOuput(temporal_posicion_stack +  " = P + " + retorno.getPos_S() + ";");
                Middle.getInstance().setOuput(temporal_acceso + " = Stack[(int)" + temporal_posicion_stack + "];"); 

                _return = new Simbolo(retorno.getRol(),retorno.getTipo(),"");
                _return.setMensaje(temporal_acceso);
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
                else
                {
                    _return = simbolo_tmp;
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
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("Error Dato Primitivo: " + Error.Mesage);
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