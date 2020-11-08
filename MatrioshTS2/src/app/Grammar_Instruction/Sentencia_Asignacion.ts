import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from './Instruction';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

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

    public analizar(entorno_padre : Entorno, nivel : number)
    {
        let _return : Simbolo;
        let _acceso : Simbolo;
        let _val_fin : Simbolo;

        try
        {  
            //ACCESO A IDENTIFICADOR
            if(this.tipo == 0)
            {   //console.log(nivel); console.log(entorno_padre.length);
                if(entorno_padre.existsSimbolo(this.acceso0, nivel))
                {                 
                    _acceso  = entorno_padre.getSimbolo(this.acceso0, nivel);
                }
                else
                {   
                    _acceso = Tabla_Simbolos.getInstance().getSimbolo_global(this.acceso0);             
                }  
            }//ACCESO A ARREGLO
            else if(this.tipo == 1)
            {
                var simbolo_tmp : Simbolo;

                if(entorno_padre.existsSimbolo(this.acceso0, nivel))
                {                 
                    simbolo_tmp = entorno_padre.getSimbolo(this.acceso0,nivel);
                }
                else
                {   
                    simbolo_tmp = Tabla_Simbolos.getInstance().getSimbolo_global(this.acceso0);                    
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
                        val_tmp = this.acceso1[x].analizar(entorno_padre, nivel);

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
                                this.entorno_padre = entorno_padre;
                                this.nivel = nivel;

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
                                    this.entorno_padre = entorno_padre;
                                    this.nivel = nivel;

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
                            this.entorno_padre = entorno_padre;
                            this.nivel = nivel;

                            _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                            _return.setFila(this.fila);
                            _return.setColumna(this.columna);
                            _return.setMensaje("Sentencia Asignación: El cantidad de accesos no coincide con las dimensiones del arreglo.");
                            return _return;
                        }
                    }
                    else
                    {   
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
                        _return.setFila(this.fila);
                        _return.setColumna(this.columna);
                        _return.setMensaje("Sentencia Asignación: El arreglo no a sido instanciado.");
                        return _return;
                    }
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
                    _return.setMensaje("Sentencia Asignación: Se especificaron dimension(es) de acceso para un No arreglo.");
                    return _return;
                } 
            }//ACCESO A TYPE
            else if(this.tipo == 2)
            {
                _acceso = this.acceso2.analizar(entorno_padre, nivel);
            }// ACCESO NO DEFINIDO
            else
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                _return.setMensaje("Sentencia Asignación: El tipo de asignación no definido.");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                return _return;
            }
            
            //VERIFICAR QUE EL SIMBOLO A ACCEDER ES UN VALOR, ARREGLO O TYPE
            if(_acceso.getRol() != tipo_rol.valor && _acceso.getRol() != tipo_rol.arreglo && _acceso.getRol() != tipo_rol.type)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                return _acceso
            }
            //console.log("==========");console.log(_acceso); console.log(this.valor);console.log("==========");
            //DEFINIR VALOR
            _val_fin = this.valor.analizar(entorno_padre, nivel);
            //console.log("++++++++++");console.log(_acceso); console.log(_val_fin);  console.log("++++++++++");
            //VERIFICAR QUE EL VALOR A ASIGNAR ES UN VALOR, ARREGLO O TYPE
            if(_val_fin.getRol() != tipo_rol.valor && _val_fin.getRol() != tipo_rol.arreglo && _val_fin.getRol() != tipo_rol.type)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                return _val_fin;
            }
            //SI EL VALOR ES UN ES ARREGLO
            if(_acceso.getRol() != _val_fin.getRol())
            {
                if( !( ((_acceso.getRol() == tipo_rol.valor && (_acceso.getTipo().Equals(new Tipo(tipo_dato.NULO)) || _acceso.getTipo().Equals(new Tipo(tipo_dato.VOID)))) &&  _val_fin.getRol() == tipo_rol.type) || (_acceso.getRol() == tipo_rol.type &&  (_val_fin.getRol() == tipo_rol.valor && (_val_fin.getTipo().Equals(new Tipo(tipo_dato.NULO)) || _val_fin.getTipo().Equals(new Tipo(tipo_dato.VOID))))) ) )
                {
                    if(_acceso.getRol() == tipo_rol.valor && _val_fin.getRol() == tipo_rol.arreglo)
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: No es posible asignar un arreglo a un valor primitivo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else if(_acceso.getRol() == tipo_rol.valor && _val_fin.getRol() == tipo_rol.type)
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: No es posible asignar un type a un valor primitivo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else if(_acceso.getRol() == tipo_rol.arreglo && _val_fin.getRol() == tipo_rol.valor)
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: No es posible asignar un valor primitivo a un arreglo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else if(_acceso.getRol() == tipo_rol.arreglo && _val_fin.getRol() == tipo_rol.type)
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: No es posible asignar un type a un arreglo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: No se encuentran definidos los roles.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                }
            } 

            if(!_acceso.getTipo().Equals(_val_fin.getTipo()))
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

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
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                _return.setMensaje("Sentencia Asignación: No es posible Asignar un valor a una constante.");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                return _return;
            }
            
            this.entorno_padre = entorno_padre;
            this.nivel = nivel;

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4"); 
            _return.setMensaje("Asignación Succesful");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            return _return;
        }
        catch(Exception)
        {
            this.entorno_padre = entorno_padre;
            this.nivel = nivel;

            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Asignación: " + Exception.Message);
            return _return;
        }
    }

    public traducir(salida : Middle)
    {
        let _return : Simbolo;
        let _acceso : Simbolo;
        let _val_fin : Simbolo;

        try
        {   
            if(this.tipo == 0)
            {
                if(this.entorno_padre.existsSimbolo(this.acceso0,this.nivel))
                {                 
                    _acceso  = this.entorno_padre.getSimbolo(this.acceso0, this.nivel);
                }
                else
                {   
                    _acceso = Tabla_Simbolos.getInstance().getSimbolo_global(this.acceso0);                    
                }   
            }
            else if(this.tipo == 1)
            {
                var simbolo_tmp : Simbolo;

                if(this.entorno_padre.existsSimbolo(this.acceso0,this.nivel))
                {                 
                    simbolo_tmp = this.entorno_padre.getSimbolo(this.acceso0,this.nivel);
                }
                else
                {   
                    simbolo_tmp = Tabla_Simbolos.getInstance().getSimbolo_global(this.acceso0);                    
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
                        val_tmp = this.acceso1[x].traducir(salida);

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
                _acceso = this.acceso2.traducir(salida);
            }
            else
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                _return.setMensaje("Sentencia Asignación: El tipo de asignación no definido.");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                return _return;
            }
            
            //console.log("==========");console.log(_acceso); console.log(this.valor);console.log("==========");
            _val_fin = this.valor.traducir(salida);
            //console.log("++++++++++");console.log(_acceso); console.log(_val_fin);  console.log("++++++++++");

            let temporal_posR =  "t" + Tabla_Simbolos.getInstance().getTemporal();
            let temporal_posS =  "t" + Tabla_Simbolos.getInstance().getTemporal();
            let temporal_valor = "t" + Tabla_Simbolos.getInstance().getTemporal();

            Middle.getInstance().setOuput(temporal_posS + " =  P + 0;");
            Middle.getInstance().setOuput(temporal_posR + " =  " + temporal_posS +  " + " + _val_fin.getPos_S() + ";");
            Middle.getInstance().setOuput(temporal_valor + " = "  + _val_fin.getMensaje() + ";");
            Middle.getInstance().setOuput("Stack[(int)" + temporal_posR + "] = " + temporal_valor + ";");

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4"); 
            _return.setMensaje("Asignación Succesful");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            return _return;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("Error Asignación: " + Error.Mesage);
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