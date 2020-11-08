import Instruction from './Instruction';
import Expresion from './Expresion';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Tabla_Simbolos from './Tabla_Simbolos';
import Sentencia_Llamada from './Sentencia_Llamada';

class Igual_Que extends Expresion
{
    protected matriz_operacion_igual_que : tipo_operacion_resultado[][] = 
    [   /*                                      void                            nulo                           booleano                         numero                                        cadena                                       identificador                          error 
        /*void*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,      tipo_operacion_resultado.error,          tipo_operacion_resultado.error,                 tipo_operacion_resultado.error,                 tipo_operacion_resultado.error,      tipo_operacion_resultado.error],
        /*nulo*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.igual_nulo, tipo_operacion_resultado.igual_nulo,     tipo_operacion_resultado.igual_nulo,            tipo_operacion_resultado.igual_nulo,            tipo_operacion_resultado.igual_nulo, tipo_operacion_resultado.error],
        /*booleano*/      [ tipo_operacion_resultado.error, tipo_operacion_resultado.igual_nulo, tipo_operacion_resultado.igual_booleano, tipo_operacion_resultado.error,                 tipo_operacion_resultado.error,                 tipo_operacion_resultado.error,      tipo_operacion_resultado.error],
        /*numero*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.igual_nulo, tipo_operacion_resultado.error,          tipo_operacion_resultado.igual_numerico,        tipo_operacion_resultado.igual_numerico_cadena, tipo_operacion_resultado.error,      tipo_operacion_resultado.error],
        /*String*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.igual_nulo, tipo_operacion_resultado.error,          tipo_operacion_resultado.igual_cadena_numerico, tipo_operacion_resultado.igual_cadena,          tipo_operacion_resultado.error,      tipo_operacion_resultado.error],
        /*identificador*/ [ tipo_operacion_resultado.error, tipo_operacion_resultado.igual_nulo, tipo_operacion_resultado.error,          tipo_operacion_resultado.error,                 tipo_operacion_resultado.error,                 tipo_operacion_resultado.error,      tipo_operacion_resultado.error],
        /*error*/         [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,      tipo_operacion_resultado.error,          tipo_operacion_resultado.error,                 tipo_operacion_resultado.error,                 tipo_operacion_resultado.error,      tipo_operacion_resultado.error],
    ];

    constructor(p_fila : number, p_columna : number, p_operador_izq : Instruction, p_operador_der : Instruction)
    {
        super(p_fila,p_columna,tipo_operacion.IGUAL_QUE,p_operador_izq,p_operador_der);
    }

    public analizar(entorno_padre : Entorno, nivel : number)
    {
        let _return : Simbolo;
        
        try
        {   
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.analizar(entorno_padre, nivel);
            let op2 : Simbolo = (this.operador_der == null) ? null : this.operador_der.analizar(entorno_padre, nivel);
           
            let tipo_igual_que :tipo_operacion_resultado;

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

            if (op1.getRol() != tipo_rol.valor && op1.getRol() != tipo_rol.arreglo && op1.getRol() != tipo_rol.type)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                return op1;
            }

            if (op2.getRol() != tipo_rol.valor && op2.getRol() != tipo_rol.arreglo && op2.getRol() != tipo_rol.type)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                return op2;
            }

            tipo_igual_que = this.matriz_operacion_igual_que[op1.getTipo().getTipo()] [op2.getTipo().getTipo()];

            switch(tipo_igual_que)
            {
                case tipo_operacion_resultado.igual_nulo:
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje("Igual Que exitoso");
                    return _return;
                case tipo_operacion_resultado.igual_booleano:
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje("Igual Que exitoso");
                    return _return;
                case tipo_operacion_resultado.igual_numerico:
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje("Igual Que exitoso");
                    return _return;
                case tipo_operacion_resultado.igual_cadena_numerico:
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje("Igual Que exitoso");
                    return _return;
                case tipo_operacion_resultado.igual_numerico_cadena:
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje("Igual Que exitoso");
                    return _return;
                case tipo_operacion_resultado.igual_cadena:
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje("Igual Que exitoso");
                    return _return;
                default:
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("No es posible realizar una Comparación Igual Que del tipo: " + op1.getTipo().getTraduccion()  +  " * " + op2.getTipo().getTraduccion());
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
            _return.setMensaje("Operacion Igual Que: " + Exception.Message);
            return _return;
        }
    }

    public traducir(salida : Middle)
    {
        let _return : Simbolo;
        
        try
        {
            let tam_metodo;
            let temporal_simulado;
            let temporal_contador;
            let temporal_pos_return;
            let temporal_retorno;
            let etiqueta_actual;

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

            let tipo_igual_que :tipo_operacion_resultado;
        
            tipo_igual_que = this.matriz_operacion_igual_que[op1.getTipo().getTipo()] [op2.getTipo().getTipo()];

            switch(tipo_igual_que)
            {
                case tipo_operacion_resultado.igual_nulo:
                    //pendiente

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje("Igual Que exitoso");
                    return _return;
                case tipo_operacion_resultado.igual_booleano:
                    etiqueta_actual = op1.getMensaje().toString() + " == " + op2.getMensaje().toString(); 

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje(etiqueta_actual);
                    return _return;
                case tipo_operacion_resultado.igual_numerico:
                    etiqueta_actual = op1.getMensaje().toString() + " == " + op2.getMensaje().toString(); 

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje(etiqueta_actual);
                    return _return;
                case tipo_operacion_resultado.igual_cadena_numerico:
                    tam_metodo = this.entorno_padre.getSize();
                    temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                                                                                
                    Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                    Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                    Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op1.getMensaje() + ";");
                    Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                    Middle.getInstance().setOuput("cast_cadena_numero();");
                    Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                    Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                    Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");

                    etiqueta_actual = temporal_retorno + " != " + op2.getMensaje().toString(); 
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje(etiqueta_actual);
                    return _return;
                case tipo_operacion_resultado.igual_numerico_cadena:
                    tam_metodo = this.entorno_padre.getSize();
                    temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                                                                                
                    Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                    Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                    Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op2.getMensaje() + ";");
                    Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                    Middle.getInstance().setOuput("cast_cadena_numero();");
                    Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                    Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                    Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");

                    etiqueta_actual = op1.getMensaje().toString() + " != " + temporal_retorno; 

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje(etiqueta_actual);
                    return _return;
                case tipo_operacion_resultado.igual_cadena:
                    tam_metodo = this.entorno_padre.getSize();

                    temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                                                                                
                    let temporal_simulado2    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    let temporal_contador2   = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    let temporal_pos_return2  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    let temporal_retorno2     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                                                                                
                    Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                    Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                    Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op1.getMensaje() + ";");
                    Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                    Middle.getInstance().setOuput("cast_cadena_numero();");
                    Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                    Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                    Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");

                    Middle.getInstance().setOuput(temporal_simulado2 + " = P + " +  tam_metodo + ";");
                    Middle.getInstance().setOuput(temporal_contador2 + " = " + temporal_simulado2 + " +  2;");
                    Middle.getInstance().setOuput("Stack[(int)" + temporal_contador2 + "] = " + op2.getMensaje() + ";");
                    Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                    Middle.getInstance().setOuput("cast_cadena_numero();");
                    Middle.getInstance().setOuput(temporal_pos_return2 + " = P + 1;");
                    Middle.getInstance().setOuput(temporal_retorno2 + " = Stack[(int)" + temporal_pos_return2 + "];");
                    Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");

                    etiqueta_actual = temporal_retorno + " != " + temporal_retorno2; 

                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.BOOLEANO), "");
                    _return.setMensaje(etiqueta_actual);
                    return _return;
                default:
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("No es posible realizar una Comparación Igual Que del tipo: " + op1.getTipo().getTraduccion()  +  " * " + op2.getTipo().getTraduccion());
                    return _return;
            }
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("Error Igual Que: " + Error.Mesage);
        }
    }

    public getThis() 
    {
        return new Igual_Que(this.fila,this.columna,this.operador_izq.getThis(),this.operador_der.getThis());
    }

}

export default Igual_Que;