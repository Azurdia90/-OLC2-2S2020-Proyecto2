import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Funcion from './Funcion';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo from './Tipo';
import Middle from './Middle';

class Sentencia_Llamada extends Instruction
{   
    private identificador : String;
    private lista_parametros : Array<Instruction>;
    private lista_parametros_enviar : Array<Simbolo>;

    private global : Boolean;
    private padre : Simbolo;
      
    public constructor(p_fila : number, p_columna : number, p_identificador : String, p_lista_parametros : Array<Instruction> )
    {
        super(p_fila,p_columna);

        this.identificador = p_identificador;
        this.lista_parametros = p_lista_parametros;
        this.lista_parametros_enviar = new Array<Simbolo>();

        this.global = true;
        this.padre = undefined;
    }  
    
    public analizar(entorno: String, entorno_padre : Map<String, Simbolo> , salida : Middle) 
    {
        let funcion_actual : Funcion;
        let _return : Simbolo;
        
        try
        {   
            if(this.global)
            {
                funcion_actual = Tabla_Simbolos.getInstance().getFuncion(this.identificador); 
            }
            else
            {
                funcion_actual = this.padre.getFuncion(this.identificador);
                this.global = true;
            }
            //if(this.identificador == "relaciones1"){console.log(funcion_actual);}
            if(funcion_actual == undefined || funcion_actual == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia Llamada: Funcion " + this.identificador + " no existe.");
                return _return;            
            }                        
             
            for(var x : number = 0; x < this.lista_parametros.length; x++)
            {
                var tmp_val : Simbolo = this.lista_parametros[x].analizar(entorno, entorno_padre, salida);

                if (tmp_val == null)
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Sentencia Llamada: Parametro Nulo");
                    return _return;
                }

                if(tmp_val.getRol() != tipo_rol.valor && tmp_val.getRol() != tipo_rol.arreglo && tmp_val.getRol() != tipo_rol.type)
                {
                    this.lista_parametros_enviar = new Array<Simbolo>();
                    return tmp_val;
                }
                
                this.lista_parametros_enviar.push(tmp_val);
            }       

            var _result :  Simbolo = funcion_actual.pasarParametros(this.padre,this.lista_parametros_enviar,salida);
            
            this.lista_parametros_enviar = new Array<Simbolo>();
            
            if(_result.getRol() != tipo_rol.aceptado)
            {
                return _result;
            }
                                    
            _return = funcion_actual.analizar(entorno,entorno_padre, salida);
           
            return _return;            
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Sentencia Llamada: " + Exception.Message);
            return _return;
        } 
       
    }

    public setGlobal(global : Boolean)
    {
        this.global = global;
    }
    
    public setPadre(padre : Simbolo)
    {
        this.padre = padre;
    }

    public getThis() 
    {
        var lista_clon : Array<Instruction> =  new Array<Instruction>();
        
        for(var x = 0; x < this.lista_parametros.length; x++)
        {
            lista_clon.push(this.lista_parametros[x].getThis());
        }
        
        return new Sentencia_Llamada(this.fila,this.columna,this.identificador,lista_clon);
    }
}

export default Sentencia_Llamada;