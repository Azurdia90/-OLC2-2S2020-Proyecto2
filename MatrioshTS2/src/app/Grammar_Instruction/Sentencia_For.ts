import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from "./Instruction";
import SubEntorno from './SubEntorno';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Sentencia_For extends Instruction
{
    private identificador: String;

    private sentencia1: Instruction;
    private sentencia2: Instruction;
    private sentencia3: Instruction;
    private lista_sentencias: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number, p_sentencia1 : Instruction, p_sentencia2 : Instruction, p_sentencia3 : Instruction, p_lista_sentencias : Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.sentencia1 = p_sentencia1;
        this.sentencia2 = p_sentencia2;
        this.sentencia3 = p_sentencia3;     
        this.lista_sentencias = p_lista_sentencias;
    }

    public analizar(entorno_padre : Entorno, nivel: number)
    {   let cont_for : number, etapa : number;
        let _return : Simbolo;
        let tmp_val1 : Simbolo;
        let tmp_val2 : Simbolo;
        let tmp_val3 : Simbolo;

        try
        {   etapa = 0;
            cont_for = entorno_padre.getPadre().getPos_for();
            this.identificador = "for" + cont_for;

            let entorno_for: SubEntorno = new SubEntorno(this.identificador);
            entorno_padre._push(entorno_for);

            tmp_val1 =  (this.sentencia1 == null) ? null : this.sentencia1.analizar(entorno_padre, entorno_padre.getLastNivel());

            if (tmp_val1 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia For: No pudo definirse el valor base del bucle.");
                return _return;
            }
            
            if(tmp_val1.getRol() != tipo_rol.aceptado)
            {
                return tmp_val1;
            }
            etapa = 1;
            tmp_val2 =  (this.sentencia2 == null) ? null : this.sentencia2.analizar(entorno_padre, entorno_padre.getLastNivel());
            
            if (tmp_val2 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia For: No existe una sentencia relacional.");
                return _return;
            }

            if(tmp_val2.getRol() != tipo_rol.valor)
            {
                return tmp_val2;
            }

            if(tmp_val2.getTipo().getTipo() != tipo_dato.BOOLEANO)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar Sentencia For: expresión no da como resultado un valor booleano.");
                return _return;
            }
            
            etapa = 3;
            var val_sentencia: Simbolo;
            
            for(var x = 0; x <  this.lista_sentencias.length; x++)
            {                    
                val_sentencia = this.lista_sentencias[x].analizar(entorno_padre,entorno_padre.getLastNivel());

                if (val_sentencia.getRol() == tipo_rol.error)
                {                        
                    _return = val_sentencia;
                    return _return;
                }
                else if (val_sentencia.getRol() == tipo_rol.detener)
                {     
                    _return = val_sentencia;                    
                    break;
                }
                else if (val_sentencia.getRol() == tipo_rol.continuar)
                {   
                    _return = val_sentencia;                     
                    break;
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

            if(_return.getRol() == tipo_rol.detener)
            {
                Tabla_Simbolos.getInstance().getStack().pop();
                _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia For Ejecutada correctamente");  
                return _return;
            }     

            tmp_val3 =  (this.sentencia3 == null) ? null : this.sentencia3.analizar(entorno_padre,entorno_padre.getLastNivel());
            etapa = 4;
            if (tmp_val3 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia For: No pudo definirse la sentencia de incremento o decremento.");
                return _return;
            }
            
            if(tmp_val3.getRol() != tipo_rol.valor)
            {
                return tmp_val3;
            }              
            
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia For Ejecutada correctamente");  
            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Sentencia For (a" + etapa + ") : " + Exception.Message);
            return _return;
        }
    }

    public traducir(salida: Middle)
    {   let  etapa : number;
        let _return : Simbolo;
        let tmp_val1 : Simbolo;
        let tmp_val2 : Simbolo;
        let tmp_val3 : Simbolo;

        try
        {   etapa = 0;
            let etiqueta_inicio = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_positiva = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_siguiente = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_negativa = "l" + Tabla_Simbolos.getInstance().getEtiqueta(); 

            tmp_val1 =  (this.sentencia1 == null) ? null : this.sentencia1.traducir(salida);

            Middle.getInstance().setOuput(etiqueta_inicio + ":");

            etapa = 1;
            tmp_val2 =  (this.sentencia2 == null) ? null : this.sentencia2.traducir(salida);

            Middle.getInstance().setOuput("if(" + tmp_val2.getMensaje() + ") goto " + etiqueta_positiva + ";");
            Middle.getInstance().setOuput("goto " + etiqueta_negativa + ";"); 
            Middle.getInstance().setOuput(etiqueta_positiva + ":"); 
            
            etapa = 3;
            var val_sentencia: Simbolo;
            
            for(var x = 0; x <  this.lista_sentencias.length; x++)
            { 
                this.lista_sentencias[x].setEtiquetaContinue(etiqueta_siguiente);
                this.lista_sentencias[x].setEtiquetaBreak(etiqueta_negativa);
                this.lista_sentencias[x].setEtiquetaReturn(this.etiqueta_return);                  
                val_sentencia = this.lista_sentencias[x].traducir(salida);
                
                if (val_sentencia.getRol() == tipo_rol.error)
                {                        
                    _return = val_sentencia;
                    return _return;
                }   
            }  
            
            Middle.getInstance().setOuput(etiqueta_siguiente + ":"); 
        
            etapa = 4;
            tmp_val3 =  (this.sentencia3 == null) ? null : this.sentencia3.traducir(salida);  
            
            Middle.getInstance().setOuput("goto " + etiqueta_inicio + ";"); 
            Middle.getInstance().setOuput(etiqueta_negativa + ":"); 
            Middle.getInstance().setOuput("P = P - 0;"); 

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia For Ejecutada correctamente");  
            return _return;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Sentencia For (t" + etapa + ") : " + Error.Mesage);
        }
    }

    public getThis() 
    {
        var clon_lista_sentencias: Array<Instruction> = new Array<Instruction>();
    
        for(var x = 0; x < this.lista_sentencias.length; x++)
        {   
            clon_lista_sentencias.push(this.lista_sentencias[x].getThis());
        }
        
        return new Sentencia_For(this.fila,this.columna,this.sentencia1.getThis(),this.sentencia2.getThis(),this.sentencia3.getThis(),clon_lista_sentencias);
    }
}

export default Sentencia_For;