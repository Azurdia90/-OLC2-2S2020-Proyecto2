import Simbolo from './Simbolo';
import Stack from './Stack';
import Funcion from './Funcion';
import Type_MatrioshTS from './Type_MatrioshTS';

class Tabla_Simbolos
{
    private static instance : Tabla_Simbolos  = new Tabla_Simbolos();
    
    private stack : Stack;
    private entorno_global : Map<String,Simbolo>;
    private lista_funciones : Array<Funcion>;    
    private lista_types : Array<Type_MatrioshTS>;

    constructor() 
    {
        this.stack = new Stack();
        this.entorno_global = new Map<String,Simbolo>();
        this.stack._push(0,0,this.entorno_global);

        this.lista_funciones = new Array<Funcion>();
    }
    
    public static getInstance()
    {
        if(this.instance != null)
        {
            return this.instance;
        }
        else
        {
            this.instance = new Tabla_Simbolos();
            return this.instance;
        }
    }

    public clear()
    {
        this.stack = new Stack();
        this.entorno_global.clear(); 
        this.stack._push(0,0,this.entorno_global);
        this.lista_funciones = new Array<Funcion>();
        this.lista_types = new Array<Type_MatrioshTS>();
    }
    
    public existFuncion(p_identificador : String)
    {
        let _return : Boolean = false;
        
        for(var x : number = 0; x < this.lista_funciones.length; x++)
        {
            let funcion_actual : Funcion = this.lista_funciones[x];
            if(funcion_actual.getIdentificador() == p_identificador)
            {
                return true;
            }
        }
        
        return _return;
    }
    
    public getFuncion(p_identificador : String)
    {
        let _return : Funcion;        
        //if(p_identificador == "SentenciasAnidadas"){console.log(this.lista_funciones);}
        for(var x : number = 0; x < this.lista_funciones.length; x++)
        {   
            let funcion_actual : Funcion = this.lista_funciones[x];
            if(funcion_actual.getIdentificador() == p_identificador)
            {   //if(funcion_actual.getIdentificador() == "SentenciasAnidadas"){console.log(funcion_actual.getThis());}
                return funcion_actual.getThis();
            }
        }
        
        return _return;
    }        

    public existType(p_identificador : String)
    {
        let _return : Boolean = false;
        
        for(var x : number = 0; x < this.lista_types.length; x++)
        {
            let type_actual : Type_MatrioshTS = this.lista_types[x];
            if(type_actual.getIdentificador() == p_identificador)
            {
                return true;
            }
        }
        
        return _return;
    }
    
    public getType(p_identificador : String)
    {
        let _return : Funcion;        
        
        for(var x : number = 0; x < this.lista_funciones.length; x++)
        {
            let funcion_actual : Funcion = this.lista_funciones[x];
            if(funcion_actual.getIdentificador() == p_identificador)
            {
                return funcion_actual.getThis();
            }
        }
        
        return _return;
    } 
        
    public getEntorno_global() 
    {
        return this.entorno_global;
    }

    public setEntorno_global(entorno_global : Map<String, Simbolo>) 
    {
        this.entorno_global = entorno_global;
    }

    public getStack() 
    {
        return this.stack;
    }

    public setStack(stack : Stack) 
    {
        this.stack = stack;
    }   

    public getLista_funciones() 
    {
        return this.lista_funciones;
    }

    public setLista_funciones(lista_funciones : Array<Funcion>) 
    {
        this.lista_funciones = lista_funciones;
    }

    public getLista_types() 
    {
        return this.lista_types;
    }

    public setLista_types(lista_types : Array<Type_MatrioshTS>) 
    {
        this.lista_types = lista_types;
    }
}

export default Tabla_Simbolos;