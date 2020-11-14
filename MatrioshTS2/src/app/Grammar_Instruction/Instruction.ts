import Middle from './Middle';
import Entorno from './Entorno';
import SubEntorno from './SubEntorno';

class Instruction
{
    protected fila : number
    protected columna: number

    /*EXCLUSIVOS PARA MEMORIA TRADUCCION*/
    protected entorno_padre: Entorno;
    protected nivel: number;

    protected etiqueta_continue : String;
    protected etiqueta_break    : String;
    protected etiqueta_return   : String;

    constructor(pfila:number, pcolumna: number)
    {
        this.fila = pfila;
        this.columna = pcolumna;

        this.etiqueta_continue = "";
        this.etiqueta_break    = "";
        this.etiqueta_return   = ""; 
    }

    analizar(entorno_padre : Entorno, nivel : number)
    {
        return undefined;
    }

    traducir(salida : Middle)
    {
        return undefined;
    }

    graficar(entorno_padre : Entorno, salida : Middle)
    {
        return undefined;
    }

    getThis()
    {
        return undefined;
    }

    get Fila()
    {
        return this.fila;        
    }

    set Fila(p_fila : number)
    {
        this.fila = p_fila;
    }

    get Columna()
    {
        return this.columna;
    }

    set Columna(p_columna : number)
    {
        this.columna = p_columna;
    }

    setEtiquetaContinue(p_etiqueta_continue)
    {
        this.etiqueta_continue = p_etiqueta_continue;
    }

    setEtiquetaBreak(p_etiqueta_break)
    {
        this.etiqueta_break = p_etiqueta_break;
    }

    setEtiquetaReturn(p_etiqueta_return)
    {
        this.etiqueta_return = p_etiqueta_return;
    }
}

export default Instruction;