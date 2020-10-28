import Instruction from './Instruction';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tabla_Simbolos from './Tabla_Simbolos';
import Entorno from './Entorno';

class Sentencia_Asignacion extends Instruction
{
    protected tipo : Number;
    protected acceso0 : String;
    protected acceso1 : Array<Instruction>;
    protected acceso2 : Instruction;
    protected valor :   Instruction;

    constructor(p_fila: number, p_columna: number, p_tipo : Number, p_acceso0? : String,  p_acceso1? : Array<Instruction>, p_acceso2? : Instruction, p_valor? : Instruction)
    {
        super(p_fila,p_columna);
        
        this.tipo = p_tipo;
        this.acceso0 = p_acceso0;
        this.acceso1 = p_acceso1;
        this.acceso2 = p_acceso2;
        this.valor = p_valor;
    }

    public ejecutar(entorno_padre : Entorno, salida : Middle)
    {
        let _return : Simbolo;
        let _acceso : Simbolo;
        let _val_fin : Simbolo;

        try
        {   //console.log(this.tipo);
            if(this.tipo == 0)
            {
                if(entorno_padre.has(this.acceso0))
                {                 
                    _acceso  = entorno_padre.get(this.acceso0);
                }
                else
                {   
                    _acceso = Tabla_Simbolos.getInstance().getStack().getSimbolo(this.acceso0);                    
                }   
            }
            else if(this.tipo == 1)
            {
                var simbolo_tmp : Simbolo;

                if(entorno_padre.has(this.acceso0))
                {                 
                    simbolo_tmp = entorno_padre.get(this.acceso0);
                }
                else
                {   
                    simbolo_tmp = Tabla_Simbolos.getInstance().getStack().getSimbolo(this.acceso0);                    
                }   
                
                if(simbolo_tmp.getRol() == tipo_rol.arreglo)
                {
                    var lista_accesos : Array<Number>;
                    var arreglo_tmp   : Array<Simbolo>;
                    var lista_tamaños : Array<Number>;

                    lista_accesos = new Array<Number>();

                    for(var x = 0; x < this.acceso1.length; x++)
                    {
                        var val_tmp: Simbolo;
                        val_tmp = this.acceso1[x].analizar(entorno_padre,salida);

                        if(val_tmp.getRol() == tipo_rol.valor && val_tmp.getTipo().getTipo() == tipo_dato.NUMERO)
                        {
                            lista_accesos.push(Number(val_tmp.getMensaje()));
                        }
                        else if(val_tmp.getRol() == tipo_rol.error && val_tmp.getTipo().getTipo() == tipo_dato.CADENA)
                        {
                            return val_tmp;
                        }
                        else
                        {
                            _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje("Sentencia Asignación: El valor de acceso debe ser tipo númerico.");
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
                                _return.setMensaje("Sentencia Asignación: Los valores de acceso no deben ser valores negativos.");
                                return _return;
                            }
                            else
                            {
                                if(pos_rel < arreglo_tmp.length)
                                {
                                    _acceso = arreglo_tmp[pos_rel.valueOf()];
                                }
                                else
                                {
                                    _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                                    _return.setFila(this.fila);
                                    _return.setColumna(this.columna);
                                    _return.setMensaje("Sentencia Asignación: El valor de las posiciones de acceso es mayor al tamaño del arreglo.");
                                    return _return;
                                }
                            }
                        }
                        else
                        {
                            _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje("Sentencia Asignación: El cantidad de accesos no coincide con las dimensiones del arreglo.");
                            return _return;
                        }
                    }
                    else
                    {   
                        _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Sentencia Asignación: El arreglo no a sido instanciado.");
                        return _return;
                    }
                }
                else if(simbolo_tmp.getRol() == tipo_rol.error)
                {
                    _return = simbolo_tmp;
                    return _return;
                }
                else
                {
                    _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    _return.setMensaje("Sentencia Asignación: Se especificaron dimension(es) de acceso para un No arreglo.");
                    return _return;
                } 
            }
            else if(this.tipo == 2)
            {
                _acceso = this.acceso2.analizar(entorno_padre, salida);
            }
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                _return.setMensaje("Sentencia Asignación: El tipo de asignación no definido.");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                return _return;
            }
            
            if(_acceso.getRol() != tipo_rol.valor && _acceso.getRol() != tipo_rol.arreglo && _acceso.getRol() != tipo_rol.type)
            {
                return _acceso
            }
            //console.log("==========");console.log(_acceso); console.log(this.valor);console.log("==========");
            _val_fin = this.valor.analizar(entorno_padre, salida);
            //console.log("++++++++++");console.log(_acceso); console.log(_val_fin);  console.log("++++++++++");
            if(_val_fin.getRol() != tipo_rol.valor && _val_fin.getRol() != tipo_rol.arreglo && _val_fin.getRol() != tipo_rol.type)
            {
                return _val_fin;
            }

            if(_acceso.getRol() != _val_fin.getRol())
            {
                if(!(_acceso.getRol() == tipo_rol.valor && _acceso.getTipo().Equals(new Tipo(tipo_dato.NULO))))
                {
                    _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                    _return.setMensaje("Sentencia Asignación: El tipo de rol es diferente al valor a asignar.");
                    _return.setFila(this.fila);
                    _return.setColumna(this.columna);
                    return _return;
                }
            } 

            if(!_acceso.getTipo().Equals(_val_fin.getTipo()))
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                _return.setMensaje("Sentencia Asignación: El tipo de la variable es diferente al valor a asignar.");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                return _return;
            } 

            if(!_acceso.getConstante())
            {
                _acceso.setTipo(_val_fin.getTipo());
                _acceso.setMensaje(_val_fin.getMensaje());
                _acceso.setListaDimensiones(_val_fin.getListaDimensiones());
                _acceso.setListaFunciones(_val_fin.getListaFunciones());
            }
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                _return.setMensaje("Sentencia Asignación: No es posible Asignar un valor a una constante.");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                return _return;
            }
            
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4"); 
            _return.setMensaje("Asignación Succesful");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            return _return;
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Asignación: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {   
        var clon_acceso1 : Array<Instruction>;
        clon_acceso1 = new Array<Instruction>();
        
        for(var x = 0; x < this.acceso1.length; x++)
        {   
            clon_acceso1.push(this.acceso1[x].getThis());
        }
       
        return new Sentencia_Asignacion(this.fila,this.columna,this.tipo,this.acceso0 == undefined ? "": this.acceso0,clon_acceso1,this.acceso2 == undefined ? undefined : this.acceso2.getThis(), this.valor == undefined ? undefined : this.valor.getThis());
    }
}

export default Sentencia_Asignacion;