import Instruction from './Instruction';
import Expresion from './Expresion';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Tabla_Simbolos from './Tabla_Simbolos';

class Operador_Ternario extends Expresion
{
    private condicion : Instruction;

    constructor(p_fila : number, p_columna: number, p_condicion : Instruction, p_operador_izq : Instruction, p_operador_der : Instruction) {
        super(p_fila,p_columna,tipo_operacion.TERNARIO,p_operador_izq,p_operador_der);
        this.condicion = p_condicion;
    }
    
    public analizar(entorno_padre : Entorno, nivel : number)
    {
        let _return : Simbolo;
        let tmp_val : Simbolo;

        try
        {
            tmp_val = (this.condicion == null) ? null : this.condicion.analizar(entorno_padre, nivel);

            if (tmp_val == null)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Expresión de condición vacio.");
                return _return;
            }

            if (tmp_val.getRol() != tipo_rol.valor && tmp_val.getRol() != tipo_rol.arreglo)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                return tmp_val;
            }

            if (tmp_val.getTipo().getTipo() != tipo_dato.BOOLEANO)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar Operador Ternario si la condicón no devuelve un valor Booleano.");
                return _return;
            }
            else
            {   

                let op_izq : Simbolo = this.operador_izq.analizar(entorno_padre, nivel);
                let op_der : Simbolo = this.operador_der.analizar(entorno_padre, nivel);

                if(op_izq.getTipo().Equals(op_der.getTipo()))
                {
                    return this.operador_izq;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("No es posible realizar Operador Ternario los valores a devolver no son del mismo tipo.");
                    return _return;
                }
            }
        }
        catch(Exception)
        {
            this.entorno_padre = entorno_padre;
            this.nivel = nivel;

            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Operador Ternario: " + Exception.Message);
            return _return;
        }
    }

    public traducir(salida: Middle)
    {
        let _return : Simbolo;
        let tmp_val : Simbolo;

        try
        {
            var temporal_resultado = "t" + Tabla_Simbolos.getInstance().getTemporal();
            var etiqueta_verdadera = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            var etiqueta_falsa     = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            var etiqueta_salida    = "l" + Tabla_Simbolos.getInstance().getEtiqueta();

            tmp_val = (this.condicion == null) ? null : this.condicion.traducir(salida);

            let op_izq : Simbolo = this.operador_izq.traducir(salida);
            let op_der : Simbolo = this.operador_der.traducir(salida);

            Middle.getInstance().setOuput("if(" + tmp_val.getMensaje() + ") goto " + etiqueta_verdadera + ";");
            Middle.getInstance().setOuput("goto " + etiqueta_falsa + ";");
            Middle.getInstance().setOuput(etiqueta_verdadera + ":");
            Middle.getInstance().setOuput(temporal_resultado + " = " + op_izq.getMensaje() + ";");
            Middle.getInstance().setOuput("goto " + etiqueta_salida + ";");
            Middle.getInstance().setOuput(etiqueta_falsa + ":");
            Middle.getInstance().setOuput(temporal_resultado + " = " + op_der.getMensaje() + ";");
            Middle.getInstance().setOuput(etiqueta_salida + ":");
            Middle.getInstance().setOuput("P = P - 0;"); 

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje(temporal_resultado);  
            return _return;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Operador Ternario : " + Error.Mesage);
        }
    }
    
    public getThis() 
    {
        return new Operador_Ternario(this.fila,this.columna,this.condicion.getThis(),this.operador_izq.getThis(),this.operador_der.getThis());
    }
}

export default Operador_Ternario;