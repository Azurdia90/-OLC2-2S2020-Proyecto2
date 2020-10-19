import Expresion from './Expresion';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class And extends Expresion
{
    constructor(p_fila : number, p_columna: number, p_operador_izq : Instruction, p_operador_der : Instruction) {
        super(p_fila,p_columna,tipo_operacion.AND,p_operador_izq, p_operador_der);
    }
    
    public analizar(entorno: String, entorno_padre : Map<String,Simbolo>, salida : Middle)
    {
        let _return : Simbolo;

        try
        {
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.analizar(entorno, entorno_padre, salida);
            let op2 : Simbolo = (this.operador_der == null) ? null : this.operador_der.analizar(entorno, entorno_padre, salida);
            
            if (op1 == null || op2 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Operador vacio");
                return _return;
            }
            
            if (op1.getRol() != tipo_rol.valor && op1.getRol() != tipo_rol.arreglo)
            {
                return op1;
            }

            if (op2.getRol() != tipo_rol.valor && op2.getRol() != tipo_rol.arreglo)
            {
                return op2;
            }

            if (!(op1.getTipo().getTipo() == tipo_dato.BOOLEANO) || !(op2.getTipo().getTipo() == tipo_dato.BOOLEANO))
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar And con valores no booleanos.");
                return _return;
            }
            else
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                _return.setMensaje("And exitoso");
                return _return;
            }

        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Operacion And: " + Exception.Message);
            return _return;
        }
    }
    
    public getThis() 
    {    
        return new And(this.fila,this.columna,this.operador_izq.getThis(),this.operador_der.getThis());
    }
}

export default And;