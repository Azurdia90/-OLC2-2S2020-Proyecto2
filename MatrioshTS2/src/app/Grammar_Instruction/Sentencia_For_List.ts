import Tabla_Simbolos from './Tabla_Simbolos';
import Instruction from "./Instruction";
import SubEntorno from './SubEntorno';
import Simbolo from './Simbolo';
import Entorno from './Entorno';
import Middle from './Middle';
import Tipo from './Tipo';



class Sentencia_For_List extends Instruction
{
    private identificador: String;

    private tipo: number;
    private iterator: String;
    private lista: Instruction;
    private lista_sentencias: Array<Instruction>;

    private objeto_iterator : Simbolo;
    
    constructor(p_linea: number, p_columna : number, p_tipo: number, p_iterator : String, p_lista: Instruction, p_lista_sentencias : Array<Instruction>)
    {
        super(p_linea,p_columna);

        this.tipo = p_tipo;
        this.lista = p_lista;     
        this.iterator = p_iterator;
        this.lista_sentencias = p_lista_sentencias;
    }

    public analizar(entorno_padre : Entorno, nivel : number)
    {   let cont_for : number;
        let _return  : Simbolo;
        let tmp_val1 : Simbolo;
        let tmp_val2 : Simbolo;
        let etapa : number;
        try
        {
            etapa = 0;
            cont_for = entorno_padre.getPadre().getPos_for();
            this.identificador = "for" + cont_for;

            let entorno_for: SubEntorno = new SubEntorno(this.identificador);
            entorno_padre._push(entorno_for);

            tmp_val1 = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NULO), this.iterator);
            tmp_val1.setMensaje("null");

            etapa = 1;
            tmp_val2 = this.lista.analizar(entorno_padre, entorno_padre.getLastNivel());
            
            if (tmp_val2 == null)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia For In/For: No existe lista a iterar.");
                return _return;
            }

            if(tmp_val2.getRol() != tipo_rol.arreglo && tmp_val2.getRol() != tipo_rol.type)
            {
                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "10-4");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("Sentencia For In/For: Es para listas y types únicamente.");
                return _return;
            }
            
            if(this.tipo == 0)
            {
                etapa = 2;
                if(tmp_val2.getRol() == tipo_rol.arreglo)
                {
                    tmp_val1 = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.NUMERO),this.iterator);
                    tmp_val1.setMensaje("variable iteradora");
                    entorno_padre.set_e(this.iterator,tmp_val1);
                    this.objeto_iterator = tmp_val1;
    
                    var val_sentencia: Simbolo;
                    
                    for(var x = 0; x <  this.lista_sentencias.length; x++)
                    {           
                        val_sentencia = this.lista_sentencias[x].analizar(entorno_padre,entorno_padre.getLastNivel());
    
                        if (val_sentencia.getRol() == tipo_rol.error)
                        {                        
                            _return = val_sentencia;
                            return _return;
                        }
                        else
                        {     
                            _return = val_sentencia;
                            continue;
                        }       
                    }  
                }
                else
                {   etapa = 2;
                    tmp_val1 = new Simbolo(tipo_rol.valor,new Tipo(tipo_dato.CADENA),this.iterator);
                    tmp_val1.setMensaje("variable iteradora");
                    entorno_padre.set_e(this.iterator,tmp_val1);
                    this.objeto_iterator = tmp_val1;
    
                    var val_sentencia: Simbolo;
                    
                    for(var x = 0; x <  this.lista_sentencias.length; x++)
                    {                    
                        val_sentencia = this.lista_sentencias[x].analizar(entorno_padre,nivel);
    
                        if (val_sentencia.getRol() == tipo_rol.error)
                        {                        
                            _return = val_sentencia;
                            return _return;
                        }
                        else
                        {     
                            _return = val_sentencia;
                            continue;
                        }       
                    }     
                }
            }
            else if(this.tipo == 1)
            {
                if(tmp_val2.getRol() == tipo_rol.arreglo)
                {   etapa = 2;
                    tmp_val1 = new Simbolo(tipo_rol.valor,tmp_val2.getTipo(),this.iterator);
                    tmp_val1.setMensaje("variable iteradora");
                    entorno_padre.set_e(this.iterator,tmp_val1);
                    this.objeto_iterator = tmp_val1;
        
                    var val_sentencia: Simbolo;
                    
                    for(var x = 0; x <  this.lista_sentencias.length; x++)
                    {                    
                        val_sentencia = this.lista_sentencias[x].analizar(entorno_padre,entorno_padre.getLastNivel());
    
                        if (val_sentencia.getRol() == tipo_rol.error)
                        {                        
                            _return = val_sentencia;
                            return _return;
                        }
                        else
                        {     
                            _return = val_sentencia;
                            continue;
                        }       
                    }  
                }
                else
                {   etapa = 2;
                    tmp_val1 = new Simbolo(tipo_rol.valor,tmp_val2.getTipo(),this.iterator);
                    tmp_val1.setMensaje("variable iteradora");
                    entorno_padre.set_e(this.iterator,tmp_val1);
                    this.objeto_iterator = tmp_val1;

                    var val_sentencia: Simbolo;
                        
                    for(var x = 0; x <  this.lista_sentencias.length; x++)
                    {                    
                        val_sentencia = this.lista_sentencias[x].analizar(entorno_padre,nivel);
    
                        if (val_sentencia.getRol() == tipo_rol.error)
                        {                        
                            _return = val_sentencia;
                            return _return;
                        }
                        else
                        {     
                            _return = val_sentencia;
                            continue;
                        }       
                    } 
                }
            }
            else
            {
                Tabla_Simbolos.getInstance().getStack().pop();

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar Sentencia For In/Of: expresión no válida.");
                return _return;
            }
            etapa = 5;
            this.entorno_padre = entorno_padre;
            this.nivel = nivel;

            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia For In/Of Ejecutada correctamente");  
            return _return;

        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Sentencia For In/Of (a" + etapa + "): " + Exception.Message);
            return _return;
        }
    }

    public traducir(salida : Middle)
    {  
        let _return  : Simbolo;
        let tmp_val1 : Simbolo;
        let tmp_val2 : Simbolo;
        let etapa : number;
        try
        {
            etapa = 0;

            tmp_val1 = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.NULO), this.iterator);
            tmp_val1.setMensaje("null");

            tmp_val2 = this.lista.traducir(salida);
            etapa = 1;

            if(this.tipo == 0)
            {
                if(tmp_val2.getRol() == tipo_rol.arreglo)
                {   etapa = 2;
                    let etiqueta_inicio    = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
                    let etiqueta_positiva  = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
                    let etiqueta_negativa  = "l" + Tabla_Simbolos.getInstance().getEtiqueta(); 
                    let etiqueta_siguiente = "l" + Tabla_Simbolos.getInstance().getEtiqueta();

                    let etiqueta_length_array        = "t" + Tabla_Simbolos.getInstance().getTemporal();                          
                    let etiqueta_posicion_heap_array = "t" + Tabla_Simbolos.getInstance().getTemporal();

                    let etiqueta_pos_iterator   = "t" + Tabla_Simbolos.getInstance().getTemporal();                          
                    let etiqueta_contador       = "t" + Tabla_Simbolos.getInstance().getTemporal();

                    Middle.getInstance().setOuput("");
                    Middle.getInstance().setOuput("//CICLO FOR IN");
                    Middle.getInstance().setOuput(etiqueta_posicion_heap_array + " = " + tmp_val2.getMensaje() + ";");
                    Middle.getInstance().setOuput(etiqueta_length_array + " = Heap[(int)" + etiqueta_posicion_heap_array + "];");

                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput("Stack[(int)" + etiqueta_pos_iterator + "] = 0;");

                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput(etiqueta_contador + " = Stack[(int)" + etiqueta_pos_iterator + "];");
                    
                    Middle.getInstance().setOuput(etiqueta_inicio + ":");
                    Middle.getInstance().setOuput("if(" + etiqueta_contador + " < " + etiqueta_length_array + ") goto " + etiqueta_positiva + ";");
                    Middle.getInstance().setOuput("goto " + etiqueta_negativa + ";"); 
                    Middle.getInstance().setOuput(etiqueta_positiva + ":"); 
    
                    var val_sentencia: Simbolo;
                    
                    for(var x = 0; x <  this.lista_sentencias.length; x++)
                    { 
                        this.lista_sentencias[x].setEtiquetaContinue(etiqueta_siguiente);
                        this.lista_sentencias[x].setEtiquetaBreak(etiqueta_negativa);
                        this.lista_sentencias[x].setEtiquetaReturn(this.etiqueta_return);          
                        val_sentencia = this.lista_sentencias[x].traducir(salida);
    
                        if (val_sentencia.getRol() == tipo_rol.error)
                        {                        
                            _return = val_sentencia;
                            return _return;
                        }
                        else
                        {     
                            _return = val_sentencia;
                            continue;
                        }       
                    }  

                    Middle.getInstance().setOuput(etiqueta_siguiente + ":"); 
                    Middle.getInstance().setOuput(etiqueta_contador + " = " + etiqueta_contador + " + 1;");
                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput("Stack[(int)" + etiqueta_pos_iterator + "] = " + etiqueta_contador + ";");
                    Middle.getInstance().setOuput("goto " + etiqueta_inicio + ";"); 
                    Middle.getInstance().setOuput(etiqueta_negativa + ":"); 
                    Middle.getInstance().setOuput("P = P - 0;"); 
                }
                else
                {   etapa = 2;
                    let etiqueta_inicio    = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
                    let etiqueta_positiva  = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
                    let etiqueta_negativa  = "l" + Tabla_Simbolos.getInstance().getEtiqueta(); 
                    let etiqueta_siguiente = "l" + Tabla_Simbolos.getInstance().getEtiqueta();

                    let etiqueta_length_array        = "t" + Tabla_Simbolos.getInstance().getTemporal();                          
                    let etiqueta_posicion_heap_array = "t" + Tabla_Simbolos.getInstance().getTemporal();

                    let etiqueta_pos_iterator   = "t" + Tabla_Simbolos.getInstance().getTemporal();                          
                    let etiqueta_contador       = "t" + Tabla_Simbolos.getInstance().getTemporal();

                    Middle.getInstance().setOuput("");
                    Middle.getInstance().setOuput("//CICLO FOR IN");
                    Middle.getInstance().setOuput(etiqueta_posicion_heap_array + " = " + tmp_val2.getMensaje() + ";");
                    Middle.getInstance().setOuput(etiqueta_length_array + " = Heap[(int)" + etiqueta_posicion_heap_array + "];");

                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput("Stack[(int)" + etiqueta_pos_iterator + "] = 0;");

                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput(etiqueta_contador + " = Stack[(int)" + etiqueta_pos_iterator + "];");
                    
                    Middle.getInstance().setOuput(etiqueta_inicio + ":");
                    Middle.getInstance().setOuput("if(" + etiqueta_contador + " < " + etiqueta_length_array + ") goto " + etiqueta_positiva + ";");
                    Middle.getInstance().setOuput("goto " + etiqueta_negativa + ";"); 
                    Middle.getInstance().setOuput(etiqueta_positiva + ":"); 
    
                    var val_sentencia: Simbolo;
                    
                    for(var x = 0; x <  this.lista_sentencias.length; x++)
                    { 
                        this.lista_sentencias[x].setEtiquetaContinue(etiqueta_siguiente);
                        this.lista_sentencias[x].setEtiquetaBreak(etiqueta_negativa);
                        this.lista_sentencias[x].setEtiquetaReturn(this.etiqueta_return);          
                        val_sentencia = this.lista_sentencias[x].traducir(salida);
    
                        if (val_sentencia.getRol() == tipo_rol.error)
                        {                        
                            _return = val_sentencia;
                            return _return;
                        }
                        else
                        {     
                            _return = val_sentencia;
                            continue;
                        }       
                    }  

                    Middle.getInstance().setOuput(etiqueta_siguiente + ":"); 
                    Middle.getInstance().setOuput(etiqueta_contador + " = " + etiqueta_contador + " + 1;");
                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput("Stack[(int)" + etiqueta_pos_iterator + "] = " + etiqueta_contador + ";");
                    Middle.getInstance().setOuput("goto " + etiqueta_inicio + ";"); 
                    Middle.getInstance().setOuput(etiqueta_negativa + ":"); 
                    Middle.getInstance().setOuput("P = P - 0;");  
                }
            }
            else if(this.tipo == 1)
            {
                if(tmp_val2.getRol() == tipo_rol.arreglo)
                {   etapa = 2;
                    let etiqueta_inicio    = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
                    let etiqueta_positiva  = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
                    let etiqueta_negativa  = "l" + Tabla_Simbolos.getInstance().getEtiqueta(); 
                    let etiqueta_siguiente = "l" + Tabla_Simbolos.getInstance().getEtiqueta();

                    let etiqueta_posicion_length_array = "t" + Tabla_Simbolos.getInstance().getTemporal();                          
                    let etiqueta_posicion_heap_array = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    let etiqueta_length_array        = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    let etiqueta_valor_array = "t" + Tabla_Simbolos.getInstance().getTemporal();  

                    let etiqueta_pos_iterator   = "t" + Tabla_Simbolos.getInstance().getTemporal();                          
                    let etiqueta_contador       = "t" + Tabla_Simbolos.getInstance().getTemporal();

                    Middle.getInstance().setOuput("");
                    Middle.getInstance().setOuput("//CICLO FOR OF");
                    Middle.getInstance().setOuput(etiqueta_posicion_length_array + " = " + tmp_val2.getMensaje() + ";");
                    Middle.getInstance().setOuput(etiqueta_posicion_heap_array + " = " + etiqueta_posicion_length_array + " + 1;");
                    Middle.getInstance().setOuput(etiqueta_length_array + " = Heap[(int)" + etiqueta_posicion_length_array + "];");
                    Middle.getInstance().setOuput(etiqueta_valor_array  + " = Heap[(int)" + etiqueta_posicion_heap_array + "];");

                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput("Stack[(int)" + etiqueta_pos_iterator + "] = " + etiqueta_valor_array + ";");
                    
                    Middle.getInstance().setOuput(etiqueta_contador + " = 0;");
                    
                    Middle.getInstance().setOuput(etiqueta_inicio + ":");
                    Middle.getInstance().setOuput("if(" + etiqueta_contador + " < " + etiqueta_length_array + ") goto " + etiqueta_positiva + ";");
                    Middle.getInstance().setOuput("goto " + etiqueta_negativa + ";"); 
                    Middle.getInstance().setOuput(etiqueta_positiva + ":"); 
    
                    var val_sentencia: Simbolo;
                    
                    for(var x = 0; x <  this.lista_sentencias.length; x++)
                    {      
                        this.lista_sentencias[x].setEtiquetaContinue(etiqueta_siguiente);
                        this.lista_sentencias[x].setEtiquetaBreak(etiqueta_negativa);
                        this.lista_sentencias[x].setEtiquetaReturn(this.etiqueta_return); 
                        val_sentencia = this.lista_sentencias[x].traducir(salida);
    
                        if (val_sentencia.getRol() == tipo_rol.error)
                        {                        
                            _return = val_sentencia;
                            return _return;
                        }
                        else
                        {     
                            _return = val_sentencia;
                            continue;
                        }       
                    }     

                    Middle.getInstance().setOuput(etiqueta_siguiente + ":"); 
                    Middle.getInstance().setOuput(etiqueta_contador + " = " + etiqueta_contador + " + 1;");

                    Middle.getInstance().setOuput(etiqueta_posicion_heap_array + " = " + etiqueta_posicion_heap_array + " + 1;");
                    Middle.getInstance().setOuput(etiqueta_valor_array  + " = Heap[(int)" + etiqueta_posicion_heap_array + "];");
                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput("Stack[(int)" + etiqueta_pos_iterator + "] = " + etiqueta_valor_array + ";");

                    Middle.getInstance().setOuput("goto " + etiqueta_inicio + ";"); 
                    Middle.getInstance().setOuput(etiqueta_negativa + ":"); 
                    Middle.getInstance().setOuput("P = P - 0;");   
                }
                else
                {   etapa = 2;
                    let etiqueta_inicio    = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
                    let etiqueta_positiva  = "l" + Tabla_Simbolos.getInstance().getEtiqueta();
                    let etiqueta_negativa  = "l" + Tabla_Simbolos.getInstance().getEtiqueta(); 
                    let etiqueta_siguiente = "l" + Tabla_Simbolos.getInstance().getEtiqueta();

                    let etiqueta_posicion_length_array = "t" + Tabla_Simbolos.getInstance().getTemporal();                          
                    let etiqueta_posicion_heap_array = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    let etiqueta_length_array        = "t" + Tabla_Simbolos.getInstance().getTemporal();
                    let etiqueta_valor_array = "t" + Tabla_Simbolos.getInstance().getTemporal();  

                    let etiqueta_pos_iterator   = "t" + Tabla_Simbolos.getInstance().getTemporal();                          
                    let etiqueta_contador       = "t" + Tabla_Simbolos.getInstance().getTemporal();

                    Middle.getInstance().setOuput("");
                    Middle.getInstance().setOuput("//CICLO FOR OF");
                    Middle.getInstance().setOuput(etiqueta_posicion_length_array + " = " + tmp_val2.getMensaje() + ";");
                    Middle.getInstance().setOuput(etiqueta_posicion_heap_array + " = " + etiqueta_posicion_length_array + " + 1;");
                    Middle.getInstance().setOuput(etiqueta_length_array + " = Heap[(int)" + etiqueta_posicion_length_array + "];");
                    Middle.getInstance().setOuput(etiqueta_valor_array  + " = Heap[(int)" + etiqueta_posicion_heap_array + "];");

                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput("Stack[(int)" + etiqueta_pos_iterator + "] = " + etiqueta_valor_array + ";");
                    
                    Middle.getInstance().setOuput(etiqueta_contador + " = 0;");
                    
                    Middle.getInstance().setOuput(etiqueta_inicio + ":");
                    Middle.getInstance().setOuput("if(" + etiqueta_contador + " < " + etiqueta_length_array + ") goto " + etiqueta_positiva + ";");
                    Middle.getInstance().setOuput("goto " + etiqueta_negativa + ";"); 
                    Middle.getInstance().setOuput(etiqueta_positiva + ":"); 
    
                    var val_sentencia: Simbolo;
                    
                    for(var x = 0; x <  this.lista_sentencias.length; x++)
                    {      
                        this.lista_sentencias[x].setEtiquetaContinue(etiqueta_siguiente);
                        this.lista_sentencias[x].setEtiquetaBreak(etiqueta_negativa);
                        this.lista_sentencias[x].setEtiquetaReturn(this.etiqueta_return); 
                        val_sentencia = this.lista_sentencias[x].traducir(salida);
    
                        if (val_sentencia.getRol() == tipo_rol.error)
                        {                        
                            _return = val_sentencia;
                            return _return;
                        }
                        else
                        {     
                            _return = val_sentencia;
                            continue;
                        }       
                    }     

                    Middle.getInstance().setOuput(etiqueta_siguiente + ":"); 
                    Middle.getInstance().setOuput(etiqueta_contador + " = " + etiqueta_contador + " + 1;");

                    Middle.getInstance().setOuput(etiqueta_posicion_heap_array + " = " + etiqueta_posicion_heap_array + " + 1;");
                    Middle.getInstance().setOuput(etiqueta_valor_array  + " = Heap[(int)" + etiqueta_posicion_heap_array + "];");
                    Middle.getInstance().setOuput(etiqueta_pos_iterator + " =  P + " + this.objeto_iterator.getPos_S() + ";");
                    Middle.getInstance().setOuput("Stack[(int)" + etiqueta_pos_iterator + "] = " + etiqueta_valor_array + ";");

                    Middle.getInstance().setOuput("goto " + etiqueta_inicio + ";"); 
                    Middle.getInstance().setOuput(etiqueta_negativa + ":"); 
                    Middle.getInstance().setOuput("P = P - 0;"); 
                }
            }
            else
            {
                Tabla_Simbolos.getInstance().getStack().pop();

                _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                _return.setMensaje("No es posible realizar Sentencia For In/Of: expresión no válida.");
                return _return;
            }
                       
            _return = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia For In/Of Ejecutada correctamente");  
            return _return;

        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error,new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Error Sentencia For In/Of: " + Exception.Message);
            return _return;
        }
    }

    public getThis() 
    {
        var clon_lista_sentencias: Array<Instruction> = new Array<Instruction>();
    
        for(var x = 0; x < this.lista_sentencias.length; x++)
        {   
            clon_lista_sentencias.push(this.lista_sentencias[x].getThis());
        }
        
        return new Sentencia_For_List(this.fila,this.columna,this.tipo,this.iterator,this.lista,clon_lista_sentencias);
    }
}

export default Sentencia_For_List;