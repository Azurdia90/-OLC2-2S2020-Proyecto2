import Instruction from './Instruction';
import Simbolo from './Simbolo';
import Middle from './Middle';
import Tipo from './Tipo';
import Entorno from './Entorno';

class Sentencia_Break extends Instruction
{
    constructor(p_fila : number, p_columna : number)
    {
        super(p_fila,p_columna);
    }

    public analizar(entorno_padre : Entorno, nivel : number)
    {
        var _result: Simbolo;
        _result = new Simbolo(tipo_rol.detener,new Tipo(tipo_dato.CADENA), "");
        _result.setFila(this.fila);
        _result.setColumna(this.columna);
        _result.setMensaje("Sentencia Break");
        return _result;
    }

    public traducir(salida : Middle)
    {
        try
        {    
            Middle.getInstance().setOuput("");                               
            Middle.getInstance().setOuput("goto " + this.etiqueta_break + ";"); 

            let _return: Simbolo = new Simbolo(tipo_rol.aceptado,new Tipo(tipo_dato.CADENA), "10-4")
            _return.setFila(this.fila);
            _return.setColumna(this.columna);
            _return.setMensaje("Sentencia Break successful");  
            return _return;
        }
        catch(error)
        {
            console.log("//Etiqueta Break: " + error);
        }
    }

    public getThis()
    {
        return new Sentencia_Break(this.fila,this.columna);
    }
}
export default Sentencia_Break;