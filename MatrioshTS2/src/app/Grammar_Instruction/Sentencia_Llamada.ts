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
        let etapa   : number;
        try
        {   etapa = 1;
            if(this.global)
            {
                funcion_tmp = Tabla_Simbolos.getInstance().getFuncion(this.identificador); 
            }
            else
            {   
                funcion_tmp = this.padre.getFuncion(this.identificador);
                this.global = true;
            }
            etapa = 2;
            //if(this.identificador == "sentencias"){console.log(funcion_tmp);}
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
            etapa = 3;
            var _result :  Simbolo = funcion_tmp.pasarParametros(this.padre,this.lista_parametros_analizar);
            
            this.lista_parametros_analizar = new Array<Simbolo>();
            //console.log(_result);
            if(_result.getRol() != tipo_rol.aceptado)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                return _result;
            }
            etapa = 4;        

            if(this.identificador == "log" || this.identificador == "length" || this.identificador == "push" || this.identificador == "pop")
            {
                _return = funcion_tmp.analizar(entorno_padre, nivel);
            }
            else
            {
                if(funcion_tmp.getTipo() == undefined)
                {
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.VOID), "");
                }
                else
                {
                    _return = new Simbolo(tipo_rol.valor,funcion_tmp.getTipo(), "");
                }
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia Llamada succesful");  
            }
            
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
            _return.setMensaje("Error Sentencia Llamada (a" + etapa + "): " + Exception.Message);
            return _return;
        } 
       
    }

    public traducir(salida : Middle) 
    {
        let _return : Simbolo;
        let etapa : number;
        try
        {   etapa = 1; 
            let lista_parametros1 = new Array<Simbolo>();
            let lista_parametros2 = new Array<Simbolo>();

            //Obtener valores a pasar

            for(var y : number = 0; y < this.lista_parametros.length; y++)
            {
                if(this.lista_parametros[y] instanceof Sentencia_Llamada)
                {
                    var tmp_val : Simbolo = this.lista_parametros[y].traducir(salida);
                    //if(this.identificador == 'log'){console.log(tmp_val)};
                    lista_parametros2.push(tmp_val);
                }
            }

            for(var x : number = 0; x < this.lista_parametros.length; x++)
            {
                if(!(this.lista_parametros[x] instanceof Sentencia_Llamada))
                {
                    var tmp_val : Simbolo = this.lista_parametros[x].traducir(salida);
                    //if(this.identificador == 'figura1'){console.log(tmp_val)};
                    lista_parametros1.push(tmp_val);
                }
                
            }   

            let cont1 = 0;
            let cont2 = 0;
          
            for(var p = 0; p < this.lista_parametros.length; p++)
            {
                if(!(this.lista_parametros[p] instanceof Sentencia_Llamada))
                {
                    this.lista_parametros_enviar.push(lista_parametros1[cont1]);
                    cont1 = cont1 + 1;
                }    
                else
                {
                    this.lista_parametros_enviar.push(lista_parametros2[cont2]);
                    cont2 = cont2 + 1;
                }                    
            }

            //if(this.identificador == 'figura1'){console.log(this.funcion_actual);console.log(this.lista_parametros_enviar)};  
            ////Paso de parametros
            this.funcion_actual.pasarParametrosT(salida,this.lista_parametros_enviar);
            etapa = 2; 
            //Traduccion de la llamada al metodo     
            if(this.identificador == "log" || this.identificador == "length" || this.identificador == "push" || this.identificador == "pop")
            {
                _return = this.funcion_actual.traducir(salida);
            }                 
            else
            {
                let tamaño_ambito_actual = this.entorno_padre.getSize();
                let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                
                Middle.getInstance().setOuput(temporal_contador + " = P + " +  tamaño_ambito_actual + ";");
                Middle.getInstance().setOuput(temporal_simulado + " = " + temporal_contador + " + 0;");
                Middle.getInstance().setOuput("Stack[(int)" + temporal_simulado + "] = -1;");
                Middle.getInstance().setOuput(temporal_simulado + " = " + temporal_contador + " + 1;");
                Middle.getInstance().setOuput("Stack[(int)" + temporal_simulado + "] = -1;");   

                for(var p = 0; p < this.lista_parametros_enviar.length; p++)
                {
                    Middle.getInstance().setOuput(temporal_simulado + " = " + temporal_contador + " + " + (2+p) + ";");
                    Middle.getInstance().setOuput("Stack[(int)" + temporal_simulado + "] = " + this.lista_parametros_enviar[p].getMensaje() + ";");
                }                

                Middle.getInstance().setOuput("P = P + " + tamaño_ambito_actual + ";");
                Middle.getInstance().setOuput(this.funcion_actual.getIdentificador() + "();");
                Middle.getInstance().setOuput(temporal_contador + " = P + 0;");
                Middle.getInstance().setOuput(temporal_simulado + " = " + temporal_contador + " + 1;");
                Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_simulado + "];");
                Middle.getInstance().setOuput("P = P - " + tamaño_ambito_actual + ";");
                
                _return = new Simbolo(tipo_rol.valor,this.funcion_actual.getTipo(),"10-4"); 
                _return.setColumna(this.columna);
                _return.setFila(this.fila);
                _return.setMensaje(temporal_retorno);
            }
            etapa = 3;
            this.lista_parametros_enviar = new Array<Simbolo>();

            return _return;            
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Sentencia Llamada (t"+ etapa +"): " + Error.Mesage);  
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

    public getIdentificador()
    {
        return this.identificador;
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