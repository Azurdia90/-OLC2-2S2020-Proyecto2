import Expresion from './Expresion';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Entorno from './Entorno';

class Operador_Unario extends Expresion
{
    constructor(p_fila : number, p_columna: number, p_operador_izq : Instruction) {
        super(p_fila,p_columna,tipo_operacion.MULTIPLICACION,p_operador_izq);
    }
    
    public analizar(entorno_padre : Entorno, salida : Middle)
    {
        let _return : Simbolo;

        try
        {
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.analizar(entorno_padre, salida);

            if (op1 == null)
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

            if (!(op1.getTipo().getTipo() == tipo_dato.NUMERO))
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar Operador Unario con valores no numericos.");
                return _return;
            }
            else
            {
                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),"");                
                _return.setMensaje("Operador Unario exitoso");
                return _return;
            }

        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Operador Unario: " + Exception.Message);
            return _return;
        }
    }
    
    public getThis() 
    {
        return new Operador_Unario(this.fila,this.columna,this.operador_izq.getThis());
    }
}

export default Operador_Unario;