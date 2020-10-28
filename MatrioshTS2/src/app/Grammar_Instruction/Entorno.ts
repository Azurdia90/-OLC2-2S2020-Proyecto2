import Simbolo from "./Simbolo";

class Entorno extends Map<String,Simbolo>
{
    private identificador: String;
    private pos_Stack: number;
    private pos_if: number;
    private pos_for: number;
    private pos_while: number;
    private pos_switch: number;
    private pos_do_while: number;
    
    constructor(p_identicador: String)
    {
        super();
        this.identificador = p_identicador;
        this.pos_Stack = 0;
    }

    public getIdentificador()
    {
        return this.identificador;
    }

    public getPos_Stack()
    {
        return this.pos_Stack;
    }

    public setPos_Stack(value: number)
    {
        this.pos_Stack = value;
    }

    public set_e(key: String,value: Simbolo)
    {
        value.setPos_S(this.pos_Stack);
        this.set(key,value);
        this.pos_Stack = this.pos_Stack + 1;
    }

}

export default Entorno;