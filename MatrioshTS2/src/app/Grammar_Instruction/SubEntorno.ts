import Simbolo from "./Simbolo";

class SubEntorno extends Map<String,Simbolo>
{
    private entorno: String;

    constructor(p_nivel: String)
    {
        super();
        this.entorno = p_nivel;
    }

    public getEntorno()
    {
        return this.entorno;
    }
}

export default SubEntorno;