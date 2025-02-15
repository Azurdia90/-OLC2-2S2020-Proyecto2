import Instruction from './Instruction';
import SubEntorno from './SubEntorno';
import SubStack from './SubStack';
import Simbolo from './Simbolo';
import Entorno from './Entorno';
import Middle from './Middle';
import Tipo from './Tipo';

class Funcion extends Instruction
{
    protected rol  : tipo_rol;
    protected tipo : Tipo;
    protected identificador : String;
    protected identificador_3D : String;
    protected substack : SubStack;
    protected entorno_local: Entorno;
    protected subentorno_global: SubEntorno;
    protected lista_valores : Array<Simbolo>;
    protected lista_parametros : Array<Instruction>;
    protected lista_sentencias : Array<Instruction>;  

    public constructor(p_fila : number, p_columna : number, p_id : String, p_lista_parametros : Array<Instruction>, p_lista_sentencias : Array<Instruction>)
    {
        super(p_fila,p_columna);
        this.identificador = p_id;
        this.identificador_3D = p_id;
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
    
    public pasarParametros(p_padre: Simbolo, lista_parametros_enviados : Array<Simbolo>)
    {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;        
    }

    public pasarParametrosT(salida: Middle, lista_parametros_enviados : Array<Simbolo>)
    {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;        
    }

    public analizar(entorno_padre : Entorno, nivel : number) 
    {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;
    }
    
    public traducir(salida : Middle) 
    {
        //To change body of generated methods, choose Tools | Templates.
        return undefined;
    }

}

export default Funcion;