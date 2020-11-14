import Instruction from './Instruction';
import Entorno from './Entorno';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Tabla_Simbolos from './Tabla_Simbolos';

class Sentencia_Return extends Instruction
{
    private valor : Instruction;

    constructor(p_fila : number, p_columna : number, p_valor? : Instruction)
    {
        super(p_fila,p_columna);
        this.valor = p_valor;
    }

    public analizar(entorno_padre : Entorno, nivel : number)
    {
        var _return: Simbolo;
        var _return_tmp  : Simbolo;
        try
        {
            if(this.valor != undefined)
            {
                this.entorno_padre = entorno_padre;
                this.nivel = nivel;

                _return_tmp = this.valor.analizar(entorno_padre, nivel);
                _return = _return_tmp;
                return  _return;
            }
            else
            {
                var simbolo_retorno = new Simbolo(tipo_rol.valor, new Tipo(tipo_dato.VOID), "");
                _return.setFila(this.fila);
                _return.setColumna(this.columna);
                simbolo_retorno.setMensaje("null");

                return _return;
            }
        }
        catch(Exception)
        {
            _return = new Simbolo(tipo_rol.error, new Tipo(tipo_dato.CADENA), "33-12");
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("No pudo ser reconocido el tipo de dato");
            return _return;
        }
    }

    public traducir(salida : Middle)
    {
        try
        {    
            var temporal_retorno = "t" + Tabla_Simbolos.getInstance().getTemporal();

            if(this.valor != undefined)
            {
                var temporal_valor   = "t" + Tabla_Simbolos.getInstance().getTemporal();

                let valor_tmp : Simbolo = this.valor.traducir(salida);

                Middle.getInstance().setOuput(""); 
                Middle.getInstance().setOuput(temporal_retorno + " = P + 1;");
                Middle.getInstance().setOuput(temporal_valor + " = " + valor_tmp.getMensaje() + ";");
                Middle.getInstance().setOuput("Stack[(int)" + temporal_retorno + "] = " + temporal_valor + ";");
                Middle.getInstance().setOuput("goto " + this.etiqueta_return + ";");
            }
            else
            {
                Middle.getInstance().setOuput("goto " + this.etiqueta_return + ";");
            }

            let _return: Simbolo = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4")
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Return successful");  
            return _return;
        }
        catch(error)
        {
            console.log("//Etiqueta Return: " + error);
        }
    }

    public getThis()
    {
        return new Sentencia_Return(this.fila,this.columna, this.valor == undefined ? undefined : this.valor.getThis());
    }
}
export default Sentencia_Return;