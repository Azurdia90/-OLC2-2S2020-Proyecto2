import Funcion from "./Funcion";
import Instruction from './Instruction';
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo from './Tipo';

class Funcion_Log extends Funcion
{
    private valores_imprimir : Array<Simbolo>;

    constructor(p_fila : number, p_columna : number)
    {
        super(p_fila, p_columna, "log", new Array<Instruction>(), undefined);
    }

    public pasarParametros(padre : Simbolo, lista_parametros_enviados : Array<Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        
        if(lista_parametros_enviados.length > 0)
        {   
            this.valores_imprimir = lista_parametros_enviados;

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
            _return.setMensaje("Función Log: valor vacio");
            return _return;            
        }      
    }

    public analizar(entorno: String, entorno_local : Map<String, Simbolo>, salida : Middle) 
    {
        let _return : Simbolo;

        try
        {   
            var salida_tmp: String;

            salida_tmp = "";

            for(var i = 0; i < this.valores_imprimir.length; i++)
            {
                if(this.valores_imprimir[i].getRol() == tipo_rol.valor)
                {
                    continue;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Error en Sentencia Imprimir: Se permiten valores primitivos únicamente.");
                    return _return;
                }
            }
            
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Imprimir: Sentencia realizada correctamente.");
            return _return;
            
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error en Sentencia Imprimir: " + Exception);
            return _return;
        }
    } 
    
    public traducir(entorno: String, entorno_local : Map<String, Simbolo>, salida : Middle) 
    {
        let _return : Simbolo;

        try
        {   //console.log(this.valores_imprimir);

            for(var i = 0; i < this.valores_imprimir.length; i++)
            {
                this.print(this.valores_imprimir[i]);
            }
            
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Imprimir: Sentencia realizada correctamente.");
            return _return;
            
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error en Sentencia Imprimir: " + Exception);
            return _return;
        }
    }    

    private print(valor_imprimir: Simbolo)
    {   //console.log(valor_imprimir);
        //var tam_metodo = ptr_entorno[0];
        
        var tam_metodo = 0;

        var temporal_simulado = "t" + Tabla_Simbolos.getInstance().getTemporal();
        var temporal_contador = "t" + Tabla_Simbolos.getInstance().getTemporal;

        if(valor_imprimir.getTipo().Equals(new Tipo(tipo_dato.VOID)))
        {   
            Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";\n");
            Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;\n");
            Middle.getInstance().setOuput("Stack[" + temporal_contador + "] = " + valor_imprimir.getMensaje() + ";\n");
            Middle.getInstance().setOuput("P = P + " + tam_metodo + ";\n");
            Middle.getInstance().setOuput("call imprimir_nulo;\n");
            Middle.getInstance().setOuput("P = P - " + tam_metodo + ";\n"); 
        }
        else if(valor_imprimir.getTipo().Equals(new Tipo(tipo_dato.NULO)))
        {   
            Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";\n");
            Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;\n");
            Middle.getInstance().setOuput("Stack[" + temporal_contador + "] = " + valor_imprimir.getMensaje() + ";\n");
            Middle.getInstance().setOuput("P = P + " + tam_metodo + ";\n");
            Middle.getInstance().setOuput("call imprimir_nulo;\n");
            Middle.getInstance().setOuput("P = P - " + tam_metodo + ";\n"); 
        }
        else if(valor_imprimir.getTipo().Equals(new Tipo(tipo_dato.BOOLEANO)))
        {   
            Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";\n");
            Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;\n");
            Middle.getInstance().setOuput("Stack[" + temporal_contador + "] = " + valor_imprimir.getMensaje() + ";\n");
            Middle.getInstance().setOuput("P = P + " + tam_metodo + ";\n");
            Middle.getInstance().setOuput("call imprimir_booleano;\n");
            Middle.getInstance().setOuput("P = P - " + tam_metodo + ";\n"); 
        }
        else if(valor_imprimir.getTipo().Equals(new Tipo(tipo_dato.NUMERO)))
        {   
            Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";\n");
            Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;\n");
            Middle.getInstance().setOuput("Stack[" + temporal_contador + "] = " + valor_imprimir.getMensaje() + ";\n");
            Middle.getInstance().setOuput("P = P + " + tam_metodo + ";\n");
            Middle.getInstance().setOuput("call imprimir_numero;\n");
            Middle.getInstance().setOuput("P = P - " + tam_metodo + ";\n"); 
        }
        else if(valor_imprimir.getTipo().Equals(new Tipo(tipo_dato.CADENA)))
        {   
            Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";\n");
            Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;\n");
            Middle.getInstance().setOuput("Stack[" + temporal_contador + "] = " + valor_imprimir.getMensaje() + ";\n");
            Middle.getInstance().setOuput("P = P + " + tam_metodo + ";\n");
            Middle.getInstance().setOuput("call imprimir_cadena;\n");
            Middle.getInstance().setOuput("P = P - " + tam_metodo + ";\n"); 
        }
        else
        {
            Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";\n");
            Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;\n");
            Middle.getInstance().setOuput("Stack[" + temporal_contador + "] = " + valor_imprimir.getMensaje() + ";\n");
            Middle.getInstance().setOuput("P = P + " + tam_metodo + ";\n");
            Middle.getInstance().setOuput("call imprimir_nulo;\n");
            Middle.getInstance().setOuput("P = P - " + tam_metodo + ";\n"); 
        }        
    }
    
    public getThis() 
    {
        return new Funcion_Log(this.fila,this.columna);
    }
    
}

export default Funcion_Log;