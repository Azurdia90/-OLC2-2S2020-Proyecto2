import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from './Instruction';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';

class Sentencia_Declaracion extends Instruction
{
    protected identificadores : String[];

    protected const : Boolean;
    protected tipo : Tipo;
    protected rol : tipo_rol;
    protected dimensiones: number;
    protected valor :  Instruction;

    protected valor_ext : Simbolo;
   
    constructor(p_fila: number, p_columna: number, p_const : Boolean, p_lista_id : String[], p_tipo? : Tipo, p_rol? : tipo_rol, p_dimensiones? : number, p_valor? : Instruction)
    {
        super(p_fila,p_columna);
        
        this.identificadores = p_lista_id;

        this.const = p_const;
        this.tipo = p_tipo;
        this.rol = p_rol;
        this.dimensiones = p_dimensiones;
        this.valor = p_valor;

        this.valor_ext  = undefined;
    }

    public analizar(entorno_padre : Entorno, nivel : number)
    {   let etapa: number
        this.entorno_padre = entorno_padre;

        let _return : Simbolo;
        let _val_fin : Simbolo;
        
        try
        {
            etapa = 1//Definir valor asignar
            if((this.const) && (this.valor == undefined && this.valor_ext == undefined))
            {
                var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                nuevo_simbolo.setMensaje("Sentencia Declaración: No es posible declarar sin valor una constante.");
                nuevo_simbolo.setFila(this.fila);
                nuevo_simbolo.setColumna(this.columna);
                return nuevo_simbolo;
            }

            if(this.valor == undefined && this.valor_ext == undefined)
            {
                _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.VOID), "");
                _val_fin.setMensaje("null");
            }
            else if(this.valor == undefined && this.valor_ext != undefined)
            {
                _val_fin = this.valor_ext;
            }
            else if(this.valor != undefined && this.valor_ext == undefined)
            {
                _val_fin = this.valor.analizar(entorno_padre, nivel);
            }
            else
            {
                _val_fin = this.valor.analizar(entorno_padre, nivel);
            }
            //Verificar que el rol sea un valor
            if (_val_fin.getRol() != tipo_rol.valor && _val_fin.getRol() != tipo_rol.arreglo && _val_fin.getRol() != tipo_rol.type)
            {
                return _val_fin;
            }
            etapa = 2 //Definir Rol
            if(this.rol == undefined)
            {
                this.rol = _val_fin.getRol();
            }
            etapa = 3 //Definir Tipo
            if(this.tipo == undefined)
            {
                this.tipo = _val_fin.getTipo();
            }
            etapa = 4//Verificar Rol y Tipos Sean Validos
            if(this.rol != _val_fin.getRol())
            {
                if( !(((this.rol == tipo_rol.valor && (this.tipo.Equals(new Tipo(tipo_dato.NULO)) || this.tipo.Equals(new Tipo(tipo_dato.VOID)))) &&  _val_fin.getRol() == tipo_rol.type) || ((this.rol == tipo_rol.valor && (this.tipo.Equals(new Tipo(tipo_dato.NULO)) || this.tipo.Equals(new Tipo(tipo_dato.VOID)))) &&  _val_fin.getRol() == tipo_rol.arreglo) || (this.rol == tipo_rol.arreglo &&  (_val_fin.getRol() == tipo_rol.valor && (_val_fin.getTipo().Equals(new Tipo(tipo_dato.NULO)) || _val_fin.getTipo().Equals(new Tipo(tipo_dato.VOID))))) || (this.rol == tipo_rol.type &&  (_val_fin.getRol() == tipo_rol.valor && (_val_fin.getTipo().Equals(new Tipo(tipo_dato.NULO)) || _val_fin.getTipo().Equals(new Tipo(tipo_dato.VOID))))) ) )
                {
                    if(this.rol == tipo_rol.valor && _val_fin.getRol() == tipo_rol.arreglo)
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: No es posible asignar un arreglo a un valor primitivo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else if(this.rol == tipo_rol.valor && _val_fin.getRol() == tipo_rol.type)
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: No es posible asignar un type a un valor primitivo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else if(this.rol == tipo_rol.arreglo && _val_fin.getRol() == tipo_rol.valor)
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: No es posible asignar un valor primitivo a un arreglo.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                    else if(this.rol == tipo_rol.arreglo && _val_fin.getRol() == tipo_rol.type)
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
            else
            {
                if(_val_fin.getTipo().Equals(new Tipo(tipo_dato.VOID)))
                {
                    if(this.rol == tipo_rol.valor)
                    {
                        if(this.tipo.getTipo() == tipo_dato.NULO)
                        {
                            _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NULO), "");
                            _val_fin.setMensaje("0");
                        }
                        else if(this.tipo.getTipo() == tipo_dato.BOOLEANO)
                        {
                            _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.BOOLEANO), "");
                            _val_fin.setMensaje("0");
                        }
                        else if(this.tipo.getTipo() == tipo_dato.NUMERO)
                        {
                            _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NUMERO), "");
                            _val_fin.setMensaje("0");
                        }
                        else if(this.tipo.getTipo() == tipo_dato.CADENA)
                        {
                            _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.CADENA), "");
                            _val_fin.setMensaje("3");
                        }
                        else
                        {
                            _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NULO), "");
                            _val_fin.setMensaje("0");
                        }
                    }
                    else if(this.rol == tipo_rol.arreglo)
                    {
                        let arreglo_tmp: Array<Simbolo>;
                        let lista_dimensiones_tmp: Array<Number>;

                        for(var x = 0; x < this.dimensiones; x++);
                        {
                            lista_dimensiones_tmp.push(0);
                        }

                        if(this.tipo.getTipo() == tipo_dato.NULO)
                        {
                            _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.NULO), "");
                            _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                            _val_fin.setMensaje("arreglo_tmp");
                        }
                        else if(this.tipo.getTipo() == tipo_dato.BOOLEANO)
                        {
                            _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.BOOLEANO), "");
                            _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                            _val_fin.setMensaje("arreglo_tmp");
                        }
                        else if(this.tipo.getTipo() == tipo_dato.NUMERO)
                        {
                            _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.NUMERO), "");
                            _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                            _val_fin.setMensaje("arreglo_tmp");
                        }
                        else if(this.tipo.getTipo() == tipo_dato.CADENA)
                        {
                            _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.CADENA), "");
                            _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                            _val_fin.setMensaje("arreglo_tmp");
                        }
                        else
                        {
                            _val_fin = new Simbolo(tipo_rol.arreglo, new Tipo(tipo_dato.NULO), "");
                            _val_fin.setListaDimensiones(lista_dimensiones_tmp);
                            _val_fin.setMensaje("0");
                        }
                    }
                    else if(this.rol == tipo_rol.type)
                    {
                        _val_fin = new Simbolo(tipo_rol.type, new Tipo(tipo_dato.NULO), "");
                        _val_fin.setMensaje("0");
                    }
                    else
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: El tipo de rol de la variable desconocido.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                }
                else
                {
                    if(this.rol == tipo_rol.valor)
                    {
                        if(!this.tipo.Equals(_val_fin.getTipo()))
                        { 
                            this.entorno_padre = entorno_padre;
                            this.nivel = nivel;  

                            var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                            nuevo_simbolo.setMensaje("Sentencia Declaración: El tipo de la variable es diferente al valor a asignar.");
                            nuevo_simbolo.setFila(this.fila);
                            nuevo_simbolo.setColumna(this.columna);
                            return nuevo_simbolo;
                        }
                    }
                    else if(this.rol == tipo_rol.arreglo)
                    {   
                        if(!this.tipo.Equals(_val_fin.getTipo()))
                        {   
                            this.entorno_padre = entorno_padre;
                            this.nivel = nivel;

                            var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                            nuevo_simbolo.setMensaje("Sentencia Declaración: El tipo de la variable es diferente al valor a asignar.");
                            nuevo_simbolo.setFila(this.fila);
                            nuevo_simbolo.setColumna(this.columna);
                            return nuevo_simbolo;
                        }
                    }
                    else if(this.rol == tipo_rol.type)
                    {  //REVISAR POR FAVOR!!
                        if(!_val_fin.getTipo().Equals(new Tipo(tipo_dato.IDENTIFICADOR,"")))
                        {   
                            if(!this.tipo.Equals(_val_fin.getTipo()))
                            {  
                                this.entorno_padre = entorno_padre;
                                this.nivel = nivel;

                                var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                                nuevo_simbolo.setMensaje("Sentencia Declaración: El tipo de la variable es diferente al valor a asignar.");
                                nuevo_simbolo.setFila(this.fila);
                                nuevo_simbolo.setColumna(this.columna);
                                return nuevo_simbolo;
                            }
                        }
                    }
                    else
                    {
                        this.entorno_padre = entorno_padre;
                        this.nivel = nivel;

                        var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                        nuevo_simbolo.setMensaje("Sentencia Declaración: El tipo de rol de la variable desconocido.");
                        nuevo_simbolo.setFila(this.fila);
                        nuevo_simbolo.setColumna(this.columna);
                        return nuevo_simbolo;
                    }
                }
            }
            etapa = 5//Guardar datos en tabla de Simbolos

            for(var cont : number = 0; cont < this.identificadores.length; cont++)
            {
                if(entorno_padre.existsSimbolo(this.identificadores[cont],nivel))
                {
                    this.entorno_padre = entorno_padre;
                    this.nivel = nivel;

                    var nuevo_simbolo : Simbolo = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA),"33-12"); 
                    nuevo_simbolo.setMensaje("La variable: \"" + this.identificadores[cont] + "\" ya se encuentra en el entorno local.");
                    nuevo_simbolo.setFila(this.fila);
                    nuevo_simbolo.setColumna(this.columna);
                    return nuevo_simbolo;
                }
                else
                {   //if(entorno_padre.getPadre().getIdentificador() == "Inicio"){console.log(this.entorno_padre);console.log(this.identificadores); console.log(_val_fin);}
                    var nuevo_simbolo : Simbolo = new Simbolo(this.rol,this.tipo,this.identificadores[cont]); 
                    nuevo_simbolo.setConstante(this.const); 
                    nuevo_simbolo.setMensaje(_val_fin.getMensaje());
                    nuevo_simbolo.setListaDimensiones(_val_fin.getListaDimensiones());
                    nuevo_simbolo.setListaFunciones(_val_fin.getListaFunciones());
                    entorno_padre.set_e(this.identificadores[cont],nuevo_simbolo,nivel);             
                }   
            }    

            this.entorno_padre = entorno_padre;
            this.nivel = nivel;

            //Devolver Confirmación
            var simbolo_aceptado : Simbolo = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4"); 
            simbolo_aceptado.setMensaje("Declaración Succesful");
            simbolo_aceptado.setFila(this.fila);
            simbolo_aceptado.setColumna(this.columna);
            return simbolo_aceptado;
        }
        catch(Exception)
        {
            this.entorno_padre = entorno_padre;
            this.nivel = nivel;

            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Declaración (a" + etapa + ") : " +  Exception.Message);
            return _return;
        }
    }

    public traducir(salida : Middle)
    {   let etapa : number;
        let _val_fin : Simbolo;

        try
        {
            etapa = 1//Definir Valor
            if(this.valor == undefined && this.valor_ext == undefined)
            {
                _val_fin = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.VOID), "");
                _val_fin.setMensaje("0");
            }
            else if(this.valor == undefined && this.valor_ext != undefined)
            {
                _val_fin = this.valor_ext;
            }
            else if(this.valor != undefined && this.valor_ext == undefined)
            {
                _val_fin = this.valor.traducir(salida);
            }
            else
            {
                _val_fin = this.valor.traducir(salida);
            }
            //Definir Rol
            if(this.rol == undefined)
            {
                this.rol = _val_fin.getRol();
            }
            //Definir Tipo
            if(this.tipo == undefined)
            {
                this.tipo = _val_fin.getTipo();
            }
            //console.log(_val_fin);
            //Asignar Valor
            for(var cont : number = 0; cont < this.identificadores.length; cont++)
            {
                if(this.entorno_padre.existsSimbolo(this.identificadores[cont], this.nivel))
                {
                    var simbolo_actual = this.entorno_padre.getSimbolo(this.identificadores[cont], this.nivel);
                    var pos_stack = "t"+ Tabla_Simbolos.getInstance().getTemporal();

                    var codigo_3d =  "\n";

                    codigo_3d = codigo_3d
                                + pos_stack + " = P + " + simbolo_actual.getPos_S() + ";\n";
                    
                    codigo_3d = codigo_3d 
                                +"Stack[(int)" + pos_stack + "] = " + _val_fin.getMensaje() + ";";    
                    
                    Middle.getInstance().setOuput(codigo_3d);
                }   
            }    
            //Devolvar Confirmación
            var simbolo_aceptado : Simbolo = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA),"10-4"); 
            simbolo_aceptado.setMensaje("Declaración Succesful");
            simbolo_aceptado.setFila(this.fila);
            simbolo_aceptado.setColumna(this.columna);
            return simbolo_aceptado;
        }
        catch(Error)
        {
            Middle.getInstance().clear3D();
            Middle.getInstance().setOuput("//Error Declaración: " + Error.Mesage);
        }
    }

    public getThis() 
    {
        return new Sentencia_Declaracion(this.fila,this.columna,this.const,this.identificadores,this.tipo == undefined ? undefined : this.tipo,this.rol == undefined ? undefined : this.rol,this.dimensiones,this.valor == undefined ? undefined: this.valor.getThis());
    }

    public getValor()
    {
        return this.valor;
    }

    public setValor(p_valor : Instruction)
    {
        this.valor = p_valor;
    }

    public setValor_Ext(p_valor : Simbolo)
    {
        this.valor_ext = p_valor;
    }

    public setTipo(p_tipo : Tipo)
    {
        this.tipo = p_tipo;
    }
}

export default Sentencia_Declaracion;