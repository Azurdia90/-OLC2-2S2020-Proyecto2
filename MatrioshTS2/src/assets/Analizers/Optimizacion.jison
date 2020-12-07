%{
    // const { saltoLiteral} = require('../../app/Optimizacion/saltoLiteral');
    // const { saltoExpAritmetica} = require('../../app/Optimizacion/saltoExpAritmetica');
    // const { saltocallMetodo} = require('../../app/Optimizacion/saltocallMetodo');
    // const { saltoDecMetodo} = require('../../app/Optimizacion/saltoDecMetodo');
    // const { saltoGetEdd} = require('../../app/Optimizacion/saltoGetEdd');
    // const { saltoAsigEdd } = require('../../app/Optimizacion/saltoAsigEdd');
    // const { saltoAsignacion } = require('../../app/Optimizacion/saltoAsignacion');
    // const { saltoDeclaracion } = require('../../app/Optimizacion/saltoDeclaracion');
    // const { saltoImprimir } = require('../../app/Optimizacion/saltoImprimir');
    // const { saltoCondicional } = require('../../app/Optimizacion/saltoCondicional');
    // const { saltoEtiqueta } = require('../../app/Optimizacion/saltoEtiqueta');
    // const { saltoIncondicional } = require('../../app/Optimizacion/saltoIncondicional');
%}

/* lexical grammar */
%lex
%%
\s+                   /* skip whitespace */
"//"[^\n]*            /*comentario lineal*/ 
"/*"[^"/#"]*"*/"      /*comentario multilineal*/
[-]?[0-9]+("."[0-9]+)?\b      return 'entero'

"%c"                  return 'TIPPRINT'
"%i"                  return 'TIPPRINT'  
"%f"                  return 'TIPPRINT'
"%d"                  return 'TIPPRINT'

//--- Operadores aritmeticos
"!="                  return 'DIFERENTE'
">="                  return 'MAYORQUE'
"<="                  return 'MENORQUE'
"+"                   return 'MAS'
"-"                   return 'MENOS'
"*"                   return 'POR'
"/"                   return 'DIV'
"%"                   return 'MOD'
"=="                  return 'IGUALIGUAL'
"="                   return 'IGUAL'
","                   return 'COMA'
":"                   return 'DOSP'
";"                   return 'PUNTOC'
"$"                   return 'dol'
"("                   return 'APAR'
")"                   return 'CPAR'
">"                   return 'MAYOR'
"<"                   return 'MENOR'
"{"                   return 'ALLAVE'
"}"                   return 'CLLAVE'

"\""                  return 'com'
"["                   return 'COR'
"]"                   return 'CORC'
"("                   return 'APAR'
")"                   return 'CPAR'
//--- Palabras reservadas
"if"                  return 'IF'
"goto"                return "GOTO"
"proc"                return 'PROC'
"begin"               return 'BEGIN'
"end"                 return 'END'
"call"                return 'CALL'
"printf"              return 'PRINT'
"Heap"                return 'HEAP'
"Stack"               return 'PILA'
"P"                   return 'P'
"H"                   return 'H'
"void"                return "VOID"
"int"                 return 'INT'
"float"               return 'FLOAT'
"return"              return 'RETURN';
"t"[0-9]+             return 'TEMP' 
"l"[0-9]+             return 'ETQ'
"L"[0-9]+             return 'ETQ'

([a-zA-ZñÑ]|("_"[a-zA-ZñÑ]))([a-zA-ZñÑ]|"_"|[0-9])* return 'identificador'

<<EOF>>               return 'EOF'

/lex
%left '<>' '<=' '>='
%left '==' '!='
%right '='
%left '>'  '<' 
%left '<>'
%left '+' '-'
%left '*' '/' '%'
%left UMINUS

%start inicio 
%% /* language grammar */

inicio: listInstrucciones EOF {
        return $1;
};

listInstrucciones: 
    listInstrucciones instrucciones{
        $1.push($2);
        $$ = $1;
    }
    | instrucciones{
        $$ = [$1];
    };

instrucciones:  
    declaraciones PUNTOC{
        $$ = $1;
    }
    |expAritmetica PUNTOC
    {
        $$ = $1;
    }
    |asignacion PUNTOC
    {
        $$ =$1;
    }
    |accesoAsigEdd PUNTOC
    {
        $$ =$1;
    }
    |obtenerEdd PUNTOC
    {
        $$ = $1;
    }
    |saltoIncondicional 
    {
        $$ =$1;
    }
    |saltosCondicional PUNTOC
    {
        $$ =$1;
    }
    |sentPrint PUNTOC
    {
        $$ =$1;
    }
    |declaraconMetodo
    {
        $$ =$1;
    }
    |callMetodo
    {
        $$ = $1;
    }
    | saltoEtq
    {
        $$ = $1;
    }
    | "RETURN" entero PUNTOC 
    {
    };
    
/*------------------------------------------------------------ SALTOS CONDICIONALES Y INCONDICIONAL -------------------------------------------------------------------------*/
saltoIncondicional: 
    GOTO ETQ PUNTOC
        {
            //$$ = new saltoIncondicional($2,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoIncondicional", etiq: $2, linea: @1.first_line, columna: @1.first_column};
        };

 saltoEtq: 
    ETQ DOSP
        {
            //$$ = new saltoEtiqueta($1,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoEtiqueta", etiq: $1, linea: @1.first_line, columna: @1.first_column};
        };

saltosCondicional: 
    IF APAR tipoDato signoRel tipoDato CPAR  GOTO ETQ 
        {
            //$$ = new saltoCondicional($3,$4,$5,$8,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoCondicional", tipoDato: $3, signo: $4, tipoDato2: $5, etiquetaV: $8, linea: @1.first_line, columna: @1.first_column};
        }
    |IF APAR tipoDato CPAR  GOTO ETQ 
        {
            //$$ = new saltoCondicional($3,$4,$5,$8,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoCondicional", tipoDato: $3, signo: "==", tipoDato2: $3, etiquetaV: $6, linea: @1.first_line, columna: @1.first_column};
        };

signoRel: MAYOR{
            $$ = ">";
         }
         |MAYORQUE{
             $$ =">=";
         }
         |MENOR{
             $$ = "<";
         }
         |MENORQUE{
             $$ = "<=";
         }
         |DIFERENTE{
             $$ = "!=";
         }
         |IGUALIGUAL{
             $$ = "==";
         };

/*------------------------------------------------------------------------------ SENTENCIA IMPRIMIR --------------------------------------------------------------------------------*/        
sentPrint:
    PRINT APAR com TIPPRINT com COMA APAR INT CPAR tipoDato  CPAR
        {
            //$$ = new saltoImprimir($4,"temp",$7,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoImprimir", tipoDato: $4, cad: "temp", tipoDato2: $10, linea: @1.first_line, columna: @1.first_column};
        }
    |PRINT APAR com TIPPRINT com  COMA  tipoDato  CPAR
        {
            //$$ = new saltoImprimir($4,"temp",$7,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoImprimir", tipoDato: $4, cad: "temp", tipoDato2: $7, linea: @1.first_line, columna: @1.first_column};
        };


/*------------------------------------------------------------------------------ ENTRADA O LECTURA DE DATO --------------------------------------------------------------------------------*/     
declaraciones: 
    INT listId{
        //$$ = new saltoDeclaracion($2,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoDeclaracion", listaId: $2, linea: @1.first_line, columna: @1.first_column};
    }
    |FLOAT listId{
        //$$ = new saltoDeclaracion($2,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoDeclaracion", listaId: $2, linea: @1.first_line, columna: @1.first_column};
    }
    |INT PILA COR tipoDato CORC{
        $$ = "decStack";
    }
    |FLOAT PILA COR tipoDato CORC{
        $$ = "decStack";
    }
    |INT HEAP COR tipoDato CORC{
        $$ = "decHeap";
    }
    |FLOAT HEAP COR tipoDato CORC{
        $$ = "decHeap";
    }
    |INT P IGUAL tipoDato{
        $$ = "decP";
    }
    |FLOAT P IGUAL tipoDato{
        $$ = "decP";
    }
    |INT H IGUAL tipoDato{
        $$ = "decH";
    }
    |FLOAT H IGUAL tipoDato{
        $$ = "decH";
    }
    |INT P {
        $$ = "decP";
    }
    |FLOAT P{
        $$ = "decP";
    }
    |INT H{
        $$ = "decH";
    }
    |FLOAT H{
        $$ = "decH";
    };

listId: 
    listId COMA TEMP{
        $1.push($3);
        $$ = $1;
    }
    |TEMP{
        $$ = [$1];
    };


/*------------------------------------------------------------------------------ ASIGNACION --------------------------------------------------------------------------------*/             
asignacion: 
    tipoDato IGUAL tipoDato{
        //$$ = new saltoAsignacion($1,$3,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoAsignacion", tipoDato: $1, tipoDato2: $3, linea: @1.first_line, columna: @1.first_column};
    };

/*------------------------------------------------------------------------------ ACCESO ESTRUCTURAS --------------------------------------------------------------------------------*/ 
accesoAsigEdd: 
    edd COR APAR INT CPAR tipoDato CORC IGUAL tipoDato{
        //$$ = new saltoAsigEdd($1,$3,$6,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoGetEdd", tipoDato: $6, eed: $1, tipoDato2: $9, linea: @1.first_line, columna: @1.first_column};
    };

obtenerEdd: 
    tipoDato IGUAL edd COR APAR INT CPAR tipoDato CORC{
        //$$ = new saltoGetEdd($1,$3,$5,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoGetEdd", tipoDato: $1, eed: $3, tipoDato2: $8, linea: @1.first_line, columna: @1.first_column};
    };

/*------------------------------------------------------------------------------ METODOS --------------------------------------------------------------------------------*/    
declaraconMetodo: 
    VOID identificador APAR CPAR ALLAVE listInstrucciones CLLAVE 
    {
        //$$ = new saltoDecMetodo($1,$5,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoDecMetodo", ide: $2, listaInstru: $6, linea: @1.first_line, columna: @1.first_column};
    }
    | INT identificador APAR CPAR ALLAVE listInstrucciones CLLAVE 
    {
        //$$ = new saltoDecMetodo($2,$6,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoDecMetodo", ide: $2, listaInstru: $6, linea: @1.first_line, columna: @1.first_column};
    }
    | FLOAT identificador APAR CPAR ALLAVE listInstrucciones CLLAVE 
    {
        //$$ = new saltoDecMetodo($2,$6,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoDecMetodo", ide: $2, listaInstru: $6, linea: @1.first_line, columna: @1.first_column};
    }
    ;

callMetodo: 
    identificador APAR CPAR PUNTOC
    {
        //$$ = new saltocallMetodo($1,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltocallMetodo", identificador: $1, linea: @1.first_line, columna: @1.first_column};
    };
    
/*------------------------------------------------------------------------------ EXPRESIONES --------------------------------------------------------------------------------*/             
expAritmetica:
    tipoDato IGUAL APAR INT CPAR tipoDato signos APAR INT CPAR tipoDato{
        //$$ = new saltoExpAritmetica($1,$3,$4,$5,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoExpAritmetica", tipoDato: $1, tipoDato2: $6, signo: $7, tipoDato3: $11, linea: @1.first_line, columna: @1.first_column};
    }
    |tipoDato IGUAL tipoDato signos tipoDato{
        //$$ = new saltoExpAritmetica($1,$3,$4,$5,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoExpAritmetica", tipoDato: $1, tipoDato2: $3, signo: $4, tipoDato3: $5, linea: @1.first_line, columna: @1.first_column};
    }
    |tipoDato IGUAL MENOS tipoDato{
        var op1 = {nombre: "expresion", tipo:"num", valor:0};
        //$$ = new saltoExpAritmetica($1,op1,$3,$4,@1.first_line, @1.first_column);
        $$ = {etiqueta : "saltoExpAritmetica", tipoDato: $1, tipoDato2: op1, signo: $3, tipoDato3: $4, linea: @1.first_line, columna: @1.first_column};
    };

signos: MAS
        {
            $$ = $1;
        }
        | MENOS
        {
            $$ = $1;
        }
        |DIV
        {
            $$ = $1;
        }
        |POR
        {
            $$ = $1;
        }
        |MOD
        {
            $$ = $1;
        };


tipoDato: 
        entero
        {
            //$$ = new saltoLiteral("expresion","num",$1,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "num", valor: $1, linea: @1.first_line, columna: @1.first_column};
        }
        |TEMP
        {
            //$$ = new saltoLiteral("expresion","temp",$1,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "temp", valor: $1, linea: @1.first_line, columna: @1.first_column};
        }
        |P
        {
            //$$ = new saltoLiteral("expresion","ptStack",$1,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "ptStack", valor: $1, linea: @1.first_line, columna: @1.first_column};
        }
        |H
        {
            //$$ = new saltoLiteral("expresion","ptHeap",$1,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "ptHeap", valor: $1, linea: @1.first_line, columna: @1.first_column};
        }
        |identificador
        {
            //$$ = new saltoLiteral("expresion","identificador",$1,@1.first_line, @1.first_column);
            $$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "identificador", valor: $1, linea: @1.first_line, columna: @1.first_column};
        };


edd: HEAP
     {
        $$ = "heap";
     }
     |PILA
     {
         $$ = "pila";
     };