import Sentencia_Caso from './Sentencia_Caso';
import Instruction from "./Instruction";
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import SubEntorno from './SubEntorno';
import Tabla_Simbolos from './Tabla_Simbolos';

class Sentencia_Switch extends Instruction
{
    private identificador : String;
    private valor_condicion: Instruction;
    private lista_casos: Array<Instruction>;
    
    constructor(p_linea: number, p_columna : number , p_valor_condicion : Instruction, p_lista_casos : Array<Instruction>)
    {
        super(p_linea,p_columna);
        this.identificador = "";
        this.valor_condicion = p_valor_condicion;        
        this.lista_casos = p_lista_casos;
    }

    public analizar(entorno_padre : Entorno, nivel: number)
    {
        let cont_switch = entorno_padre.getPadre().getPos_switch();  
        this.identificador = "swtich" + cont_switch;
        let _return : Simbolo;
        let tmp_val : Simbolo;
        let etapa   : number;
        try
        {
            etapa = 1;
            tmp_val = (this.valor_condicion == null) ? null : this.valor_condicion.analizar(entorno_padre,nivel);

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

            if(tmp_val.getTipo().getTipo() == tipo_dato.IDENTIFICADOR)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar Sentencia Switch con un valor no Primitivo.");
                return _return;
            }

            var tmp_caso: Sentencia_Caso;
            var val_caso: Simbolo;
            etapa = 2;
            let entorno_actual: SubEntorno = new SubEntorno(this.identificador);
            entorno_padre._push(entorno_actual);
            etapa = 3;
            for(var x = 0; x <  this.lista_casos.length; x++)
            {           
                tmp_caso = <Sentencia_Caso> this.lista_casos[x]; 
                tmp_caso.setValorPadreA(tmp_val);        
                val_caso = tmp_caso.analizar(entorno_padre,entorno_padre.getLastNivel());
 
                if (val_caso.getRol() == tipo_rol.error)
                {                        
                    _return = val_caso;
                    return _return;
                }
                else
                {     
                    _return = val_caso;
                    continue;
                }       
            }               
            etapa = 4;
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Swtich Ejecutada correctamente");  
            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Sentencia Switch (a" + etapa + "): " + Exception.Message);
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
            
            let etiqueta_break = "l" + Tabla_Simbolos.getInstance().getEtiqueta(); 

            tmp_val = (this.valor_condicion == null) ? null : this.valor_condicion.traducir(salida);

            var tmp_caso: Sentencia_Caso;
            var val_caso: Simbolo;
            
            for(var x = 0; x <  this.lista_casos.length; x++)
            {           
                this.lista_casos[x].setEtiquetaContinue(this.etiqueta_continue);
                this.lista_casos[x].setEtiquetaBreak(etiqueta_break);
                this.lista_casos[x].setEtiquetaReturn(this.etiqueta_return);
                tmp_caso = <Sentencia_Caso> this.lista_casos[x]; 
                tmp_caso.setValorPadreT(tmp_val);        
                val_caso = tmp_caso.traducir(salida);

                if (val_caso.getRol() == tipo_rol.error)
                {                        
                    _return = val_caso;
                    return _return;
                }
                else
                {     
                    _return = val_caso;
                    continue;
                }       
            }               
            Middle.getInstance().setOuput(etiqueta_break + ":"); 
            Middle.getInstance().setOuput("P = P - 0;"); 

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Swtich Ejecutada correctamente");  
            return _return;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Sentencia Switch (t" + etapa + ") : " + Error.Mesage);
        }
    }

    public getThis() 
    {
        var clon_lista_casos: Array<Instruction> = new Array<Instruction>();
        
        for(var x = 0; x < this.lista_casos.length; x++)
        {   
            clon_lista_casos.push(this.lista_casos[x].getThis());
        }
        
        return new Sentencia_Switch(this.fila,this.columna,this.valor_condicion.getThis(),clon_lista_casos);
    }
}

export default Sentencia_Switch;