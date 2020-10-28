import { isConstructSignatureDeclaration } from 'typescript';
import Entorno from './Entorno';
import Instruction from './Instruction';
import Middle from './Middle';
import Simbolo from './Simbolo';
import Tipo from './Tipo';


class Type_MatrioshTS extends Instruction
{
    private identificador : String;
    private lista_atributos: Array<String>;
    private lista_tipos: Array<Tipo>;

    constructor(p_fila: number, p_columna: number, p_id: String, p_lista_atributos: Array<String>, p_lista_tipos: Array<Tipo>)
    {
        super(p_fila, p_columna);
        this.identificador = p_id;
        this.lista_atributos = p_lista_atributos;
        this.lista_tipos = p_lista_tipos;
    }

    public getFila()
    {
        return this.fila;
    }

    public getColumna()
    {
        return this.columna;
    }

    public getIdentificador()
    {
        return this.identificador;
    }

    public getListaAtributos()
    {
        return this.lista_atributos;
    }

    public getListaTipos()
    {
        return this.lista_tipos;
    }

    public anlizar(entorno_padre : Entorno, salida : Middle)
    {
        return undefined;
    }

    public traducir(entorno_padre : Entorno, salida : Middle)
    {
        return undefined;
    }

    public getThis()
    {
        let clon_lista_atributos: Array<String>;
        let clon_lista_tipos: Array<Tipo>;

        clon_lista_atributos = new Array<String>();
        clon_lista_tipos = new Array<Tipo>();

        for(var x = 0; x < this.lista_atributos.length; x++)
        {
            clon_lista_atributos.push(this.lista_atributos[x].toString());
        }

        for(var y = 0; y < this.lista_tipos.length; y++)
        {
            clon_lista_tipos.push(this.lista_tipos[y]);
        }

        new Type_MatrioshTS(this.fila,this.columna,this.identificador,clon_lista_atributos,clon_lista_tipos);
    }

}

export default Type_MatrioshTS;