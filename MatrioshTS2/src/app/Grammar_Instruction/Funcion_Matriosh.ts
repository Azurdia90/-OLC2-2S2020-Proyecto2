import Sentencia_Declaracion from './Sentencia_Declaración';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tabla_Errores from './Tabla_Errores';
import Instruction from './Instruction';
import SubEntorno from './SubEntorno';
import SubStack from './SubStack';
import Entorno from './Entorno';
import Funcion from "./Funcion";
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Funcion_Log from './Funcion_Log';

class Funcion_MatrioshTS extends Funcion
{
    constructor(p_fila : number, p_columna : number, p_id : String, p_lista_parametros : Array<Instruction>, p_lista_sentencias : Array<Instruction>, p_tipo? : Tipo)
    {
        super(p_fila, p_columna, p_id, p_lista_parametros, p_lista_sentencias);
        this.tipo = p_tipo;
        this.substack = new SubStack(this.identificador);
        Tabla_Simbolos.getInstance().getStack()._push(this.fila,this.columna,this.substack,this.identificador);       
        this.entorno_padre = this.substack[0];
    }
    
    public getFila()
    {
        return this.fila;
    }

    public getColumna()
    {
        return this.columna;
    }

    public getTipo()
    {
        return this.tipo;
    }

    public getIdentificador()
    {
        return this.identificador_3D;
    }

    public pasarParametros(p_padre: Simbolo, lista_parametros_enviados : Array<Simbolo>)
    {
        let _return : Simbolo;
                      
        _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4");
        _return.setFila(this.fila);
        _return.setColumna(this.columna); 
        _return.setMensaje("Paso de Parametros Succesful");
        return _return;
    }

    public pasarParametrosT(salida: Middle, lista_parametros_enviados : Array<Simbolo>)
    {
        let _return : Simbolo;

        _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4");
        _return.setFila(this.fila);
        _return.setColumna(this.columna); 
        _return.setMensaje("Paso de Parametros Traducidos Succesful");
        return _return;
    }

    public analizar(entorno_padre : Entorno, nivel : number) 
    {
        let _return : Simbolo;

        try
        {
            var _tmp_return : Simbolo;
            //ANALISIS DE DECLARACION DE PARAMETRO
            for(var x = 0; x < this.lista_parametros.length; x++)
            {
                var declaracion_actual : Sentencia_Declaracion = <Sentencia_Declaracion> this.lista_parametros[x];

                var _result : Simbolo = declaracion_actual.analizar(this.entorno_padre, this.entorno_padre.getLastNivel());

                if(_result.getRol() != tipo_rol.aceptado)
                {
                    return _result;
                } 
            }
            //console.log("Se analizara una funcion con ambito global: " + this.entorno_local);
            //console.log(this.entorno_local);
            //ANALISIS DE DECLARACION VARIABLES GLOBALES
            for(var y = 0; y < this.lista_sentencias.length; y++)            
            {
                if(this.lista_sentencias [y] instanceof Sentencia_Declaracion)
                {
                    _tmp_return = this.lista_sentencias[y].analizar(this.entorno_padre, this.entorno_padre.getLastNivel());
                }
                else
                {
                    continue
                }

                if (_tmp_return.getRol() == tipo_rol.error)
                {
                    let error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _tmp_return.getFila() == undefined ? "0" : _tmp_return.getFila().toString(), columna: _tmp_return.getColumna() == undefined  ? "0" : _tmp_return.getColumna().toString(), identificador: this.identificador, descripcion: _tmp_return.getMensaje().toString()};
                    Tabla_Errores.getInstance().push(error_encontrado);    
                                 
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NULO), "");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("null");  
                }
                else
                {      
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NULO), "");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("null");   
                }                
            }

            //ANALISIS DEL RESTO DE CODIGO
            for(var z = 0; z < this.lista_sentencias.length; z++)            
            {
                if(!(this.lista_sentencias [z] instanceof Sentencia_Declaracion))
                {
                    _tmp_return = this.lista_sentencias[z].analizar(this.entorno_padre, this.entorno_padre.getLastNivel());
                }
                else
                {
                    continue
                }
                if(_tmp_return == undefined && this.identificador == "figura1"){console.log(this.lista_sentencias[y])}
                if (_tmp_return.getRol() == tipo_rol.error)
                {
                    let error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _tmp_return.getFila() == undefined ? "0" : _tmp_return.getFila().toString(), columna: _tmp_return.getColumna() == undefined  ? "0" : _tmp_return.getColumna().toString(), identificador: this.identificador, descripcion: _tmp_return.getMensaje().toString()};
                    Tabla_Errores.getInstance().push(error_encontrado);                  
                }
                else if (_tmp_return.getRol() == tipo_rol.detener)
                {
                    let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _tmp_return.getFila() == undefined ? "0" : _tmp_return.getFila().toString(), columna: _tmp_return.getColumna() == undefined  ? "0" : _tmp_return.getColumna().toString(), identificador: this.identificador, descripcion: "Error en Funcion: No se permite el uso de sentencia Break"};
                    Tabla_Errores.getInstance().push(error_encontrado);     
                }
                else if(_tmp_return.getRol() == tipo_rol.continuar)
                {
                    let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _tmp_return.getFila() == undefined ? "0" : _tmp_return.getFila().toString(), columna: _tmp_return.getColumna() == undefined  ? "0" : _tmp_return.getColumna().toString(), identificador: this.identificador, descripcion: "Error en Funcion: No se permite el uso de sentencia Continue"};
                    Tabla_Errores.getInstance().push(error_encontrado);  
                }
                else if(_tmp_return.getRol() == tipo_rol.retornar) 
                {                                                           
                    _return = <Simbolo> _tmp_return.getMensaje();              
                    if(this.tipo == undefined)
                    {
                        this.tipo = _return.getTipo();
                    }
                }
                else
                {      
                    _return = new Simbolo(tipo_rol.valor,this.tipo, "");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Ejecucion Funcion succesful");   
                }                
            }
          
            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Funcion " + this.identificador + " : " + Exception);
            return _return;        
        }
    } 

    public traducir(salida : Middle) 
    {
        let _return : Simbolo;
        let etapa : number;
        try
        {
            var _tmp_return : Simbolo;
            //consolo.log("Se entro a un metodo cantidad de ambitos: " + Tabla_Simbolos.getInstance().getStack().size());
            etapa=1;
            Middle.getInstance().setOuput("void " + this.identificador_3D + "()");
            Middle.getInstance().setOuput("{\n");
            //ANALISIS DE DECLARACION
            for(var x = 0; x < this.lista_sentencias.length; x++)            
            {
                if(this.lista_sentencias [x] instanceof Sentencia_Declaracion)
                {
                    _tmp_return = this.lista_sentencias[x].traducir(salida);
                }
                else
                {
                    continue
                }

                if (_tmp_return.getRol() == tipo_rol.error)
                {
                    Middle.getInstance().clear3D();
                    Middle.getInstance().setOuput( "// Error en función " + this.identificador + ", tipo:Análisis Semántico MatrioshTS, fila:" + _tmp_return.getFila() == undefined ? "0" : _tmp_return.getFila().toString() + ", columna: " + _tmp_return.getColumna() == undefined  ? "0" : _tmp_return.getColumna().toString() + ", descripcion: " + _tmp_return.getMensaje().toString());   
                }                
            }
            etapa = 2;
            //ANALISIS DEL RESTO DE CODIGO
            for(var y = 0; y < this.lista_sentencias.length; y++)            
            {
                if(!(this.lista_sentencias[y] instanceof Sentencia_Declaracion))
                {
                    _tmp_return = this.lista_sentencias[y].traducir(salida);
                }
                else
                {
                    continue
                }
                if(_tmp_return == undefined && this.identificador == "figura1"){console.log(this.lista_sentencias[y])}
                if (_tmp_return.getRol() == tipo_rol.error)
                {
                    Middle.getInstance().clear3D();
                    Middle.getInstance().setOuput( "// Error en función " + this.identificador + ", tipo:Análisis Semántico MatrioshTS, fila:" + _tmp_return.getFila() == undefined ? "0" : _tmp_return.getFila().toString() + ", columna: " + _tmp_return.getColumna() == undefined  ? "0" : _tmp_return.getColumna().toString() + ", descripcion: " + _tmp_return.getMensaje().toString());   
                }               
            }
            
            etapa = 3;
            Middle.getInstance().setOuput("}\n");

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4"); 
            _return.setMensaje("Traducción de Metodo Succesful");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            return _return;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Funcion " + this.identificador + " (t" + etapa + "): " +  Error.Mesage);
        }
    } 

    public getThis()
    {
        var clon_lista_parametros : Array<Instruction>  = new Array<Instruction>();
        var clon_lista_sentencias : Array<Instruction>  = new Array<Instruction>();
        //if(this.identificador == "swap"){console.log(this.lista_parametros);}
        for(var x = 0; x < this.lista_parametros.length; x++)
        {   //if(this.identificador == "swap"){console.log(this.lista_parametros[x].getThis());}
            clon_lista_parametros.push(this.lista_parametros[x].getThis());
        }
        //if(this.identificador == "swap"){console.log(this.lista_sentencias);}
        for(var y = 0; y < this.lista_sentencias.length; y++)
        {   //if(this.identificador == "swap"){console.log(this.lista_sentencias[y].getThis());}
            clon_lista_sentencias.push(this.lista_sentencias[y].getThis());
        }
        
        return new Funcion_MatrioshTS(this.fila,this.columna,this.identificador,clon_lista_parametros,clon_lista_sentencias);
    }
}

export default Funcion_MatrioshTS;