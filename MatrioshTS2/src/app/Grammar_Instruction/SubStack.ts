import Entorno from './Entorno';

class SubStack extends Array<Entorno>
{
    private identificador: String;
    
    private pos_if: number;
    private pos_for: number;
    private pos_while: number;
    private pos_Stack: number;
    private pos_switch: number;
    private pos_do_while: number;
    
    constructor(p_identicador: String)
    {
        super();
        this.identificador = p_identicador;
        this.pos_if = 0;
        this.pos_for = 0;
        this.pos_while = 0;
        this.pos_Stack = 0;
        this.pos_switch = 0;
        this.pos_do_while = 0;
    }

    public getIdentificador()
    {
        return this.identificador;
    }

    public getPos_if()
    {
        let aux = this.pos_if;
        this.pos_if = this.pos_if + 1;
        return aux;
    }

    public getPos_for()
    {
        let aux = this.pos_for;
        this.pos_for = this.pos_for + 1;
        return aux;
    }

    public getPos_while()
    {
        let aux = this.pos_while;
        this.pos_while = this.pos_while + 1;
        return aux;
    }

    public getPos_switch()
    {
        let aux = this.pos_switch;
        this.pos_switch = this.pos_switch + 1;
        return aux;
    }

    public getPos_do_while()
    {
        let aux = this.pos_do_while;
        this.pos_do_while = this.pos_do_while + 1;
        return aux;
    }

    public getPos_Stack()
    {
        let aux = this.pos_Stack;
        this.pos_Stack = this.pos_Stack + 1;
        return aux;
    }

    public getSize()
    {
        return this.pos_Stack;
    }
}

export default SubStack;