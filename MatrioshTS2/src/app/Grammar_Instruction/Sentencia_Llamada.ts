import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from './Instruction';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Funcion from './Funcion';
import Middle from './Middle';
import Tipo from './Tipo';

class Sentencia_Llamada extends Instruction
{   
    private identificador : String;
    private funcion_actual : Funcion;
    private lista_parametros : Array<Instruction>;
    private lista_parametros_analizar : Array<Simbolo>;
    private lista_parametros_enviar : Array<Simbolo>;

    private global : Boolean;
    private padre : Simbolo;
      
    public constructor(p_fila : number, p_columna : number, p_identificador : String, p_lista_parametros : Array<Instruction> )
    {
        super(p_fila,p_columna);

        this.identificador = p_identificador;
        this.lista_parametros = p_lista_parametros;
        this.lista_parametros_analizar = new Array<Simbolo>();
        this.lista_parametros_enviar = new Array<Simbolo>();

        this.global = true;
        this.padre = undefined;
    }  
    
    public analizar(entorno_padre : Entorno, nivel : number) 
    {
        let funcion_tmp : Funcion;
        let _return : Simbolo;
        
        try
        {   
            if(this.global)
            {
                funcion_tmp = Tabla_Simbolos.getInstance().getFuncion(this.identificador); 
            }
            else
            {   
                funcion_tmp = this.padre.getFuncion(this.identificador);
                this.global = true;
            }
            //if(this.identificador == "log"){console.log(funcion_actual);}
            if(funcion_tmp == undefined || funcion_tmp == null)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia Llamada: Funcion " + this.identificador + " no existe.");
                return _return;            
            }                        
             
            for(var x : number = 0; x < this.lista_parametros.length; x++)
            {
                var tmp_val : Simbolo = this.lista_parametros[x].analizar(entorno_padre, nivel);

                if (tmp_val == null)
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Sentencia Llamada: Parametro Nulo");
                    return _return;
                }

                if(tmp_val.getRol() != tipo_rol.valor && tmp_val.getRol() != tipo_rol.arreglo && tmp_val.getRol() != tipo_rol.type)
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    this.lista_parametros_analizar = new Array<Simbolo>();
                    return tmp_val;
                }
                
                this.lista_parametros_analizar.push(tmp_val);
            }       

            var _result :  Simbolo = funcion_tmp.pasarParametros(this.padre,this.lista_parametros_analizar);
            
            this.lista_parametros_analizar = new Array<Simbolo>();
            
            if(_result.getRol() != tipo_rol.aceptado)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                return _result;
            }
                                    
            _return = funcion_tmp.analizar(entorno_padre, nivel);
            
            this.entorno_padre = entorno_padre;
            this.funcion_actual = funcion_tmp;
            this.nivel = nivel;

            return _return;            
        }
        catch(Exception)
        {
            this.entorno_padre = entorno_padre;
            this.nivel = nivel;
            
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Sentencia Llamada: " + Exception.Message);
            return _return;
        } 
       
    }

    public traducir(salida : Middle) 
    {
        let _return : Simbolo;
        
        try
        {   
            //Obtener valores a pasar
            for(var x : number = 0; x < this.lista_parametros.length; x++)
            {
                var tmp_val : Simbolo = this.lista_parametros[x].traducir(salida);
                
                this.lista_parametros_enviar.push(tmp_val);
            }       
            //Paso de parametros
            this.funcion_actual.pasarParametros(this.padre,this.lista_parametros_enviar);
            
            this.lista_parametros_enviar = new Array<Simbolo>();
            //Traduccion de la llamada al metodo                      
            _return = this.funcion_actual.traducir(salida);
           
            return _return;            
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("Error Sentencia Llamada: " + Error.Mesage);  
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