import { salto } from './salto';
import { saltoAsigEdd } from './saltoAsigEdd';
import { saltoAsignacion } from './saltoAsignacion';
import { saltocallMetodo } from './saltocallMetodo';
import { saltoCondicional } from './saltoCondicional';
import { saltoDeclaracion } from './saltoDeclaracion';
import { saltoDecMetodo } from './saltoDecMetodo';
import { saltoEtiqueta } from './saltoEtiqueta';
import { saltoExpAritmetica } from './saltoExpAritmetica';
import { saltoImprimir } from './saltoImprimir';
import { saltoIncondicional } from './saltoIncondicional';
import { saltoLiteral } from './saltoLiteral';

class AST_Optimizacion
{
    private superjason : Array<JSON>;
    private lista_instrucciones : Array<Object>;

    constructor(p_jason : Array<JSON>, p_import : Boolean)
    {
        if(!p_import)
        {
            this.superjason = p_jason;
            this.lista_instrucciones = new Array<salto>();
        }
        
    }
    public import_ast()
    {

    }

    public exec_ast()
    {
        this.build_ast();
    }

    public build_ast()
    {   
        for(var i :number = 0; i < this.superjason.length; i++ )
        {            
            let _result : Object = this.fabrica_instrucciones(this.superjason[i])
            if(_result != undefined)
            {
                this.lista_instrucciones.push(_result); 
            }     
        } 
        
        return this.lista_instrucciones;
    }  

    private fabrica_instrucciones(instruccion_jason : JSON)
    {
        if(instruccion_jason['etiqueta'] == 'saltoIncondicional')
        {
            return new saltoIncondicional(instruccion_jason['etiq'],instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltoEtiqueta')
        {
            return new saltoEtiqueta(instruccion_jason['etiq'],instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltoCondicional')
        {
            return new saltoCondicional(this.fabrica_instrucciones(instruccion_jason['tipoDato']),instruccion_jason['signo'],this.fabrica_instrucciones(instruccion_jason['tipoDato2']),instruccion_jason['etiquetaV'],instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltoImprimir')
        {
            new saltoImprimir(this.fabrica_instrucciones(instruccion_jason['tipoDato']),instruccion_jason['cad'],this.fabrica_instrucciones(instruccion_jason['tipoDato2']),instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltoDeclaracion')
        {
            return new saltoDeclaracion(instruccion_jason['listaId'],instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltoAsignacion')
        {
            return new saltoAsignacion(this.fabrica_instrucciones(instruccion_jason['tipoDato']),this.fabrica_instrucciones(instruccion_jason['tipoDato2']),instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltoGetEdd')
        {
            return new saltoAsigEdd(this.fabrica_instrucciones(instruccion_jason['tipoDato']),instruccion_jason['edd'],this.fabrica_instrucciones(instruccion_jason['tipoDato2']),instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltoDecMetodo')
        {
            let lista_instrucciones = new Array<salto>();
            for(var i = 0; i < instruccion_jason['listaInstru'].length; i++)
            {
                lista_instrucciones.push(this.fabrica_instrucciones(instruccion_jason['listaInstru'][i]));
            }

            return new saltoDecMetodo(instruccion_jason['ide'],lista_instrucciones,instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltocallMetodo')
        {
            return new saltocallMetodo(instruccion_jason['identificador'],instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltoExpAritmetica')
        {
            return new saltoExpAritmetica(this.fabrica_instrucciones(instruccion_jason['tipoDato']),this.fabrica_instrucciones(instruccion_jason['tipoDato2']),instruccion_jason['signo'],this.fabrica_instrucciones(instruccion_jason['tipoDato3']),instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else if(instruccion_jason['etiqueta'] == 'saltoLiteral')
        {
            return new saltoLiteral(instruccion_jason['cad1'],instruccion_jason['cad2'],instruccion_jason['valor'],instruccion_jason['linea'],instruccion_jason['columna']);
        }
        else
        {
            return undefined;

        } 
    }

    public getLista_Instrucciones()
    {
        return this.lista_instrucciones;
    }

}

export default AST_Optimizacion;