class Tipo
{
    private tipo : tipo_dato;
    private traduccion : String;
    private prioridad : number;
    private identificador : String;

    constructor(p_tipo : tipo_dato, p_identificador? : String)
    {
        this.identificador = p_identificador;
        this.traducir(p_tipo);
        this.tipo = p_tipo;
    }

    private traducir(p_tipo : tipo_dato)
    {
        if(p_tipo == tipo_dato.VOID)
        {
            this.traduccion = "void";
            this.prioridad = -1;
        }
        else if(p_tipo == tipo_dato.NULO)
        {
            this.traduccion = "null";
            this.prioridad = 3;
        }
        else if(p_tipo == tipo_dato.BOOLEANO)
        {
            this.traduccion = "boolean";
            this.prioridad = 0;
        }
        else if(p_tipo == tipo_dato.NUMERO)
        {
            this.traduccion = "number";
            this.prioridad = 1;
        }
        else if(p_tipo == tipo_dato.CADENA)
        {
            this.traduccion = "string";
            this.prioridad = 2;
        }     
        else
        {
            this.traduccion = this.identificador;
            this.prioridad = 3;
        }
    }

    public Equals(tipo_comp: Tipo)
    {
        if(this.tipo == tipo_comp.getTipo())
        {
            if(this.tipo != tipo_dato.IDENTIFICADOR)
            {
                return true;
            }
            else
            {
                if(this.identificador == tipo_comp.getIdentificador())
                {
                    return true;
                }
                else
                {
                    if(tipo_comp.getTraduccion() == "")
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }
        else
        {
            if(this.tipo == tipo_dato.NULO)
            {
                return true;
            }
            else
            {
                if(tipo_comp.getTipo() == tipo_dato.NULO)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }

    public getTipo()
    {
        return this.tipo
    }

    public getTraduccion()
    {
        if(this.tipo != tipo_dato.IDENTIFICADOR)
        {
            return this.traduccion;
        }
        else
        {
            return this.identificador;
        }
    }

    public getPrioridad()
    {
        return this.prioridad;
    }

    public getIdentificador()
    {
        return this.identificador;
    }
}

export default Tipo