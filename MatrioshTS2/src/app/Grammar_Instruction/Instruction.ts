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

    constructor(pfila:number, pcolumna: number)
    {
        this.fila = pfila;
        this.columna = pcolumna;
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
}

export default Instruction;