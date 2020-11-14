import Instruction from './Instruction';
import Expresion from './Expresion';
import Simbolo from './Simbolo';
import Entorno from './Entorno';
import Middle from './Middle';
import Tipo from './Tipo';
import Tabla_Simbolos from './Tabla_Simbolos';

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

    public traducir(salida: Middle)
    {
        let _return : Simbolo;

        try
        {
            let etiqueta_positiva = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_negativa = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let etiqueta_salida = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
            let temporal_resultado = "t" + Tabla_Simbolos.getInstance().getTemporal();

            let op1 : Simbolo;

            op1 = (this.operador_izq == null) ? null : this.operador_izq.traducir(salida);

            Middle.getInstance().setOuput(temporal_resultado + " == 1;");
            Middle.getInstance().setOuput("if (" + op1.getMensaje() + ") goto " + etiqueta_positiva + ";");
            Middle.getInstance().setOuput( "goto " + etiqueta_negativa + ";"); 
            Middle.getInstance().setOuput(etiqueta_positiva + ":"); 
            Middle.getInstance().setOuput(temporal_resultado + " = 0;"); 
            Middle.getInstance().setOuput("goto " + etiqueta_salida + ";"); 
            Middle.getInstance().setOuput(etiqueta_negativa + ":\n");  
            Middle.getInstance().setOuput(temporal_resultado + " = 1;"); 
            Middle.getInstance().setOuput(etiqueta_salida + ":"); 

            _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
            _return.setMensaje(temporal_resultado);
            return _return;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Not: " + Error.Mesage);
        }
    }
    
    public getThis() 
    {
        return new Not(this.fila,this.columna,this.operador_izq.getThis());
    }
}

export default Not;