import Sentencia_Llamada from './Sentencia_Llamada';
import Instruction from './Instruction';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';


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
    
    public analizar(entorno_padre : Entorno, salida : Middle) 
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
                        return type_rel.get(this.expresion3);
                    }
                    else
                    {
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
                        var arreglo_tmp: Array<Simbolo>;
                        arreglo_tmp = <Array<Simbolo>> this.padre.getMensaje();

                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),"");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Dimensión de arreglo exitosa");
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
                {    //console.log(this.expresion2);
                    (<Sentencia_Llamada> this.expresion2).setGlobal(false);

                    (<Sentencia_Llamada> this.expresion2).setPadre(this.padre);
                    
                    _return = this.expresion2.analizar(entorno_padre, salida);

                    return _return;
                }
                else if(this.padre.getRol() == tipo_rol.arreglo)
                {
                    (<Sentencia_Llamada> this.expresion2).setGlobal(false);

                    (<Sentencia_Llamada> this.expresion2).setPadre(this.padre);
                    
                    _return = this.expresion2.analizar(entorno_padre, salida);

                    return _return;
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
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Tipo Acceso: " + Exception.Message);
            return _return;        
        }        
    }

    public traducir(entorno_padre : Entorno, salida : Middle) 
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
                        var arreglo_tmp: Array<Simbolo>;
                        arreglo_tmp = <Array<Simbolo>> this.padre.getMensaje();

                        _return = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),"");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Dimensión de arreglo exitosa");
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
                    
                    _return = this.expresion2.traducir(entorno_padre, salida);

                    return _return;
                }
                else if(this.padre.getRol() == tipo_rol.arreglo)
                {
                    (<Sentencia_Llamada> this.expresion2).setGlobal(false);

                    (<Sentencia_Llamada> this.expresion2).setPadre(this.padre);
                    
                    _return = this.expresion2.traducir(entorno_padre, salida);

                    return _return;
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