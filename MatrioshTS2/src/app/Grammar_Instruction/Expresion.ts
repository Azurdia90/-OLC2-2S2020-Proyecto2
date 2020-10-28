import Instruction from './Instruction';
import Tipo from './Tipo';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Entorno from './Entorno';

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

    constructor(fila : number, columna : number, p_tipo_operacion: tipo_operacion, p_operador_izq? : Instruction,  p_operador_der? : Instruction, p_tipo? :Tipo, p_valor? : String)
    {
        super(fila,columna);
        this.operador_izq = p_operador_izq;
        this.operador_der = p_operador_der;
        this.operador = p_tipo_operacion;
        
        this.tipo = p_tipo;
        this.valor = p_valor;
    }

    analizar(entorno_padre : Entorno, salida : Middle)
    {
        return undefined;
    }

    traducir(entorno_padre : Entorno, salida : Middle)
    {
        return undefined;
    }

}

export default Expresion;