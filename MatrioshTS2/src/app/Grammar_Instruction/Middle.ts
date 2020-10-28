import metodos_nativos from './Metodos_Nativos';
import Tabla_Simbolos from './Tabla_Simbolos';

class Middle
{
    private input : String;
    private output : String;

    private static instance : Middle = new Middle();

    constructor()
    {
        this.input = "";
        this.output = "";
    }

    public static getInstance()
    {
        if(this.instance != null)
        {
            return this.instance;
        }
        else
        {
            this.instance = new Middle();
            return this.instance;
        }
    }

    public initOuput()
    {
        let encabezado_tmp: String;
        let temporales_iniciales: String;
        let temporales_tmp: String;
        let code_tmp : String;
        let nativo_tmp : String;

        let cont: number;

        encabezado_tmp = "#include <stdio.h>\n";
        encabezado_tmp = encabezado_tmp.concat("float Heap[16384]; //Estructura Heap"  + "\n");
        encabezado_tmp = encabezado_tmp.concat("float Stack[16384];//Estructura Stack" + "\n");
        encabezado_tmp = encabezado_tmp.concat("float P;           //Puntero Stack" + "\n");
        encabezado_tmp = encabezado_tmp.concat("float H;           //Puntero Heap" + "\n");

        temporales_iniciales = "float ";

        for(var t = 1; t < 51; t++)
        {
            if(t <50)
            {
                temporales_iniciales = temporales_iniciales + "t" + t + ", ";
            }
            else
            {
                temporales_iniciales = temporales_iniciales + "t" + t + ";\n";
            }
        }
        encabezado_tmp = encabezado_tmp.concat(temporales_iniciales.toString());

        temporales_tmp = "float ";
        cont = Tabla_Simbolos.getInstance().getTemporal();
        for(var t = 51; t < cont; t++)
        {
            if(t < cont-1)
            {
                temporales_tmp = temporales_tmp + "t" + t + ", ";
            }
            else
            {
                temporales_tmp = temporales_tmp + "t" + t + ";\n";
            }
        }

        temporales_tmp = temporales_tmp.concat("\n\n\n");

        code_tmp = this.output;

        nativo_tmp = metodos_nativos.getMetodos_quemar();

        this.output = encabezado_tmp.toString() + temporales_tmp.toString() + code_tmp.toString() + nativo_tmp.toString();
    }

    public getInput()
    {
        return this.input;
    }

    public setInput(p_input : String)
    {
        this.input = p_input;
    }

    public getOuput()
    {
        return this.output;
    }

    public setOuput(p_output : String)
    {
        this.output = this.output.concat(p_output.toString(),"\n");
    }

    public clear()
    {
        this.input = "";
        this.output = "";
    }

    public clear3D()
    {
        this.output = "";
    }

}

export default Middle;