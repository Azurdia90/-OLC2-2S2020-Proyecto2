import Expresion from './Expresion';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Operador_Ternario extends Expresion
{
    private condicion : Instruction;

    constructor(p_fila : number, p_columna: number, p_condicion : Instruction, p_operador_izq : Instruction, p_operador_der : Instruction) {
        super(p_fila,p_columna,tipo_operacion.TERNARIO,p_operador_izq,p_operador_der);
        this.condicion = p_condicion;
    }
    
    public analizar(entorno: String, entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;
        let tmp_val : Simbolo;

        try
        {
            tmp_val = (this.condicion == null) ? null : this.condicion.analizar(entorno, entorno_padre, salida);

            if (tmp_val == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Expresión de condición vacio.");
                return _return;
            }

            if (tmp_val.getRol() != tipo_rol.valor && tmp_val.getRol() != tipo_rol.arreglo)
            {
                return tmp_val;
            }

            if (tmp_val.getTipo().getTipo() != tipo_dato.BOOLEANO)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar Operador Ternario si la condicón no devuelve un valor Booleano.");
                return _return;
            }
            else
            {   

                return this.operador_izq;

                //if(<Boolean> tmp_val.getValor())
                //{
                    //_return = this.operador_izq.ejecutar(entorno_padre,salida);
                    //return _return;
                //}
                //else 
                //{
                    //_return = this.operador_der.ejecutar(entorno_padre,salida);
                    //return _return;
                //}
            }
            
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Operador Ternario: " + Exception.Message);
            return _return;
        }
    }
    
    public getThis() 
    {
        return new Operador_Ternario(this.fila,this.columna,this.condicion.getThis(),this.operador_izq.getThis(),this.operador_der.getThis());
    }
}

export default Operador_Ternario;