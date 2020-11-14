import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from "./Instruction";
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Sentencia_Caso extends Instruction
{
    private default: Boolean;
    private valor_padre_a: Simbolo;
    private valor_padre_t: Simbolo;
    private valor_comparacion : Instruction;
    private lista_sentencias: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number , p_defecto: Boolean, p_valor_comparacion : Instruction, p_lista_sentencias : Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.default = p_defecto;
        this.valor_comparacion = p_valor_comparacion;        
        this.lista_sentencias = p_lista_sentencias;
    }

    public setValorPadreA(p_padre: Simbolo)
    {
        this.valor_padre_a = p_padre;
    }

    public setValorPadreT(p_padre: Simbolo)
    {
        this.valor_padre_t = p_padre;
    }

    public analizar(entorno_padre : Entorno, nivel: number)
    {
        let _return : Simbolo;
        let tmp_val : Simbolo;

        try
        {
            if(!this.default)
            {
                tmp_val = (this.valor_comparacion == null) ? null : this.valor_comparacion.analizar(entorno_padre,nivel);

                if (tmp_val == null)
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Sentencia Switch: Expresión comparación vacia");
                    return _return;
                }
    
                if(tmp_val.getRol() != tipo_rol.valor)
                {
                    return tmp_val;
                }
    
                if (this.valor_padre_a == null)
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Sentencia Switch: Expresión comparación vacia");
                    return _return;
                }
    
                if(this.valor_padre_a.getRol() != tipo_rol.valor)
                {
                    return tmp_val;
                }
    
                if(this.valor_padre_a.getTipo().getTipo() != tmp_val.getTipo().getTipo()
                )
                {
                    _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("No es posible realizar Sentencia Switch, los tipos de los valores a comparar no son los mismos.");
                    return _return;
                }
            }
            else
            {
                tmp_val = this.valor_padre_a;
            }

            var val_sentencia: Simbolo;
            
            for(var x = 0; x <  this.lista_sentencias.length; x++)
            {                    
                val_sentencia = this.lista_sentencias[x].analizar(entorno_padre,nivel);

                if (val_sentencia.getRol() == tipo_rol.error)
                {                        
                    _return = val_sentencia;
                    return _return;
                }
                else if (val_sentencia.getRol() == tipo_rol.detener)
                {     
                    _return = val_sentencia;                 
                    return _return;
                }
                else if (val_sentencia.getRol() == tipo_rol.continuar)
                {   
                    _return = val_sentencia;                                      
                    return _return;
                }
                else if (val_sentencia.getRol() == tipo_rol.retornar)
                {
                    _return = val_sentencia;                    
                    return _return;
                }
                else
                {     
                    _return = val_sentencia;
                    continue;
                }       
            }  

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Caso Ejecutada correctamente");  
            return _return;
            
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Sentencia Switch: " + Exception.Message);
            return _return;
        }
    }

    public traducir(salida : Middle)
    {
        let _return : Simbolo;
        let tmp_val : Simbolo;
        let etapa   : number;
        try
        {   etapa = 1;
            if(!this.default)
            {
                tmp_val = (this.valor_comparacion == null) ? null : this.valor_comparacion.traducir(salida);
            }
            else
            {
                tmp_val = this.valor_padre_t;
            }

            let etiqueta_positiva = "l" + Tabla_Simbolos.getInstance().getEtiqueta(); 
            let etiqueta_negativa = "l" + Tabla_Simbolos.getInstance().getEtiqueta();  
        
            Middle.getInstance().setOuput("if(" + this.valor_padre_t.getMensaje() + "==" + tmp_val.getMensaje() + ") goto " + etiqueta_positiva + ";");
            Middle.getInstance().setOuput("goto " + etiqueta_negativa + ";"); 
            Middle.getInstance().setOuput(etiqueta_positiva + ":"); 

            let val_sentencia: Simbolo;
            etapa = 2;
            for(var x = 0; x <  this.lista_sentencias.length; x++)
            {    
                this.lista_sentencias[x].setEtiquetaContinue(this.etiqueta_continue);
                this.lista_sentencias[x].setEtiquetaBreak(this.etiqueta_break);
                this.lista_sentencias[x].setEtiquetaReturn(this.etiqueta_return);

                val_sentencia = this.lista_sentencias[x].traducir(salida);
                if(val_sentencia == undefined){console.log(this.lista_sentencias[x]);}
                if (val_sentencia.getRol() == tipo_rol.error)
                {                        
                    _return = val_sentencia;
                    return _return;
                }
                else
                {     
                    _return = val_sentencia;
                    continue;
                }       
            }  
            etapa= 3;
            Middle.getInstance().setOuput(etiqueta_negativa + ":"); 
            
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Caso Ejecutada correctamente");  
            return _return;
            
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Sentencia Switch (ct" + etapa + ") : " + Error.Mesage);
        }
    }

    public getThis() 
    {
        var clon_lista_sentencias: Array<Instruction> = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_sentencias.length; x++)
        {
            clon_lista_sentencias.push(this.lista_sentencias[x].getThis());
        }
        
        return new Sentencia_Caso(this.fila,this.columna,this.default,this.valor_comparacion == undefined ? undefined : this.valor_comparacion.getThis(),clon_lista_sentencias);
    }
}

export default Sentencia_Caso;