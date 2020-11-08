import Instruction from './Instruction';
import Entorno from './Entorno';
import Middle from './Middle';
import Tipo from './Tipo';

class Expresion extends Instruction
{
    /*INDICE PARA EL MANEJO DE LAS OPERACIONES*/
    protected operador : tipo_operacion;
    
   /*EXCLUSIVOS PARA EL MANEJO DE TIPOS PRIMITIVOS*/
    protected tipo : Tipo;
    protected valor : String;
   
    /*EXCLUSIVOS PARA EL MANEJO DE OPERACIONES*/
    protected operador_izq : Instruction;
    protected operador_der : Instruction;

    /*EXCLUSIVOS PARA MEMORIA TRADUCCION*/
    protected entorno_padre: Entorno;
    protected nivel: number;

    constructor(fila : number, columna : number, p_tipo_operacion: tipo_operacion, p_operador_izq? : Instruction,  p_operador_der? : Instruction, p_tipo? :Tipo, p_valor? : String)
    {
        super(fila,columna);
        this.operador_izq = p_operador_izq;
        this.operador_der = p_operador_der;
        this.operador = p_tipo_operacion;
        
        this.tipo = p_tipo;
        this.valor = p_valor;

        this.entorno_padre = null;
        this.nivel = 0;
    }

    analizar(entorno_padre : Entorno, nivel : number)
    {
        return undefined;
    }

    traducir(salida : Middle)
    {
        return undefined;
    }

}

export default Expresion;