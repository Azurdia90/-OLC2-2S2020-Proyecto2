import Instruction from './Instruction';
import Expresion from './Expresion';
import Simbolo from './Simbolo';
import Entorno from './Entorno';
import Middle from './Middle';
import Tipo from './Tipo';

class Not extends Expresion
{
    constructor(p_fila : number, p_columna: number, p_operador_izq : Instruction) {
        super(p_fila,p_columna,tipo_operacion.NOT,p_operador_izq);
    }
    
    public analizar(entorno_padre : Entorno, nivel : number)
    {
        let _return : Simbolo;

        try
        {
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.analizar(entorno_padre, nivel);

            if (op1 == null)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Operador vacio");
                return _return;
            }

            if (op1.getRol() != tipo_rol.valor && op1.getRol() != tipo_rol.arreglo)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                return op1;
            }

            if (!(op1.getTipo().getTipo() == tipo_dato.BOOLEANO))
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar Not con valores no booleanos.");
                return _return;
            }
            else
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");                
                _return.setMensaje("Not Exitoso.");
                return _return;
            }

        }
        catch(Exception)
        {
            this.entorno_padre = entorno_padre;
            this.nivel = nivel;

            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Operacion Not: " + Exception.Message);
            return _return;
        }
    }
    
    public getThis() 
    {
        return new Not(this.fila,this.columna,this.operador_izq.getThis());
    }
}

export default Not;