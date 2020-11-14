import And from './And';
import Dato_Primitivo from './Dato_Primitivo';
import Diferente_Que from './Diferente_Que';
import Division from './Division';
import Expresion from './Expresion';
import Funcion_MatrioshTS from './Funcion_Matriosh';
import Igual_Que from './Igual_Que';
import Instruction from './Instruction';
import Mayor_Igual_Que from './Mayor_Igual_Que';
import Mayor_Que from './Mayor_Que';
import Menor_Igual_Que from './Menor_Igual_Que';
import Menor_Que from './Menor_Que';
import Middle from './Middle';
import Modulo from './Modulo';
import Multiplicacion from './Multiplicacion';
import Not from './Not';
import Operador_Decremento from './Operador_Decremento';
import Operador_Incremento from './Operador_Incremento';
import Operador_Ternario from './Operador_Ternario';
import Operador_Unario from './Operador_Unario';
import Or from './Or';
import Potencia from './Potencia';
import Resta from './Resta';
import Sentencia_Acceso from './Sentencia_Acceso';
import Sentencia_Asignacion from './Sentencia_Asignacion';
import Sentencia_Break from './Sentencia_Break';
import Sentencia_Caso from './Sentencia_Caso';
import Sentencia_Continue from './Sentencia_Continue';
import Sentencia_Declaracion from './Sentencia_Declaración';
import Sentencia_Do_While from './Sentencia_Do_While';
import Sentencia_For from './Sentencia_For';
import Sentencia_If from './Sentencia_If';
import Sentencia_Instancia from './Sentencia_Instancia';
import Sentencia_Llamada from './Sentencia_Llamada';
import Sentencia_Return from './Sentencia_Return';
import Sentencia_Switch from './Sentencia_Switch';
import Sentencia_While from './Sentencia_While';
import Simbolo from './Simbolo';
import Suma from './Suma';
import Tabla_Errores from './Tabla_Errores';
import Tabla_Simbolos from './Tabla_Simbolos';
import Tipo from './Tipo';
import Tipo_Acceso from './Tipo_Acceso';
import Type_MatrioshTS from './Type_MatrioshTS';

//vscode://vscode.github-authentication/did-authenticate?windowid=1&code=56828868e702751f3978&state=1acf4bbc-47c2-47e3-9a88-e19e71a95d00
class AST
{
    private superjason : Array<JSON>;
    private lista_instrucciones : Array<Instruction>;

    constructor(p_jason : Array<JSON>, p_import : Boolean)
    {
        if(!p_import)
        {
            this.superjason = p_jason;
            this.lista_instrucciones = new Array<Instruction>();
        }
        
    }
    public import_ast()
    {

    }

    public build_ast()
    {   
        for(var i :number = 0; i < this.superjason.length; i++ )
        {            
            this.lista_instrucciones.push(this.fabrica_instrucciones(this.superjason[i]));    
        } 
    }  
    public exec_ast()
    {
        Tabla_Simbolos.getInstance().clear();
        this.recorrido1();
        this.recorrido2();
        this.recorrido3();
        this.recorrido31();
        this.recorrido4();
        this.traducir_3D_1();
        this.traducir_3D_2();
    }

    public recorrido1()
    {
        var _type : Type_MatrioshTS;

        for(var r1 = 0; r1 < this.lista_instrucciones.length; r1++)
        {
            if(this.lista_instrucciones[r1] instanceof Type_MatrioshTS)
            {
                _type = <Type_MatrioshTS> this.lista_instrucciones[r1];

                if(!Tabla_Simbolos.getInstance().existType(_type.getIdentificador()))
                {
                    Tabla_Simbolos.getInstance().getLista_types().push(_type);
                }
                else
                {
                    var  error_encontrado = { tipo: "Análisis Síntactico MatrioshTS", fila: _type.getFila() == undefined ? "0" : _type.getFila().toString(), columna: _type.getColumna() == undefined  ? "0" : _type.getColumna().toString(), identificador: _type.getIdentificador(), descripcion: "Type ya existente."};
                    Tabla_Errores.getInstance().push(error_encontrado);  
                }
            }
            else
            {
                continue;
            }
        }
    }

    public recorrido2()
    {
        let _result : Simbolo;

        for(var r2 = 0; r2 < this.lista_instrucciones.length; r2++)
        {
            if(this.lista_instrucciones[r2] instanceof Sentencia_Declaracion)
            {
                _result = this.lista_instrucciones[r2].analizar(Tabla_Simbolos.getInstance().getEntorno_global(),0);
            }
            else
            {
                continue;
            }

            if(_result != undefined && _result.getRol() == tipo_rol.error)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: _result.getMensaje().toString()};
                Tabla_Errores.getInstance().push(error_encontrado);  
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.detener)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Detener."};
                Tabla_Errores.getInstance().push(error_encontrado);  
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.continuar)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Continuar."};
                Tabla_Errores.getInstance().push(error_encontrado); 
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.retornar)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Retornar"};
                Tabla_Errores.getInstance().push(error_encontrado); 
            }
            else
            {
                continue;
            }
        }
    }

    public recorrido3()
    {
        var _funcion : Funcion_MatrioshTS;

        for(var r3 = 0; r3 < this.lista_instrucciones.length; r3++)
        {
            if(this.lista_instrucciones[r3] instanceof Funcion_MatrioshTS)
            {
                _funcion = <Funcion_MatrioshTS> this.lista_instrucciones[r3];

                if(!Tabla_Simbolos.getInstance().existFuncion(_funcion.getIdentificador()))
                {
                    Tabla_Simbolos.getInstance().getLista_funciones().push(_funcion);
                }
                else
                {
                    var  error_encontrado = { tipo: "Análisis Síntactico MatrioshTS", fila: _funcion.getFila() == undefined ? "0" : _funcion.getFila().toString(), columna: _funcion.getColumna() == undefined  ? "0" : _funcion.getColumna().toString(), identificador: _funcion.getIdentificador(), descripcion: "Función ya existente."};
                    Tabla_Errores.getInstance().push(error_encontrado);  
                }
            }
            else
            {
                continue;
            }
        }        
    }

    public recorrido31()
    {
        let _funcion : Funcion_MatrioshTS;
        let _result  : Simbolo;

        for(var r31 = 0; r31 < Tabla_Simbolos.getInstance().getLista_funciones().length; r31++)
        {
            _funcion = <Funcion_MatrioshTS> Tabla_Simbolos.getInstance().getLista_funciones()[r31];
            _result = _funcion.analizar(null,0);

            if(_result.getRol() == tipo_rol.error)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Detener."};
                Tabla_Errores.getInstance().push(error_encontrado); 
            }
        }        
    }

    public recorrido4()
    {
        let _result : Simbolo;
        
        for(var r4 = 0; r4 < this.lista_instrucciones.length; r4++)
        {    
            if(!(this.lista_instrucciones[r4] instanceof Type_MatrioshTS) && !(this.lista_instrucciones[r4] instanceof Funcion_MatrioshTS) && !(this.lista_instrucciones[r4] instanceof Sentencia_Declaracion))
            {   //console.log(this.lista_instrucciones[f]);
                if(this.lista_instrucciones[r4] instanceof Sentencia_Asignacion || this.lista_instrucciones[r4] instanceof Sentencia_Acceso || this.lista_instrucciones[r4] instanceof Sentencia_Llamada || this.lista_instrucciones[r4] instanceof Operador_Ternario || this.lista_instrucciones[r4] instanceof Operador_Incremento || this.lista_instrucciones[r4] instanceof Operador_Decremento)
                {
                    _result = this.lista_instrucciones[r4].analizar(Tabla_Simbolos.getInstance().getEntorno_global(), Tabla_Simbolos.getInstance().getEntorno_global().getLastNivel());
                }
                else
                {
                    _result = this.lista_instrucciones[r4].analizar(Tabla_Simbolos.getInstance().getnewEntorno(), Tabla_Simbolos.getInstance().getEntorno_global().getLastNivel());
                }
            }
            else
            {
                continue;
            }
            //console.log(_result);
            if(_result != undefined && _result.getRol() == tipo_rol.error)
            {
                let error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: _result.getMensaje().toString()};
                Tabla_Errores.getInstance().push(error_encontrado);  
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.detener)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Detener."};
                Tabla_Errores.getInstance().push(error_encontrado);  
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.continuar)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Continuar."};
                Tabla_Errores.getInstance().push(error_encontrado); 
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.retornar)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Retornar"};
                Tabla_Errores.getInstance().push(error_encontrado); 
            }
            else
            {
                continue;
            }
        }
    }

    public traducir_3D_1()
    {
        var _result : Simbolo;

        for(var _3D1 = 0; _3D1 < this.lista_instrucciones.length; _3D1++)
        {
            if(this.lista_instrucciones[_3D1] instanceof Funcion_MatrioshTS)
            {
                _result = this.lista_instrucciones[_3D1].traducir(Middle.getInstance());
            }
            else
            {
                continue;
            }

            if(_result != undefined && _result.getRol() == tipo_rol.error)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: _result.getMensaje().toString()};
                Tabla_Errores.getInstance().push(error_encontrado);  
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.detener)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Detener."};
                Tabla_Errores.getInstance().push(error_encontrado);  
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.continuar)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Continuar."};
                Tabla_Errores.getInstance().push(error_encontrado); 
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.retornar)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Retornar"};
                Tabla_Errores.getInstance().push(error_encontrado); 
            }
            else
            {
                continue;
            }
        }
    }
    
    public traducir_3D_2()
    {
        var _result : Simbolo;
        
        Middle.getInstance().setOuput("void main()");
        Middle.getInstance().setOuput("{\n");

        for(var _3D1 = 0; _3D1 < this.lista_instrucciones.length; _3D1++)
        {
            if(!(this.lista_instrucciones[_3D1] instanceof Type_MatrioshTS) && !(this.lista_instrucciones[_3D1] instanceof Funcion_MatrioshTS))
            {
                _result = this.lista_instrucciones[_3D1].traducir(Middle.getInstance());
            }
            else
            {
                continue;
            }

            if(_result != undefined && _result.getRol() == tipo_rol.error)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: _result.getMensaje().toString()};
                Tabla_Errores.getInstance().push(error_encontrado);  
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.detener)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Detener."};
                Tabla_Errores.getInstance().push(error_encontrado);  
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.continuar)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Continuar."};
                Tabla_Errores.getInstance().push(error_encontrado); 
            }
            else if(_result != undefined && _result.getRol() == tipo_rol.retornar)
            {
                let  error_encontrado = { tipo: "Análisis Semántico MatrioshTS", fila: _result.getFila() == undefined ? "0" : _result.getFila().toString(), columna: _result.getColumna() == undefined  ? "0" : _result.getColumna().toString(), identificador: "global", descripcion: "NO se permite la sentencia Retornar"};
                Tabla_Errores.getInstance().push(error_encontrado); 
            }
            else
            {
                continue;
            }
        }

        Middle.getInstance().setOuput("\n}");
    }

    private fabrica_instrucciones(instruccion_jason : JSON)
    {
        if(instruccion_jason['etiqueta'] == 'funcion')
        {
            let lista_parametros : Array<Instruction>;
            let lista_sentencias : Array<Instruction>;

            lista_parametros = new Array<Instruction>();
            lista_sentencias = new Array<Instruction>();
            
            if(instruccion_jason['lista_parametros'] != null)
            {
                for(var x = 0; x < instruccion_jason['lista_parametros'].length; x++)
                {
                    lista_parametros.push(this.fabrica_instrucciones(instruccion_jason['lista_parametros'][x]));
                }
            }

            for(var y = 0; y < instruccion_jason['lista_sentencias'].length; y++)
            {
                lista_sentencias.push(this.fabrica_instrucciones(instruccion_jason['lista_sentencias'][y]));
            }       
            
            return new Funcion_MatrioshTS(instruccion_jason['linea'],instruccion_jason['columna'],instruccion_jason['identificador'],lista_parametros, lista_sentencias, instruccion_jason['tipo'] == null ? undefined : this.fabrica_tipo(instruccion_jason['tipo']));
        }
        else if(instruccion_jason['etiqueta'] == 'type')
        {
            let lista_identificadores: Array<String>;
            let lista_tipos: Array<Tipo>;

            lista_identificadores = new Array<String>();
            lista_tipos = new Array<Tipo>();

            for(var x = 0; x < instruccion_jason['lista_atributos'].length; x++)
            {
                let atributo = instruccion_jason['lista_atributos'][x];
                lista_identificadores.push(atributo['identificador']);
            }

            for(var y = 0; y < instruccion_jason['lista_atributos'].length; y++)
            {
                let atributo = instruccion_jason['lista_atributos'][y];
                lista_tipos.push(this.fabrica_tipo(atributo['tipo']));
            }

            return new Type_MatrioshTS(instruccion_jason['linea'],instruccion_jason['columna'],instruccion_jason['identificador'],lista_identificadores,lista_tipos);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_declaracion')
        {
            return new Sentencia_Declaracion(instruccion_jason['linea'],instruccion_jason['columna'],instruccion_jason['constante'],instruccion_jason['identificador'],instruccion_jason['tipo'] == null ? undefined : this.fabrica_tipo(instruccion_jason['tipo']),instruccion_jason['tipo'] == null ? undefined : instruccion_jason['tipo']['rol'],instruccion_jason['tipo'] == null ? undefined : instruccion_jason['tipo']['dimensiones'],instruccion_jason['valor'] == null ? undefined : this.fabrica_expresiones(instruccion_jason['valor']));
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_asignacion')
        {
            let lista_dimensiones: Array<Instruction>;

            lista_dimensiones = new Array<Instruction>();

            for(var d = 0; d < instruccion_jason['acceso1'].length; d++)
            {
                lista_dimensiones.push(this.fabrica_expresiones(instruccion_jason['acceso1'][d]));
            }

            return new Sentencia_Asignacion(instruccion_jason['linea'],instruccion_jason['columna'],instruccion_jason['tipo'],instruccion_jason['acceso0'] == null ? "" : instruccion_jason['acceso0'],lista_dimensiones,instruccion_jason['acceso2'] == null ? undefined : this.fabrica_expresiones(instruccion_jason['acceso2']),this.fabrica_expresiones(instruccion_jason['valor']));
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_if')
        {
            let lista_sentencias_if : Array<Instruction>;
            let lista_sentencias_else_if : Array<Instruction>;
            let lista_sentencias_else : Array<Instruction>;

            lista_sentencias_if = new Array<Instruction>();
            lista_sentencias_else_if = new Array<Instruction>();
            lista_sentencias_else = new Array<Instruction>();

            for(var x = 0; x < instruccion_jason['sentencias1'].length; x++)
            {
                lista_sentencias_if.push(this.fabrica_instrucciones(instruccion_jason['sentencias1'][x]));
            }
            
            if(instruccion_jason['lista_else_if'] != null)
            {
                for(var y = 0; y < instruccion_jason['lista_else_if'].length; y++)
                {
                    lista_sentencias_else_if.push(this.fabrica_instrucciones(instruccion_jason['lista_else_if'][y]));
                }
            }

            if(instruccion_jason['sentencias2'] != null)
            {
                for(var z = 0; z < instruccion_jason['sentencias2'].length; z++)
                {
                    lista_sentencias_else.push(this.fabrica_instrucciones(instruccion_jason['sentencias2'][z]));
                }
            }

            return new Sentencia_If(instruccion_jason['linea'],instruccion_jason['columna'],this.fabrica_expresiones(instruccion_jason['condicion']),lista_sentencias_if,lista_sentencias_else_if,lista_sentencias_else);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_switch')
        {
            let lista_casos : Array<Instruction>;

            lista_casos = new Array<Tipo_Acceso>();

            for(var x = 0; x < instruccion_jason['lista_casos'].length; x++)
            {
                lista_casos.push(this.fabrica_instrucciones(instruccion_jason['lista_casos'][x]));
            }

            return new Sentencia_Switch(instruccion_jason['linea'],instruccion_jason['columna'],this.fabrica_expresiones(instruccion_jason['condicion']),lista_casos);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_caso')
        {
            let lista_sentencias : Array<Instruction>;

            lista_sentencias = new Array<Tipo_Acceso>();

            for(var x = 0; x < instruccion_jason['lista_sentencias'].length; x++)
            {
                lista_sentencias.push(this.fabrica_instrucciones(instruccion_jason['lista_sentencias'][x]));
            }

            return new Sentencia_Caso(instruccion_jason['linea'],instruccion_jason['columna'],instruccion_jason['default'],instruccion_jason['condicion'] == null ? undefined : this.fabrica_expresiones(instruccion_jason['condicion']),lista_sentencias);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_while')
        {
            let lista_sentencias : Array<Instruction>;

            lista_sentencias = new Array<Tipo_Acceso>();

            for(var x = 0; x < instruccion_jason['sentencias'].length; x++)
            {
                lista_sentencias.push(this.fabrica_instrucciones(instruccion_jason['sentencias'][x]));
            }

            return new Sentencia_While(instruccion_jason['linea'],instruccion_jason['columna'],this.fabrica_expresiones(instruccion_jason['condicion']),lista_sentencias);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_do_while')
        {
            let lista_sentencias : Array<Instruction>;

            lista_sentencias = new Array<Tipo_Acceso>();

            for(var x = 0; x < instruccion_jason['sentencias'].length; x++)
            {
                lista_sentencias.push(this.fabrica_instrucciones(instruccion_jason['sentencias'][x]));
            }

            return new Sentencia_Do_While(instruccion_jason['linea'],instruccion_jason['columna'],this.fabrica_expresiones(instruccion_jason['condicion']),lista_sentencias);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_for')
        {
            let lista_sentencias : Array<Instruction>;

            lista_sentencias = new Array<Tipo_Acceso>();

            for(var x = 0; x < instruccion_jason['lista_sentencias'].length; x++)
            {
                lista_sentencias.push(this.fabrica_instrucciones(instruccion_jason['lista_sentencias'][x]));
            }
            
            return new Sentencia_For(instruccion_jason['linea'],instruccion_jason['columna'],this.fabrica_instrucciones(instruccion_jason['sentencia1']), this.fabrica_expresiones(instruccion_jason['sentencia2']), this.fabrica_expresiones(instruccion_jason['sentencia3']),lista_sentencias);
        }
        // else if(instruccion_jason['etiqueta'] == 'sentencia_for_list')
        // {
        //     let lista_sentencias : Array<Instruction>;

        //     lista_sentencias = new Array<Tipo_Acceso>();

        //     for(var x = 0; x < instruccion_jason['lista_sentencias'].length; x++)
        //     {
        //         lista_sentencias.push(this.fabrica_instrucciones(instruccion_jason['lista_sentencias'][x]));
        //     }
            
        //     return new Sentencia_For_List(instruccion_jason['linea'],instruccion_jason['columna'],instruccion_jason['tipo'],instruccion_jason['id1'],instruccion_jason['id2'],lista_sentencias);
        // }
        else if(instruccion_jason['etiqueta'] == 'sentencia_acceso')
        {
            let lista_accesos : Array<Tipo_Acceso>;
            let tipo_acceso_jason : JSON;

           lista_accesos = new Array<Tipo_Acceso>();

            for(var cont = 0; cont < instruccion_jason['lista_acceso'].length; cont++)
            {
                tipo_acceso_jason = instruccion_jason['lista_acceso'][cont];
                lista_accesos.push(<Tipo_Acceso>this.fabrica_instrucciones(tipo_acceso_jason));
            }

            return new Sentencia_Acceso(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['identificador'], instruccion_jason['dimensiones'], lista_accesos);
        }
        else if(instruccion_jason['etiqueta'] == 'tipo_acceso')
        {
            return new Tipo_Acceso(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['tipo'], instruccion_jason['acceso0'] == null ? undefined : this.fabrica_expresiones(instruccion_jason['acceso0']), instruccion_jason['acceso2'] == null ? undefined : this.fabrica_expresiones(instruccion_jason['acceso2']),instruccion_jason['acceso1'] == null ? "": instruccion_jason['acceso1']);
        }
        else if(instruccion_jason['etiqueta'] == 'operador_incremento')
        {
            return this.fabrica_expresiones(instruccion_jason);
        }
        else if(instruccion_jason['etiqueta'] == 'operador_decremento')
        {
            return this.fabrica_expresiones(instruccion_jason);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_llamada')
        {
            let lista_parametros : Array<Expresion>;
            let parametro_jason : JSON;

            lista_parametros = new Array<Expresion>();

            for(var cont = 0; cont < instruccion_jason['parametros'].length; cont++)
            {
                parametro_jason = instruccion_jason['parametros'][cont];
                lista_parametros.push(this.fabrica_expresiones(parametro_jason));
            }

            return new Sentencia_Llamada(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['identificador'], lista_parametros);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_break')
        {
            return new Sentencia_Break(instruccion_jason['fila'], instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_continue')
        {
            return new Sentencia_Continue(instruccion_jason['fila'], instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'sentencia_return')
        {
            return new Sentencia_Return(instruccion_jason['fila'], instruccion_jason['columna'], instruccion_jason['valor'] == null ? undefined : this.fabrica_expresiones(instruccion_jason['valor']));
        }
        else
        {
            return undefined;
        }
    }

    private fabrica_expresiones(expresion_jason : JSON)
    {
        if(expresion_jason['etiqueta'] == 'suma')
        {
            return new Suma(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'resta')
        {
            return new Resta(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'multiplicacion')
        {
            return new Multiplicacion(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'division')
        {
            return new Division(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'potencia')
        {
            return new Potencia(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'modulo')
        {
            return new Modulo(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'mayor_que')
        {
            return new Mayor_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'menor_que')
        {
            return new Menor_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'mayor_igual_que')
        {
            return new Mayor_Igual_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'menor_igual_que')
        {
            return new Menor_Igual_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'igual_que')
        {
            return new Igual_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'diferente_que')
        {
            return new Diferente_Que(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'and')
        {
            return new And(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'or')
        {
            return new Or(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'not')
        {
            return new Not(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if(expresion_jason['etiqueta'] == 'operador_unario')
        {
            return new Operador_Unario(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if(expresion_jason['etiqueta'] == 'operador_incremento')
        {
            return new Operador_Incremento(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if(expresion_jason['etiqueta'] == 'operador_decremento')
        {
            return new Operador_Decremento(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['expresion1']));
        }
        else if(expresion_jason['etiqueta'] == 'operador_ternario')
        {
            return new Operador_Ternario(expresion_jason['fila'], expresion_jason['columna'], this.fabrica_expresiones(expresion_jason['condicion']), this.fabrica_expresiones(expresion_jason['expresion1']), this.fabrica_expresiones(expresion_jason['expresion2']));
        }
        else if(expresion_jason['etiqueta'] == 'sentencia_instancia')
        {
            let lista_identificadores : Array<String>;
            let lista_dimensiones : Array<Instruction>;
            let lista_valores : Array<Instruction>;
            let parametro_jason : JSON;

            lista_identificadores = new Array<String>();
            lista_dimensiones = new Array<Instruction>();
            lista_valores = new Array<Instruction>();

            if(expresion_jason['valor1'] != null)
            {
                for(var cont = 0; cont < expresion_jason['valor1'].length; cont++)
                {
                    parametro_jason = expresion_jason['valor1'][cont];
                    lista_dimensiones.push(this.fabrica_expresiones(parametro_jason));
                }
            }
            
            if(expresion_jason['valor2'] != null)
            {
                for(var cont = 0; cont < expresion_jason['valor2'].length; cont++)
                {
                    parametro_jason = expresion_jason['valor2'][cont];
                    
                    lista_identificadores.push(parametro_jason['identificador']);
                }

                for(var cont = 0; cont < expresion_jason['valor2'].length; cont++)
                {
                    parametro_jason = expresion_jason['valor2'][cont];
                
                    lista_valores.push(this.fabrica_expresiones(parametro_jason['valor']));
                }
            }

            return new Sentencia_Instancia(expresion_jason['fila'], expresion_jason['columna'], expresion_jason['tipo'], lista_identificadores, lista_dimensiones, lista_valores);
        }
        else if(expresion_jason['etiqueta'] == 'sentencia_acceso')
        {
            let lista_accesos : Array<Tipo_Acceso>;
            let tipo_acceso_jason : JSON;

            lista_accesos = new Array<Tipo_Acceso>();

            for(var cont = 0; cont < expresion_jason['lista_acceso'].length; cont++)
            {
                tipo_acceso_jason = expresion_jason['lista_acceso'][cont];
                lista_accesos.push(<Tipo_Acceso>this.fabrica_expresiones(tipo_acceso_jason));
            }
            return new Sentencia_Acceso(expresion_jason['fila'], expresion_jason['columna'], expresion_jason['identificador'], expresion_jason['dimensiones'], lista_accesos);
        }
        else if(expresion_jason['etiqueta'] == 'tipo_acceso')
        {
            return new Tipo_Acceso(expresion_jason['fila'],expresion_jason['columna'],expresion_jason['tipo'],expresion_jason['acceso0'] == null ? undefined : this.fabrica_expresiones(expresion_jason['acceso0']),expresion_jason['acceso2'] == null ? undefined : this.fabrica_expresiones(expresion_jason['acceso2']),expresion_jason['acceso1'] == null ? "": expresion_jason['acceso1']);
        }
        else if(expresion_jason['etiqueta'] == 'sentencia_llamada')
        {
            let lista_parametros : Array<Expresion>;
            let parametro_jason : JSON;

            lista_parametros = new Array<Expresion>();

            for(var cont = 0; cont < expresion_jason['parametros'].length; cont++)
            {
                parametro_jason = expresion_jason['parametros'][cont];
                lista_parametros.push(this.fabrica_expresiones(parametro_jason));
            }

            return new Sentencia_Llamada(expresion_jason['fila'], expresion_jason['columna'], expresion_jason['identificador'],lista_parametros);
        }
        else if(expresion_jason['etiqueta'] == 'dato_primitivo')
        {   
            let lista_dimensiones: Array<Instruction>;

            lista_dimensiones = new Array<Instruction>();

            for(var x = 0; x < expresion_jason['dimensiones'].length; x++)
            {
                lista_dimensiones.push(this.fabrica_expresiones(expresion_jason['dimensiones'][x]));
            }

            return new Dato_Primitivo(expresion_jason['fila'], expresion_jason['columna'],this.fabrica_tipo(expresion_jason['tipo']),expresion_jason['valor'],lista_dimensiones);
        }
        else
        {
            return undefined;
        }
    }


    private fabrica_tipo(tipo_jason : JSON)
    {
        if(tipo_jason == null)
        {
            return undefined;
        }

        if(tipo_jason['tipo'] == 0)
        {
            return new Tipo(tipo_dato.VOID);
        }
        else if(tipo_jason['tipo'] == 1)
        {
            return new Tipo(tipo_dato.NULO);
        }
        else if(tipo_jason['tipo'] == 2)
        {
            return new Tipo(tipo_dato.BOOLEANO);
        }
        else if(tipo_jason['tipo'] == 3)
        {
            return new Tipo(tipo_dato.NUMERO);
        }
        else if(tipo_jason['tipo'] == 4)
        {
            return new Tipo(tipo_dato.CADENA);
        }
        else if(tipo_jason['tipo'] == 5)
        {
            return new Tipo(tipo_dato.IDENTIFICADOR, tipo_jason['valor']);
        }
        else
        {
            undefined
        }
    }

}

export default AST;