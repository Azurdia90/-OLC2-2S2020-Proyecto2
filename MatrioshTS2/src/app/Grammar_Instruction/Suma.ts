import Expresion from './Expresion';
import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Tabla_Simbolos from './Tabla_Simbolos';
import Entorno from './Entorno';

class Suma extends Expresion
{
    protected matriz_operacion_suma : tipo_operacion_resultado[][] = 
    [   /*                                      void                            nulo                           booleano                                numero                                 cadena                       identificador                          error 
        /*void*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*nulo*/          [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*booleano*/      [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*numero*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.suma_numero,   tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*String*/        [ tipo_operacion_resultado.error, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.concatenacion, tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*identificador*/ [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error],
        /*error*/         [ tipo_operacion_resultado.error, tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error,         tipo_operacion_resultado.error, tipo_operacion_resultado.error],
    ];

    constructor(p_fila : number, p_columna : number, p_operador_izq : Instruction, p_operador_der : Instruction)
    {
        super(p_fila,p_columna,tipo_operacion.SUMA,p_operador_izq,p_operador_der);
    }

    public analizar(entorno_padre : Entorno, salida : Middle)
    {
        let _return : Simbolo;
        
        try
        {
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.analizar(entorno_padre, salida);
            let op2 : Simbolo = (this.operador_der == null) ? null : this.operador_der.analizar(entorno_padre, salida);
            
            let tipo_suma :tipo_operacion_resultado;

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

            tipo_suma = this.matriz_operacion_suma[op1.getTipo().getTipo()] [op2.getTipo().getTipo()];

            switch(tipo_suma)
            {
                case tipo_operacion_resultado.suma_numero:
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO), "");
                    _return.setMensaje("Suma númerica exitosa");
                    return _return;

                case tipo_operacion_resultado.concatenacion:
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA), "");
                    _return.setMensaje("Concatenación exitosa");
                    return _return;
                default:
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("No es posible realizar una Suma del tipo: " + op1.getTipo().getTraduccion()  +  " + " + op2.getTipo().getTraduccion());
                    return _return;
            }

        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Operacion Suma: " + Exception.Message);
            return _return;
            
        }
    }

    public traducir(entorno_padre : Entorno, salida : Middle)
    {
        let _return : Simbolo;
        
        try
        {
            let op1 : Simbolo = (this.operador_izq == null) ? null : this.operador_izq.traducir(entorno_padre, salida);
            let op2 : Simbolo = (this.operador_der == null) ? null : this.operador_der.traducir(entorno_padre, salida);
            
            let tipo_suma :tipo_operacion_resultado;

            if (op1.getRol() != tipo_rol.valor && op1.getRol() != tipo_rol.arreglo)
            {
                return op1;
            }

            if (op2.getRol() != tipo_rol.valor && op2.getRol() != tipo_rol.arreglo)
            {
                return op2;
            }

            tipo_suma = this.matriz_operacion_suma[op1.getTipo().getTipo()] [op2.getTipo().getTipo()];

            switch(tipo_suma)
            {
                case tipo_operacion_resultado.suma_numero:
                    let etiqueta_actual = Tabla_Simbolos.getInstance().getTemporal();
                    Middle.getInstance().setOuput("t" + etiqueta_actual + " = " + op1.getMensaje().toString() + " + " + op2.getMensaje().toString() + ";");               
      
                    _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO), "");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("t" + etiqueta_actual);
                    return _return;
                case tipo_operacion_resultado.concatenacion:
                    
                    if(op1.getTipo().Equals(new Tipo(tipo_dato.CADENA)) && op2.getTipo().Equals(new Tipo(tipo_dato.CADENA)))
                    {
                        let tam_metodo = 0;
                        let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                                                                                
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op1.getMensaje() + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  3;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op2.getMensaje() + ";");
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("concatenacion_cadena();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                    
                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA), "");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje(temporal_retorno);
                        return _return;
                    }
                    else if(op1.getTipo().Equals(new Tipo(tipo_dato.BOOLEANO)) && op2.getTipo().Equals(new Tipo(tipo_dato.CADENA)))
                    {
                        let tam_metodo = 0;
                        let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                                                                                
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op1.getMensaje() + ";");                        
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("cast_boolean_cadena();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                        
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + temporal_retorno + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  3;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op2.getMensaje() + ";");
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("concatenacion_cadena();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                        
                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA), "");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje(temporal_retorno);
                        return _return;
                    }
                    else if(op1.getTipo().Equals(new Tipo(tipo_dato.CADENA)) && op2.getTipo().Equals(new Tipo(tipo_dato.BOOLEANO)))
                    {
                        let tam_metodo = 0;
                        let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                                                                                
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op2.getMensaje() + ";");                        
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("cast_boolean_cadena();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                        
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op1.getMensaje() + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  3;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + temporal_retorno + ";");
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("concatenacion_cadena();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                        
                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA), "");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje(temporal_retorno);
                        return _return;
                    }
                    else if(op1.getTipo().Equals(new Tipo(tipo_dato.NUMERO)) && op2.getTipo().Equals(new Tipo(tipo_dato.CADENA)))
                    {
                        let tam_metodo = 0;
                        let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                                                                                
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op1.getMensaje() + ";");                        
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("cast_numero_cadena();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                        
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + temporal_retorno + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  3;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op2.getMensaje() + ";");
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("concatenacion_cadena();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                        
                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA), "");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje(temporal_retorno);
                        return _return;
                    }
                    else if(op1.getTipo().Equals(new Tipo(tipo_dato.CADENA)) && op2.getTipo().Equals(new Tipo(tipo_dato.NUMERO)))
                    {
                        let tam_metodo = 0;
                        let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                                                                                
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op2.getMensaje() + ";");                        
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("cast_numero_cadena();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                        
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + op1.getMensaje() + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  3;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + temporal_retorno + ";");
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("concatenacion_cadena();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                        
                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA), "");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje(temporal_retorno);
                        return _return;
                    }
                    else
                    {
                        _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("No es posible realizar una Suma del tipo: " + op1.getTipo().getTraduccion()  +  " + " + op2.getTipo().getTraduccion());
                        return _return;
                    }
                    
                default:
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("No es posible realizar una Suma del tipo: " + op1.getTipo().getTraduccion()  +  " + " + op2.getTipo().getTraduccion());
                    return _return;
            }

        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("Error Suma: " + Error.Mesage);
        }
    }

    public getThis() 
    {
        return new Suma(this.fila,this.columna,this.operador_izq.getThis(),this.operador_der.getThis());
    }
}

export default Suma;