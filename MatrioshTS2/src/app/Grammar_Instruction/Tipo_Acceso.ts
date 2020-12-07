import Sentencia_Llamada from './Sentencia_Llamada';
import Instruction from './Instruction';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Tabla_Simbolos from './Tabla_Simbolos';

class Tipo_Acceso extends Instruction
{
    private tipo : number;
    
    private expresion1 : Instruction;
    private expresion2 : Instruction;
    private expresion3 : String;
    
    private padre : Simbolo;
        
    public constructor(p_fila : number, p_columna: number, p_tipo : number, expresion1? : Instruction, expresion2? : Instruction, expresion3? : String)
    {
        super(p_fila,p_columna);

        this.tipo = p_tipo;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
        this.expresion3 = expresion3;
    }
    
    public analizar(entorno_padre : Entorno, nivel: number) 
    {
        let _return : Simbolo;
        
        try
        {
            if(this.tipo == 0)
            {   
                if(this.padre.getRol() == tipo_rol.type)
                {
                    var type_rel : Map<String,Simbolo>;

                    type_rel = <Map<String,Simbolo>>this.padre.getMensaje();

                    if(type_rel.has(this.expresion3))
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        return type_rel.get(this.expresion3);
                    }
                    else
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Error Operador Acceso: El atributo " + this.expresion3 + " no existe aún.");
                        return _return;
                    }
                }
                else if(this.padre.getRol() == tipo_rol.arreglo)
                {   
                    if(this.expresion3 == "length")
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),"");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Dimensión de arreglo exitosa");
                        return _return;
                    }
                    else
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Error Operador Acceso: El atributo " + this.expresion3 + " no existe aún.");
                        return _return;
                    }
                }
                else if(this.padre.getRol() == tipo_rol.valor)
                {
                    if(this.expresion3 == "length")
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),"");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Dimensión de cadena exitosa");
                        return _return;
                    }
                    else
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Error Operador Acceso: El atributo " + this.expresion3 + " no existe aún.");
                        return _return;
                    }
                }
                else
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types y arregloss.");
                    return _return;
                }
            }
            else if(this.tipo == 1)
            {
                if(this.padre.getRol() == tipo_rol.type)
                {    //console.log(this.expresion2);
                    (<Sentencia_Llamada> this.expresion2).setGlobal(false);

                    (<Sentencia_Llamada> this.expresion2).setPadre(this.padre);
                    
                    _return = this.expresion2.analizar(entorno_padre, nivel);
                    
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;
                    return _return;
                }
                else if(this.padre.getRol() == tipo_rol.arreglo)
                {
                    (<Sentencia_Llamada> this.expresion2).setGlobal(false);

                    (<Sentencia_Llamada> this.expresion2).setPadre(this.padre);
                    
                    _return = this.expresion2.analizar(entorno_padre, nivel);

                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;
                    return _return;
                }
                else if(this.padre.getRol() == tipo_rol.valor)
                {
                    if(this.padre.getTipo().Equals(new Tipo(tipo_dato.CADENA)))
                    {
                        let llamada_aux = <Sentencia_Llamada> this.expresion2;
                        console.log(llamada_aux.getIdentificador());
                        if(llamada_aux.getIdentificador() == "toLowerCase")
                        {
                            this.entorno_padre = entorno_padre;
                            this.nivel = nivel;

                            _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),"");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje("Metodo de cadena exitosa");
                            return _return;
                        }
                        if(llamada_aux.getIdentificador() == "toUpperCase")
                        {
                            this.entorno_padre = entorno_padre;
                            this.nivel = nivel;

                            _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),"");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje("Metodo de cadena exitosa");
                            return _return;
                        }
                        else
                        {
                            this.entorno_padre = entorno_padre;
                            this.nivel = nivel;

                            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje("Error Operador Acceso: La función " + llamada_aux.getIdentificador() + " no existe aún.");
                            return _return;
                        }    
                    }
                    else
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types y Arreglos.");
                        return _return;
                    }
                }
                else
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types y Arreglos.");
                    return _return;
                }
            }      
            else
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Error Valor Acceso: Tipo de Acceso no definido ");
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
            _return.setMensaje("Tipo Acceso: " + Exception.Message);
            return _return;        
        }        
    }

    public traducir(salida : Middle) 
    {
        let _return : Simbolo;
        
        try
        {
            if(this.tipo == 0)
            {   
                if(this.padre.getRol() == tipo_rol.type)
                {
                    var type_rel : Map<String,Simbolo>;

                    type_rel = <Map<String,Simbolo>>this.padre.getMensaje();

                    return type_rel.get(this.expresion3);

                }
                else if(this.padre.getRol() == tipo_rol.arreglo)
                {   
                    if(this.expresion3 == "length")
                    {
                        let tam_metodo = this.entorno_padre.getSize();

                        let temporal_pos_stack    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_pos_heap    = "t" + Tabla_Simbolos.getInstance().getTemporal();

                        let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        
                        Middle.getInstance().setOuput("");
                        Middle.getInstance().setOuput(temporal_pos_stack + " = P + " +  this.padre.getPos_S() + ";");
                        Middle.getInstance().setOuput(temporal_pos_heap + " = Stack[(int)" +  temporal_pos_stack + "];");
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + temporal_pos_heap + ";");
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("length_array();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                    
                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO), "");
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
                        _return.setMensaje("Error Operador Acceso: El atributo " + this.expresion3 + " no existe aún.");
                        return _return;
                    }
                }
                else if(this.padre.getRol() == tipo_rol.valor)
                {   
                    if(this.expresion3 == "length")
                    {
                        let tam_metodo = this.entorno_padre.getSize();

                        let temporal_pos_stack    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_pos_heap    = "t" + Tabla_Simbolos.getInstance().getTemporal();

                        let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                        
                        Middle.getInstance().setOuput("");
                        Middle.getInstance().setOuput(temporal_pos_stack + " = P + " +  this.padre.getPos_S() + ";");
                        Middle.getInstance().setOuput(temporal_pos_heap + " = Stack[(int)" +  temporal_pos_stack + "];");
                        Middle.getInstance().setOuput(temporal_simulado + " = P + " +  tam_metodo + ";");
                        Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                        Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + temporal_pos_heap + ";");
                        Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                        Middle.getInstance().setOuput("length_string();");
                        Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                        Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                        Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                    
                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO), "");
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
                        _return.setMensaje("Error Operador Acceso: El atributo " + this.expresion3 + " no existe aún.");
                        return _return;
                    }
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types y arregloss.");
                    return _return;
                }
            }
            else if(this.tipo == 1)
            {
                if(this.padre.getRol() == tipo_rol.type)
                {   
                    (<Sentencia_Llamada> this.expresion2).setGlobal(false);

                    (<Sentencia_Llamada> this.expresion2).setPadre(this.padre);
                    
                    _return = this.expresion2.traducir(salida);

                    return _return;
                }
                else if(this.padre.getRol() == tipo_rol.arreglo)
                {
                    (<Sentencia_Llamada> this.expresion2).setGlobal(false);

                    (<Sentencia_Llamada> this.expresion2).setPadre(this.padre);
                    
                    _return = this.expresion2.traducir(salida);

                    return _return;
                }
                else if(this.padre.getRol() == tipo_rol.valor)
                {   
                    if(this.padre.getTipo().Equals(new Tipo(tipo_dato.CADENA)))
                    {
                        let llamada_aux = <Sentencia_Llamada>this.expresion2;
                        console.log(llamada_aux.getIdentificador());
                        if(llamada_aux.getIdentificador() == "toLowerCase")
                        {   
                            let tam_metodo = this.entorno_padre.getSize();
                            let temporal_pos_stack    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            let temporal_pos_heap    = "t" + Tabla_Simbolos.getInstance().getTemporal();

                            let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            let temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            
                            Middle.getInstance().setOuput("");
                            Middle.getInstance().setOuput(temporal_pos_stack + " = P + " +  this.padre.getPos_S() + ";");
                            Middle.getInstance().setOuput(temporal_pos_heap + " = Stack[(int)" +  temporal_pos_stack + "];");
                            Middle.getInstance().setOuput(temporal_simulado + " = P + " + tam_metodo + ";");
                            Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                            Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + temporal_pos_heap + ";");
                            Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                            Middle.getInstance().setOuput("toLowerCase_String();");
                            Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                            Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                            Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                
                            _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),"");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje(temporal_retorno);
                            return _return;
                        }
                        else if(llamada_aux.getIdentificador() == "toUpperCase")
                        {
                            let tam_metodo = this.entorno_padre.getSize();
                            let temporal_pos_stack    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            let temporal_pos_heap    = "t" + Tabla_Simbolos.getInstance().getTemporal();

                            let temporal_simulado    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            let temporal_contador    = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            let temporal_pos_return  = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            let temporal_retorno     = "t" + Tabla_Simbolos.getInstance().getTemporal();
                            
                            Middle.getInstance().setOuput("");
                            Middle.getInstance().setOuput(temporal_pos_stack + " = P + " +  this.padre.getPos_S() + ";");
                            Middle.getInstance().setOuput(temporal_pos_heap + " = Stack[(int)" +  temporal_pos_stack + "];");
                            Middle.getInstance().setOuput(temporal_simulado + " = P + " + tam_metodo + ";");
                            Middle.getInstance().setOuput(temporal_contador + " = " + temporal_simulado + " +  2;");
                            Middle.getInstance().setOuput("Stack[(int)" + temporal_contador + "] = " + temporal_pos_heap + ";");
                            Middle.getInstance().setOuput("P = P + " + tam_metodo + ";");                
                            Middle.getInstance().setOuput("toUpperCase_String();");
                            Middle.getInstance().setOuput(temporal_pos_return + " = P + 1;");
                            Middle.getInstance().setOuput(temporal_retorno + " = Stack[(int)" + temporal_pos_return + "];");
                            Middle.getInstance().setOuput("P = P - " + tam_metodo + ";");
                
                            _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),"");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje(temporal_retorno);
                            return _return;
                        }
                    }
                    else
                    {
                        _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types y Arreglos.");
                        return _return;
                    }
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Error Operador Acceso: Este tipo de acceso es válido unicamente para Types y Arreglos.");
                    return _return;
                }
            }      
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Error Valor Acceso: Tipo de Acceso no definido ");
                return _return;
            }
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("Error Tipo Acceso: " + Error.Mesage);      
        }        
    }

    public getTipo() 
    {
        return this.tipo;
    }

    public getPadre()
    {
        return this.padre
    }

    public setPadre(padre : Simbolo)
    {
        this.padre = padre;
    }

    public getThis() 
    {   
        return new Tipo_Acceso(this.fila, this.columna, this.tipo, this.expresion1 == undefined ? undefined : this.expresion1.getThis(), this.expresion2 == undefined ? undefined : this.expresion2.getThis(), this.expresion3 == undefined ? "" : this.expresion3);
    }

}

export default Tipo_Acceso;