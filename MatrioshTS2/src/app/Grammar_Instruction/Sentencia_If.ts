import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from "./Instruction";
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import SubEntorno from './SubEntorno';

class Sentencia_If extends Instruction
{
    private identificador1: String;
    private identificador2: String;

    private sentencia_comparacion: Instruction;
    private lista_sentencias_if: Array<Instruction>;
    private lista_else_if: Array<Instruction>;
    private lista_sentencias_else: Array<Instruction>;

    /*MEMORIA TRADUCCION*/
    //private valor_comparcion: Instruction;   

    constructor(p_linea: number, p_columna : number , p_sentencia_comparacion : Instruction, p_lista_sentencias : Array<Instruction>, p_lista_else_if?: Array<Instruction>, p_else?: Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.sentencia_comparacion = p_sentencia_comparacion;  

        this.lista_sentencias_if = p_lista_sentencias;
        this.lista_else_if = p_lista_else_if;
        this.lista_sentencias_else = p_else;
    }

    public analizar(entorno_padre : Entorno, nivel: number)
    {   let cont_if : number, etapa : number;
        let _return : Simbolo;
        let tmp_val : Simbolo;
        try
        {   etapa = 0;
            cont_if = entorno_padre.getPadre().getPos_if();  
            this.identificador1 = "if" + cont_if;
            this.identificador2 = "else" + cont_if;
            
            tmp_val = (this.sentencia_comparacion == null) ? null : this.sentencia_comparacion.analizar(entorno_padre, nivel);
            
            if (tmp_val == null)
            {
                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia If: Expresión comparación vacia");
                return _return;
            }

            if(tmp_val.getRol() != tipo_rol.valor)
            {
                return tmp_val;
            }

            if(tmp_val.getTipo().getTipo() != tipo_dato.BOOLEANO)
            {
                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar Sentencia If, expresión no da como resultado un valor booleano.");
                return _return;
            }

            //ANALISIS DE IF    
            etapa = 1;
            let entorno_actual: SubEntorno = new SubEntorno(this.identificador1);
            entorno_padre._push(entorno_actual);

            let val_sentencia_if: Simbolo;
            
            for(var x = 0; x <  this.lista_sentencias_if.length; x++)
            {                    
                val_sentencia_if = this.lista_sentencias_if[x].analizar(entorno_padre,entorno_padre.getLastNivel());

                if (val_sentencia_if.getRol() == tipo_rol.error)
                {                        
                    _return = val_sentencia_if;
                    return _return;
                }
                else if (val_sentencia_if.getRol() == tipo_rol.detener)
                {                        
                    _return = val_sentencia_if;
                    return _return;
                }
                else if (val_sentencia_if.getRol() == tipo_rol.continuar)
                {                        
                    _return = val_sentencia_if;
                    return _return;
                }
                else if (val_sentencia_if.getRol() == tipo_rol.retornar)
                {
                    _return = val_sentencia_if;                      
                    return _return;
                }
                else
                {                        
                    continue;             
                }
            }

            //sentencias else if y else 
            etapa = 2;                                         
            let val_sentencia_else_if : Simbolo;
            
            for(var x= 0; x < this.lista_else_if.length; x++)
            {                    
                val_sentencia_else_if = this.lista_else_if[x].analizar(entorno_padre,entorno_padre.getLastNivel());
                
                if(val_sentencia_else_if.getRol() == tipo_rol.error)
                {                        
                    _return = val_sentencia_else_if;
                    return _return;
                }
                else if(val_sentencia_else_if.getRol() == tipo_rol.detener)
                {                        
                    _return = val_sentencia_else_if;
                    return _return;
                }
                else if(val_sentencia_else_if.getRol() == tipo_rol.continuar) //CONTINUE
                {
                    _return = val_sentencia_else_if;
                    return _return;
                }
                else if(val_sentencia_else_if.getRol() == tipo_rol.retornar) //RETURN
                {
                    _return = val_sentencia_else_if;
                    return _return;
                }
                else
                {
                    continue;
                }
            }    

            //ANALISIS SENTENCIA ELSE
            etapa = 3;
            let entorno_else : SubEntorno = new SubEntorno(this.identificador2);
            entorno_padre._push(entorno_else);
            var val_sentencia_else : Simbolo;

            for(var x = 0; x < this.lista_sentencias_else.length; x++)
            {
                val_sentencia_else = this.lista_sentencias_else[x].analizar(entorno_padre,entorno_padre.getLastNivel());
                
                if(val_sentencia_else.getRol() == tipo_rol.error) //ERROR
                {
                    _return = val_sentencia_else;
                    return _return;
                }
                else if (val_sentencia_else.getRol() == tipo_rol.detener) //BREAK
                {
                    _return = val_sentencia_else;
                    return _return;
                }
                else if (val_sentencia_else.getRol() == tipo_rol.continuar) //CONTINUE
                {
                    _return = val_sentencia_else;
                    return _return;
                }
                else if (val_sentencia_else.getRol() == tipo_rol.retornar) //RETURN
                {
                    _return = val_sentencia_else;
                    return _return;
                }
                else
                {                        
                    continue;                                            
                }
            }       
                
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.BOOLEANO), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia If ejecutada correctamente");  
            return _return;
            
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Sentencia If (a" + etapa + ") :" + Exception.Message);
            return _return;
        }
    }

    public traducir(salida : Middle)
    {   let etapa : number;
        let _return : Simbolo;
        let tmp_val : Simbolo;

        try
        {   etapa = 0;
            let etiqueta_positiva = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_negativa = "l" + Tabla_Simbolos.getInstance().getEtiqueta(); 
            let etiqueta_salida = "";
            
            tmp_val = (this.sentencia_comparacion == null) ? null : this.sentencia_comparacion.traducir(salida);
           
            Middle.getInstance().setOuput("if(" + tmp_val.getMensaje() + ") goto " + etiqueta_positiva + ";");
            Middle.getInstance().setOuput("goto " + etiqueta_negativa + ";");
            Middle.getInstance().setOuput(etiqueta_positiva + ":"); 

            //ANALISIS DE IF    
            etapa = 1;
            let val_sentencia_if: Simbolo;
        
            for(var x = 0; x <  this.lista_sentencias_if.length; x++)
            {                    
                val_sentencia_if = this.lista_sentencias_if[x].traducir(salida);
            }

            if(this.lista_sentencias_else.length > 0)
            {
                etiqueta_salida = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
                Middle.getInstance().setOuput("goto " + etiqueta_salida + ";");
            }

            Middle.getInstance().setOuput(etiqueta_negativa + ":");

            //sentencias else if 
            etapa = 2;                                         
            let val_sentencia_else_if : Simbolo;
            
            for(var x= 0; x < this.lista_else_if.length; x++)
            {                    
                val_sentencia_else_if = this.lista_else_if[x].traducir(salida);
            }    

            //ANALISIS SENTENCIA ELSE
            etapa = 3;
            var val_sentencia_else : Simbolo;

            for(var x = 0; x < this.lista_sentencias_else.length; x++)
            {
                val_sentencia_else = this.lista_sentencias_else[x].traducir(salida);
            }       
                
            if(this.lista_sentencias_else.length > 0 && etiqueta_salida != "")
            {
                Middle.getInstance().setOuput(etiqueta_salida + ":");
                Middle.getInstance().setOuput("P = P - 0;");
            }

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.BOOLEANO), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia If ejecutada correctamente");  
            return _return;
            
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Sentencia If (t" + etapa + ") : " + Error.Mesage);
        }
    }

    public getThis() 
    {
        var clon_lista_sentencias_if: Array<Instruction> = new Array<Instruction>();
        var clon_lista_else_if: Array<Instruction> = new Array<Instruction>();
        var clon_lista_sentencias_else: Array<Instruction> = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_sentencias_if.length; x++)
        {   
            clon_lista_sentencias_if.push(this.lista_sentencias_if[x].getThis());
        }
       
        for(var y = 0; y < this.lista_else_if.length; y++)
        {  
            clon_lista_else_if.push(this.lista_else_if[y].getThis());
        }
        
        for(var z = 0; z < this.lista_sentencias_else.length; z++)
        {   
            clon_lista_sentencias_else.push(this.lista_sentencias_else[z].getThis());
        }
       
        return new Sentencia_If(this.fila,this.columna,this.sentencia_comparacion.getThis(),clon_lista_sentencias_if,clon_lista_else_if,clon_lista_sentencias_else);
    }
}

export default Sentencia_If;