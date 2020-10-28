import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Entorno from './Entorno';

class Funcion extends Instruction
{
    protected tipo : Tipo;
    protected identificador : String;
    
    protected entorno_local : Entorno;
    protected lista_valores : Array<Simbolo>;
    protected lista_parametros : Array<Instruction>;
    protected lista_sentencias : Array<Instruction>;  

    public constructor(p_fila : number, p_columna : number, p_id : String, p_lista_parametros : Array<Instruction>, p_lista_sentencias : Array<Instruction>)
    {
        super(p_fila,p_columna);
        this.identificador = p_id;
        this.lista_parametros = p_lista_parametros;
        this.lista_sentencias = p_lista_sentencias;
        
        this.lista_valores = new Array<Simbolo>();
    }

    public getTipo()
    {
        return this.tipo;
    }
    
    public getIdentificador() 
    {
        return this.identificador;
    }  

    public getLista_parametros() 
    {
        return this.lista_parametros;
    }

    public setLista_parametros(p_lista_parametros : Array<Instruction> ) 
    {
        this.lista_parametros = p_lista_parametros;
    }   
    
    public getThis()
    {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;       
    }
    
    public pasarParametros(p_padre: Simbolo, lista_parametros_enviados : Array<Simbolo> , salida : Middle)
    {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;        
    }

    public analizar(entorno_padre : Entorno, salida : Middle) 
    {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;
    }
    
    public traducir(entorno_padre : Entorno, salida : Middle) 
    {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;
    }

}

export default Funcion;