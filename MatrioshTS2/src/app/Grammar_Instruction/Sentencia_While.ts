import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from "./Instruction";
import SubEntorno from './SubEntorno';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Sentencia_While extends Instruction
{
    private identificador: String;

    private sentencia_comparacion: Instruction;
    private lista_sentencias: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number , p_sentencia_comparacion : Instruction, p_lista_sentencias : Array<Instruction>)
    {
        super(p_linea,p_columna);
        
        this.sentencia_comparacion = p_sentencia_comparacion;        
        this.lista_sentencias = p_lista_sentencias;
    }

    public analizar(entorno_padre : Entorno, nivel: number)
    {   let cont_while : number, etapa : number;
        let _return : Simbolo;
        let tmp_val : Simbolo;

        try
        {   etapa = 0;
            cont_while = entorno_padre.getPadre().getPos_while();  
            this.identificador = "while" + cont_while;

            tmp_val = (this.sentencia_comparacion == null) ? null : this.sentencia_comparacion.analizar(entorno_padre, nivel);

            if (tmp_val == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia While: Expresión comparación vacia");
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
                _return.setMensaje("No es posible realizar Sentencia While, expresión no da como resultado un valor booleano.");
                return _return;
            }
            
            etapa = 1;
            let entorno_actual: SubEntorno = new SubEntorno(this.identificador);
            entorno_padre._push(entorno_actual);

            var val_sentencia: Simbolo;
            
            for(var x = 0; x <  this.lista_sentencias.length; x++)
            {                    
                val_sentencia = this.lista_sentencias[x].analizar(entorno_padre, entorno_padre.getLastNivel());

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
                       
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia While Ejecutada correctamente");  
            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Sentencia While: " + Exception.Message);
            return _return;
        }
    }

    public traducir(salida: Middle)
    {   let etapa : number;
        let _return : Simbolo;
        let tmp_val : Simbolo;

        try
        {   etapa = 0;
            let etiqueta_inicio = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_positiva = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_negativa = "l" + Tabla_Simbolos.getInstance().getEtiqueta(); 

            Middle.getInstance().setOuput("//sentencia While");
            Middle.getInstance().setOuput(etiqueta_inicio + ":");

            tmp_val = (this.sentencia_comparacion == null) ? null : this.sentencia_comparacion.traducir(salida);

            etapa = 1;            
            Middle.getInstance().setOuput("if(" + tmp_val.getMensaje() + ") goto " + etiqueta_positiva + ";");
            Middle.getInstance().setOuput("goto " + etiqueta_negativa + ";"); 
            Middle.getInstance().setOuput(etiqueta_positiva + ":"); 

            var val_sentencia: Simbolo;
            
            for(var x = 0; x <  this.lista_sentencias.length; x++)
            {      
                this.lista_sentencias[x].setEtiquetaContinue(etiqueta_inicio);
                this.lista_sentencias[x].setEtiquetaBreak(etiqueta_negativa);
                this.lista_sentencias[x].setEtiquetaReturn(this.etiqueta_return);

                val_sentencia = this.lista_sentencias[x].traducir(salida)
                _return = val_sentencia;

                if (val_sentencia.getRol() == tipo_rol.error)
                {                        
                    return _return;
                }    
            }  
                         
            etapa = 2;
            Middle.getInstance().setOuput("goto " + etiqueta_inicio + ";"); 
            Middle.getInstance().setOuput(etiqueta_negativa + ":");
            Middle.getInstance().setOuput("P = P - 0;"); 
                       
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia While Ejecutada correctamente");  
            return _return;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Sentencia while (t" + etapa + ") : " + Error.Mesage);
        }
    }

    public getThis() 
    {
        var clon_lista_sentencias: Array<Instruction> = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_sentencias.length; x++)
        {
            clon_lista_sentencias.push(this.lista_sentencias[x].getThis());
        }
        
        return new Sentencia_While(this.fila,this.columna,this.sentencia_comparacion.getThis(),clon_lista_sentencias);
    }
}

export default Sentencia_While;