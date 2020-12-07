import Expresion from './Expresion';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Entorno from './Entorno';
import Sentencia_Llamada from './Sentencia_Llamada';
import Tabla_Simbolos from './Tabla_Simbolos';

class And extends Expresion
{
    constructor(p_fila : number, p_columna: number, p_operador_izq : Instruction, p_operador_der : Instruction) {
        super(p_fila,p_columna,tipo_operacion.AND,p_operador_izq, p_operador_der);
    }
    
    public analizar(entorno_padre : Entorno, nivel : number)
    {
        let _return : Simbolo;

        try
        {
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.analizar(entorno_padre, nivel);
            let op2 : Simbolo = (this.operador_der == null) ? null : this.operador_der.analizar(entorno_padre, nivel);
            
            if (op1 == null || op2 == null)
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

            if (op2.getRol() != tipo_rol.valor && op2.getRol() != tipo_rol.arreglo)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                return op2;
            }

            if (!(op1.getTipo().getTipo() == tipo_dato.BOOLEANO) || !(op2.getTipo().getTipo() == tipo_dato.BOOLEANO))
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar And con valores no booleanos.");
                return _return;
            }
            else
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO),"");
                _return.setMensaje("And exitoso");
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
            _return.setMensaje("Operacion And: " + Exception.Message);
            return _return;
        }
    }
    
    public traducir(salida: Middle)
    {
        let _return : Simbolo;

        try
        {
            let etiqueta_positiva1 = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_negativa1 = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_positiva2 =  "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_negativa2 =  "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_salida =  "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let temporal_resultado = "t" + Tabla_Simbolos.getInstance().getTemporal();

            let op1 : Simbolo;
            let op2 : Simbolo;
            
            if(this.operador_izq instanceof Sentencia_Llamada && !(this.operador_der instanceof Sentencia_Llamada))
            { 
                op2 = (this.operador_der == null) ? null : this.operador_der.traducir(salida);
                op1 = (this.operador_izq == null) ? null : this.operador_izq.traducir(salida);
            }
            else
            {
                op1 = (this.operador_izq == null) ? null : this.operador_izq.traducir(salida);
                op2 = (this.operador_der == null) ? null : this.operador_der.traducir(salida);
            }

            Middle.getInstance().setOuput(temporal_resultado + " = 1;");
            Middle.getInstance().setOuput("if (" + op1.getMensaje() + ") goto " + etiqueta_positiva1 + ";");
            Middle.getInstance().setOuput("goto " + etiqueta_negativa1 + ";\n");             
            Middle.getInstance().setOuput(etiqueta_positiva1 + ":");             
            Middle.getInstance().setOuput("if (" + op2.getMensaje() + ") goto " + etiqueta_positiva2 + ";");
            Middle.getInstance().setOuput("goto " + etiqueta_negativa2 + ";\n"); 
            Middle.getInstance().setOuput(etiqueta_positiva2 + ":"); 
            Middle.getInstance().setOuput(temporal_resultado + " = 1;"); 
            Middle.getInstance().setOuput("goto " + etiqueta_salida + ";"); 
            Middle.getInstance().setOuput(etiqueta_negativa1 + ":"); 
            Middle.getInstance().setOuput(etiqueta_negativa2 + ":"); 
            Middle.getInstance().setOuput(temporal_resultado + " = 0;"); 
            Middle.getInstance().setOuput(etiqueta_salida + ":"); 

            _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
            _return.setMensaje(temporal_resultado);
            return _return;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error And: " + Error.Mesage);
        }
    }

    public getThis() 
    {    
        return new And(this.fila,this.columna,this.operador_izq.getThis(),this.operador_der.getThis());
    }
}

export default And;