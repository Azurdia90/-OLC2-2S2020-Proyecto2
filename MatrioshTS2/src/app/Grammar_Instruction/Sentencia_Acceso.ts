import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo_Acceso from './Tipo_Acceso';
import Instruction from './Instruction';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Sentencia_Acceso extends Instruction
{
    protected identificador : String;
    protected acceso_tmp    : Simbolo;
    protected dimensiones   : Array<Instruction>;
    protected lista_accesos : Array<Tipo_Acceso>;

    constructor(p_fila: number, p_columna: number, p_id : String, p_dimensiones: Array<Instruction>, p_lista_accesos? : Array<Tipo_Acceso>)
    {
        super(p_fila,p_columna);
        this.identificador = p_id;
        this.dimensiones = p_dimensiones;
        this.lista_accesos = p_lista_accesos;
    }

    public analizar(entorno_padre : Entorno, nivel : number) 
    {
        let _return : Simbolo;
        let _acceso : Simbolo;
        
        try
        {   
            if(this.dimensiones.length == 0)
            {
                if(entorno_padre.existsSimbolo(this.identificador,nivel))
                {
                    _acceso = entorno_padre.getSimbolo(this.identificador,nivel);
                }
                else
                {
                    if(Tabla_Simbolos.getInstance().existsSimbolo_global(this.identificador))
                    {
                        _acceso = Tabla_Simbolos.getInstance().getSimbolo_global(this.identificador);
                    }
                    else
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("La variable: \"" + this.identificador + "\" NO se encuentra en el entorno local.");
                        return _return;
                    }
                }
            }
            else
            {   
                var simbolo_tmp : Simbolo;
                
                if(entorno_padre.existsSimbolo(this.identificador, nivel))
                {                 
                    simbolo_tmp = entorno_padre.getSimbolo(this.identificador, nivel);
                }
                else
                {   
                    simbolo_tmp = Tabla_Simbolos.getInstance().getSimbolo_global(this.identificador);                    
                }   
                
                if(simbolo_tmp.getRol() == tipo_rol.arreglo)
                {
                    var lista_accesos : Array<Number>;
                    var arreglo_tmp   : Array<Simbolo>;
                    var lista_tamaños : Array<Number>;

                    lista_accesos = new Array<Number>();

                    for(var x = 0; x < this.dimensiones.length; x++)
                    {
                        var val_tmp: Simbolo;
                        val_tmp = this.dimensiones[x].analizar(entorno_padre,nivel);

                        if(val_tmp.getRol() == tipo_rol.valor && val_tmp.getTipo().getTipo() == tipo_dato.NUMERO)
                        {
                            lista_accesos.push(Number(val_tmp.getMensaje()));
                        }
                        else if(val_tmp.getRol() == tipo_rol.error && val_tmp.getTipo().getTipo() == tipo_dato.CADENA)
                        {
                            this.entorno_padre = entorno_padre;
                            this.nivel = nivel;
                            return val_tmp;
                        }
                        else
                        {
                            this.entorno_padre = entorno_padre;
                            this.nivel = nivel;

                            _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje("Sentencia Acceso: El valor de acceso debe ser tipo númerico.");
                            return _return;
                        }
                    }

                    arreglo_tmp = <Array<Simbolo>> simbolo_tmp.getMensaje();
                    lista_tamaños = <Array<Number>> simbolo_tmp.getListaDimensiones();

                    if(arreglo_tmp.length > 0 && lista_tamaños.length > 0)
                    {
                        var pos_rel : Number;
                        pos_rel = 0;

                        if(lista_tamaños.length == lista_accesos.length)
                        {
                            pos_rel =  lista_accesos[0].valueOf();

                            for(var y: number = 1; y < lista_accesos.length; y++)
                            {
                                pos_rel = (pos_rel.valueOf() * lista_tamaños[y].valueOf()) + lista_accesos[y].valueOf();
                            }

                            if(pos_rel < 0)
                            {
                                _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                                _return.setFila(this.fila);
                                _return.setColumna(this.columna);
                                _return.setMensaje("Sentencia Acceso: Los valores de acceso no deben ser valores negativos.");
                            }
                            else
                            {
                                if(pos_rel < arreglo_tmp.length)
                                {
                                    _return = arreglo_tmp[pos_rel.valueOf()];
                                    _acceso = _return;
                                }
                                else
                                {
                                    _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                                    _return.setFila(this.fila);
                                    _return.setColumna(this.columna);
                                    _return.setMensaje("Sentencia Acceso: El valor de las posiciones de acceso es mayor al tamaño del arreglo.");
                                }
                            }
                        }
                        else
                        {
                            _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje("Sentencia Acceso: El cantidad de accesos no coincide con las dimensiones del arreglo.");
                        }
                    }
                    else
                    {   
                        _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Sentencia Acceso: El arreglo no a sido instanciado.");
                    }

                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;
                    return _return;
                }
                else if(simbolo_tmp.getRol() == tipo_rol.error)
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = simbolo_tmp;
                    return _return;
                }
                else
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Sentencia Acceso: Se especificaron dimension(es) de acceso para un No arreglo.");
                    return _return;
                } 
            }

            if(this.lista_accesos.length == 0)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Operador Acceso: No existen accesos definidos.");
                return _return;
            }
            this.acceso_tmp = _acceso;
            
            for(var cont = 0; cont < this.lista_accesos.length; cont++)
            {
                if(_acceso.getRol() == tipo_rol.valor)
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Operador Acceso: No existen accesos definidos para un valor primitivo.");
                    return _return;
                }
                else if(_acceso.getRol() == tipo_rol.arreglo)
                {
                    this.lista_accesos[cont].setPadre(_acceso);
                    _acceso = this.lista_accesos[cont].analizar(entorno_padre, nivel);
                }
                else if(_acceso.getRol() == tipo_rol.type)
                {
                    this.lista_accesos[cont].setPadre(_acceso);
                    _acceso = this.lista_accesos[cont].analizar(entorno_padre, nivel);
                }
                else if(_acceso.getRol() == tipo_rol.error)
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    return _acceso;
                }
                else
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Operador Acceso: No existen accesos definidos.");
                    return _return;
                }
            }

            this.entorno_padre = entorno_padre;
            this.nivel = nivel;

            return _acceso;
        }
        catch(Exception)
        {
            this.entorno_padre = entorno_padre;
            this.nivel = nivel;
            
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Acceso " + this.identificador + ": " + Exception.Message);
            return _return;
        }
    }

    public traducir(salida : Middle) 
    {
        let _return : Simbolo;
        
        try
        {   
            for(var cont = 0; cont < this.lista_accesos.length; cont++)
            {
                if(this.acceso_tmp.getRol() == tipo_rol.valor)
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Operador Acceso: No existen accesos definidos para un valor primitivo.");
                    return _return;
                }
                else if(this.acceso_tmp.getRol() == tipo_rol.arreglo)
                {
                    this.lista_accesos[cont].setPadre(this.acceso_tmp);
                    this.acceso_tmp = this.lista_accesos[cont].traducir(salida);   
                }
                else if(this.acceso_tmp.getRol() == tipo_rol.type)
                {    
                    this.lista_accesos[cont].setPadre(this.acceso_tmp);
                    this.acceso_tmp = this.lista_accesos[cont].traducir(salida);
                }
                else if(this.acceso_tmp.getRol() == tipo_rol.error)
                {
                    return this.acceso_tmp;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Operador Acceso: No existen accesos definidos.");
                    return _return;
                }
            }
            console.log(this.acceso_tmp);
            return this.acceso_tmp;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("Error Sentencia Acceso: " + Error.Mesage);
        }
    }

    public getThis() 
    {
        var clon_dimensiones : Array<Instruction>;
        var lista_clon       : Array<Tipo_Acceso>;
        
        clon_dimensiones = Array<Instruction>();
        lista_clon = new Array<Tipo_Acceso>();
        
        for(var x = 0; x < this.dimensiones.length; x++)            
        {   
            clon_dimensiones.push(this.dimensiones[x].getThis());
        }
        
        for(var y = 0; y < this.lista_accesos.length; y++)            
        {   
            lista_clon.push(this.lista_accesos[y].getThis());
        }
                
        return new Sentencia_Acceso(this.fila,this.columna,this.identificador,clon_dimensiones,lista_clon);
    }
}

export default Sentencia_Acceso;