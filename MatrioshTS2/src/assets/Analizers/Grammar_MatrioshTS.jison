/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"//"[^\n]*            /*comentario lineal*/ 
"/"[^"*"]"/"          /*comentario multilineal*/

"import"              return 'r_import'

"void"                return 'r_void'
"boolean"             return 'r_boolean'
"number"              return 'r_number'

"public"              return 'r_public'
"private"             return 'r_private'
"let"                 return 'r_let'
"const"               return 'r_const'
"new"                 return 'r_new'

"type"                return 'r_type'
"function"            return 'r_function'
"array"               return 'r_array'

"if"                  return 'r_if'
"else"                return 'r_else'
"switch"              return 'r_switch'
"case"                return 'r_case'
"default"             return 'r_default'
"do"                  return 'r_do'
"while"               return 'r_while'
"for"                 return 'r_for'
"in"                  return 'r_in'
"of"                  return 'r_of'
"continue"            return 'r_continue'
"break"               return 'r_break'
"return"              return 'r_return'
           
"true"                return 'boolean'
"false"               return 'boolean'

[0-9]+("."[0-9]+)?    return 'number'
"'"[^"'"]*"'"         return 'string'
"\""[^"\""]*"\""	    return 'string'

"null"                return 'nulo'

"=="                  return 's_equal'
"="                   return 's_asign'
"++"                  return 's_increment'
"--"                  return 's_decrement'
"**"                  return 's_exponential'
"+"                   return 's_plus'
"-"                   return 's_minus'
"*"                   return 's_mul'
"/"                   return 's_div' 
"%"                   return 's_mod'
"!="                  return 's_not_equal'
"<="                  return 's_less_equal'
">="                  return 's_greather_equal'
"<"                   return 's_less'
">"                   return 's_greather'
"||"                  return 's_or'
"&&"                  return 's_and'
"!"                   return 's_not'
"("                   return 's_par_open'
")"                   return 's_par_close'
"?"                   return 's_ternario'

"{"                   return 's_key_open'
"}"                   return 's_key_close'
"["                   return 's_cor_open'
"]"                   return 's_cor_close'
"."                   return 's_dot'
","                   return 's_coma'
":"                   return 's_doble_dot'
";"                   return 's_dot_coma'

([a-zA-ZñÑ]|("_"[a-zA-ZñÑ]))([a-zA-ZñÑ]|"_"|[0-9])* return 'identificador'

<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%right    s_asign
%right    s_ternario, s_doble_dot

%left     s_or
%left     s_and

%left     s_equal s_not_equal
%left     s_greather s_greather_equal s_less s_less_equal

%left     s_plus s_minus
%left     s_mul s_div s_mod 
%right    s_exponential

%right    r_new

%left     s_not
%left     UMINUS
%left     s_increment s_decrement

%left     s_par_open s_par_close
%left     s_dot
%left     s_key_open s_key_close

%start BODY_MATRIOSHTS

%% /* language grammar */

BODY_MATRIOSHTS
    : LISTA_CONTENIDO EOF
      {return $1;}
    ;

LISTA_CONTENIDO
    :  LISTA_CONTENIDO TYPES 
      {
        $1.push($2);
        $$ = $1;
      }
    | LISTA_CONTENIDO FUNCION
      {
        $1.push($2);
        $$ = $1;
      }
    | LISTA_CONTENIDO SENTENCIA 
      {
        $1.push($2);
        $$ = $1;
      }
    | TYPES
      {
        $$ = [$1];
      }     
    | FUNCION
      {
        $$ = [$1];
      }  
    | SENTENCIA
      {
        $$ = [$1];
      } 
    ;

 /********************************************SENTENCIAS******************************************/

LISTA_SENTENCIAS
    : LISTA_SENTENCIAS SENTENCIA 
      {
        $1.push($2);
        $$ = $1;
      }
    | SENTENCIA
      {
        $$ = [$1];
      }   
    ;

SENTENCIA
    : SENTENCIA_DECLARACION s_dot_coma
      {$$ = $1;}
      | SENTENCIA_ASIGNACION s_dot_coma
      {$$ = $1;}  
      | SENTENCIA_IF 
      {$$ = $1;}
      | SENTENCIA_SWITCH
      {$$ = $1;}
      | SENTENCIA_WHILE
      {$$ = $1;}
      | SENTENCIA_FOR
      {$$ = $1;}
      | SENTENCIA_FOR_LIST
      {$$ = $1;}
      | SENTENCIA_DO_WHILE s_dot_coma
      {$$ = $1;}
      | OPERADOR_INCREMENTO s_dot_coma
      {$$ = $1;} 
      | OPERADOR_DECREMENTO s_dot_coma
      {$$ = $1;} 
      | SENTENCIA_LLAMADA s_dot_coma
      {$$ = $1;} 
      | SENTENCIA_ACCESO s_dot_coma
      {$$ = $1;} 
      | SENTENCIA_BREAK s_dot_coma
      {$$ = $1;}
      | SENTENCIA_CONTINUE s_dot_coma
      {$$ = $1;}
      | SENTENCIA_RETURN s_dot_coma
      {$$ = $1;}
    ;

LISTA_IDENTIFICADORES
    : LISTA_IDENTIFICADORES s_coma identificador
      { 
        $1.push($3);
        $$ = $1;
      }
    | identificador
      { $$ = [$1];}
    ;

SENTENCIA_DECLARACION
    : r_let LISTA_IDENTIFICADORES s_doble_dot TIPO s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $2, tipo: $4, valor: $6};
      }
    | r_let LISTA_IDENTIFICADORES s_doble_dot TIPO
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $2, tipo: $4, valor: null};
      }
    | r_let LISTA_IDENTIFICADORES s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $2, tipo: null, valor: $4};
      }
    | r_let LISTA_IDENTIFICADORES
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: $2, tipo: null, valor: null};
      }
    | r_const LISTA_IDENTIFICADORES s_doble_dot TIPO s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: true, identificador: $2, tipo: $4, valor: $6};      
      }  
    | r_const LISTA_IDENTIFICADORES s_doble_dot TIPO
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: true, identificador: $2, tipo: $4, valor: null};
      }
    | r_const LISTA_IDENTIFICADORES s_asign EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: true, identificador: $2, tipo: null, valor: $4};      
      }
    | r_const LISTA_IDENTIFICADORES
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante:  true, identificador: $2, tipo: null, valor: null};
    }
    ;

SENTENCIA_ASIGNACION 
    : identificador s_asign EXPRESION
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_asignacion', linea: linea, columna: columna, tipo: 0, acceso0: $1, acceso1: [], acceso2: null, valor: $3}; 
    }
    | identificador LISTA_DIMENSIONES2 s_asign EXPRESION
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_asignacion', linea: linea, columna: columna, tipo: 1, acceso0: $1, acceso1: $2, acceso2: null, valor: $4}; 
    }
    | SENTENCIA_ACCESO s_asign EXPRESION
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_asignacion', linea: linea, columna: columna, tipo: 2, acceso0: null, acceso1: [], acceso2: $1, valor: $3};
    }
    ;

SENTENCIA_IF
    : r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close LISTA_ELSE_IF r_else s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_if', linea: linea, columna: columna, condicion : $3, sentencias1: $6, lista_else_if: $8, sentencias2: $11};
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close r_else s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_if', linea: linea, columna: columna, condicion : $3, sentencias1: $6, lista_else_if: null, sentencias2: $10};
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close LISTA_ELSE_IF
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_if', linea: linea, columna: columna, condicion : $3, sentencias1: $6, lista_else_if: $8, sentencias2: null};
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_if', linea: linea, columna: columna, condicion : $3, sentencias1: $6, lista_else_if: null, sentencias2: null};      
      }
    ;

LISTA_ELSE_IF
    : LISTA_ELSE_IF SENTENCIA_ELSE_IF
      {
        $1.push($2);
        $$ = $1;
      }
    | SENTENCIA_ELSE_IF
      {
        $$ = [$1];
      }
    ;

SENTENCIA_ELSE_IF
    : r_else r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_if', linea: linea, columna: columna, condicion: $4, sentencias1: $7, lista_else_if: null, sentencias2: null};
      }
    ;

SENTENCIA_SWITCH
    : r_switch s_par_open EXPRESION s_par_close s_key_open LISTA_CASOS DEFECTO s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $6.push($7);
        $$ = {etiqueta: 'sentencia_switch', linea: linea, columna: columna, condicion: $3, lista_casos: $6};
      }
    | r_switch s_par_open EXPRESION s_par_close s_key_open LISTA_CASOS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_switch', linea: linea, columna: columna, condicion: $3, lista_casos: $6};
      }
    ;

LISTA_CASOS
    : LISTA_CASOS CASO
      {
        $1.push($2);
        $$ = $1;
      }
    | CASO
      {
        $$ = [$1];
      }
    ;

CASO
    : r_case EXPRESION s_doble_dot LISTA_SENTENCIAS
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_caso', linea: linea, columna: columna, default: false, condicion : $2, lista_sentencias: $4};
      }
    ;     

DEFECTO
    : r_default s_doble_dot LISTA_SENTENCIAS
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_caso', linea: linea, columna: columna, default: true, condicion : null, lista_sentencias: $3};
      }
    ;

SENTENCIA_WHILE
    : r_while s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_while', linea: linea, columna: columna, condicion: $3, sentencias: $6};
      }
    ;

SENTENCIA_DO_WHILE
    : r_do s_key_open LISTA_SENTENCIAS s_key_close r_while s_par_open EXPRESION s_par_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_do_while', linea: linea, columna: columna, condicion: $7, sentencias: $3};
      }
    ;  

SENTENCIA_FOR
    : r_for s_par_open SENTENCIA_DECLARACION s_dot_coma EXPRESION s_dot_coma EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_for', linea: linea, columna: columna, sentencia1: $3, sentencia2: $5, sentencia3: $7, lista_sentencias: $10};   
      }
    |r_for s_par_open SENTENCIA_ASIGNACION s_dot_coma EXPRESION s_dot_coma EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_for', linea: linea, columna: columna, sentencia1: $3, sentencia2: $5, sentencia3: $7, lista_sentencias: $10};
      }
    ; 

SENTENCIA_FOR_LIST
    : r_for s_par_open r_let identificador r_in identificador s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_for_list', linea: linea, columna: columna, tipo: 0, id1: $4, id2: $6, lista_sentencias: $9};   
      }
    | r_for s_par_open r_let identificador r_of identificador s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_for_list', linea: linea, columna: columna, tipo: 1, id1: $4, id2: $6, lista_sentencias: $9};
      }
    ; 

SENTENCIA_BREAK
    : r_break
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_break', linea: linea, columna: columna};
      }
    ;

SENTENCIA_CONTINUE
    : r_continue
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_continue', linea: linea, columna: columna};
      }
    ;

SENTENCIA_RETURN
    : r_return EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_return', linea: linea, valor: $2};
      }
    | r_return
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'sentencia_return', linea: linea, valor: null};
      }
    ;

/***************************************************************************LISTAS DE PRODUCCIONES TYPES*********************************************************************************************************/

TYPES
  : r_type identificador s_asign s_key_open LISTA_ATRIBUTOS s_key_close s_dot_coma
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'type', linea: linea, columna: columna, identificador: $2, lista_atributos: $5};
    }
  ;

LISTA_ATRIBUTOS
  : LISTA_ATRIBUTOS s_coma ATRIBUTO
    {
      $1.push($3);
      $$ = $1;
    }
  | ATRIBUTO
    {
      $$ = [$1];
    }
  ;

ATRIBUTO
  : identificador s_doble_dot TIPO
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'atributo_declaracion', linea: linea, columna: columna, identificador: $1, tipo: $3};
    }
  ;

LISTA_ATRIBUTOS2
  : LISTA_ATRIBUTOS2 s_coma ATRIBUTO2
    {
      $1.push($3);
      $$ = $1;
    }
  | ATRIBUTO2
    {
      $$ = [$1];
    }
  ;

ATRIBUTO2
  : identificador s_doble_dot EXPRESION
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'atributo_instancia', linea: linea, columna: columna, identificador: $1, valor: $3};
    }
  ;

/***************************************************************************LISTAS DE PRODUCCIONES FUNCIONES***********************************************************************************************************/

FUNCION
    : r_function identificador s_par_open LISTA_PARAMETROS s_par_close s_doble_dot TIPO s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;

        $$ = {etiqueta: 'funcion', linea: linea, columna: columna, identificador: $2, tipo: $7, lista_parametros: $4, lista_sentencias: $9};   
      }
    | r_function identificador s_par_open s_par_close s_doble_dot TIPO s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;

        $$ = {etiqueta: 'funcion', linea: linea, columna: columna, identificador: $2, tipo: $6, lista_parametros: null, lista_sentencias: $8};
      } 
    | r_function identificador s_par_open LISTA_PARAMETROS s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;

        $$ = {etiqueta: 'funcion', linea: linea, columna: columna, identificador: $2, tipo: null, lista_parametros: $4, lista_sentencias: $7};       
      }
    | r_function identificador s_par_open s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        var linea = yylineno;
        var columna = yyleng;

        $$ = {etiqueta: 'funcion', linea: linea, columna: columna, identificador: $2, tipo: null, lista_parametros: null, lista_sentencias: $6};
      } 
    ;

LISTA_PARAMETROS
    : LISTA_PARAMETROS s_coma DECLARACION_PARAMETRO
      {
        $1.push($3);
        $$ = $1;
      }
    | DECLARACION_PARAMETRO
      {
        $$ = [$1];
      }
    ;

DECLARACION_PARAMETRO
    :  identificador s_doble_dot TIPO
      {
        var linea = yylineno;
        var columna = yyleng;

        $$ = {etiqueta: 'sentencia_declaracion', linea: linea, columna: columna, constante: false, identificador: [$1], tipo: $3, valor: null};
      }
    ;

/***************************************************************************LISTAS DE PRODUCCIONES TIPOS DE DATOS*********************************************************************************************************/

TIPO
    : r_boolean LISTA_DIMENSIONES
      {$$ = {etiqueta: "tipo", tipo: 2, valor: $1, rol: 1, dimensiones: $2};}
    | r_number LISTA_DIMENSIONES
      {$$ = {etiqueta: "tipo", tipo: 3, valor: $1, rol: 1, dimensiones: $2};} 
    | identificador LISTA_DIMENSIONES
      {
        if($1.toLowerCase() == "string")
        {
          $$ = {etiqueta: "tipo", tipo: 4, valor: $1, rol: 1, dimensiones: $2};
        }
        else
        {
          $$ = {etiqueta: "tipo", tipo: 5, valor: $1, rol: 1, dimensiones: $2};
        }
      }
    | r_void
      {$$ = {etiqueta: 'tipo', tipo: 0, valor: $1, rol: 0};}
    | r_nulo
      {$$ = {etiqueta: 'tipo', tipo: 1, valor: $1, rol: 0};}
    | r_boolean
      {$$ = {etiqueta: 'tipo', tipo: 2, valor: $1, rol: 0};}
    | r_number
      {$$ = {etiqueta: 'tipo', tipo: 3, valor: $1, rol: 0};}
    | identificador
      {
        if($1.toLowerCase() == "string")
        {
          $$ = {etiqueta: 'tipo', tipo: 4, valor: $1, rol: 0};
        }
        else
        {
          $$ = {etiqueta: 'tipo', tipo: 5, valor: $1, rol: 2};
        }
      }
    |
    ;

LISTA_DIMENSIONES
  : LISTA_DIMENSIONES s_cor_open s_cor_close
  { $$ = $1 + 1;}
  | s_cor_open s_cor_close
  { $$ = 1;}
  ;

/***************************************************************************LISTAS DE PRODUCCIONES EXPRESIONES*********************************************************************************************************/
LISTA_EXPRESIONES 
    : LISTA_EXPRESIONES s_coma EXPRESION
      {
        $1.push($3);
        $$ = $1;
      }
    | EXPRESION
      {
        $$ = [$1];
      }
    ;

EXPRESION
    : EXPRESION_ARITMETICA
      {$$ = $1;}
    | EXPRESION_RELACIONAL   
      {$$ = $1;}
    | EXPRESION_LOGICA
      {$$ = $1;}
    | OPERADOR_UNARIO
      {$$ = $1;}
    | OPERADOR_INCREMENTO
      {$$ = $1;}  
    | OPERADOR_DECREMENTO  
      {$$ = $1;}     
    | OPERADOR_TERNARIO  
      {$$ = $1;}   
    | s_par_open EXPRESION s_par_close
      {$$ = $2;}
    | SENTENCIA_INSTANCIA
      {$$ = $1;}
    | SENTENCIA_LLAMADA  
      {$$ = $1;}    
    | SENTENCIA_ACCESO
      {$$ = $1;}  
    | DATO_PRIMITIVO
      {$$ = $1;} 
    ;

EXPRESION_ARITMETICA
    : EXPRESION s_plus EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'suma', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_minus EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'resta', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_mul EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'multiplicacion', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_div EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'division', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_exponential EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'potencia', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_mod EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'modulo', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    ;

EXPRESION_RELACIONAL
    : EXPRESION s_greather EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'mayor_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_less EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'menor_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_greather_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'mayor_igual_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_less_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'menor_igual_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'igual_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_not_equal EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'diferente_que', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    ;

EXPRESION_LOGICA
    : EXPRESION s_or EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'or', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | EXPRESION s_and EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'and', linea: linea, columna: columna, expresion1: $1, expresion2: $3};
      }
    | s_not EXPRESION
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'not', linea: linea, columna: columna, expresion1: $2};
      }
    ;

OPERADOR_UNARIO
    : s_minus EXPRESION %prec UMINUS
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'operador_unario', linea: linea, columna: columna, expresion1: $2};
      }
    ;

OPERADOR_INCREMENTO
    : identificador s_increment
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'operador_incremento', linea: linea, columna: columna, expresion1: {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 5, valor: $1}, valor: $1, dimensiones: []}};
      }  
    ;    

OPERADOR_DECREMENTO
    : identificador s_decrement
      {
        var linea = yylineno;
        var columna = yyleng; 
        $$ = {etiqueta: 'operador_decremento', linea: linea, columna: columna, expresion1: {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 5, valor: $1}, valor: $1, dimensiones: []}};
      }
    ; 

OPERADOR_TERNARIO 
    : EXPRESION s_ternario EXPRESION s_doble_dot EXPRESION
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: "operador_ternario", linea: linea, columna: columna, condicion: $1 , expresion1: $3, expresion2: $5};
    }
    ;


SENTENCIA_INSTANCIA
  : s_cor_open LISTA_EXPRESIONES s_cor_close
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: "sentencia_instancia", linea: linea, columna: columna, tipo: 0, valor1: $2, valor2: null};
    }
  | r_new r_array s_par_open EXPRESION s_par_close
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: "sentencia_instancia", linea: linea, columna: columna, tipo: 1, valor1: null, valor2: $4};
    }
  | s_key_open LISTA_ATRIBUTOS2 s_key_close
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: "sentencia_instancia", linea: linea, columna: columna, tipo: 2, valor1: null, valor2: $2};
    }
  ;

SENTENCIA_LLAMADA
  : identificador s_par_open LISTA_EXPRESIONES s_par_close
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_llamada', linea: linea, columna: columna, identificador: $1, parametros: $3};
    }
  | identificador s_par_open s_par_close
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_llamada', linea: linea, columna: columna, identificador: $1, parametros: []};
    } 
  ;

SENTENCIA_ACCESO  
  : identificador LISTA_DIMENSIONES2 LISTA_ACCESOS
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_acceso', linea: linea, columna: columna, identificador: $1, dimensiones: $2, lista_acceso: $3};
    }
    |identificador LISTA_ACCESOS
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'sentencia_acceso', linea: linea, columna: columna, identificador: $1, dimensiones: [], lista_acceso: $2};
    }
  ;

LISTA_ACCESOS   
  : LISTA_ACCESOS ACCESO
    {
      $1.push($2);
      $$ = $1;
    }
    |ACCESO
    {
      $$ = [$1];
    }
  ;

ACCESO 
  : s_dot SENTENCIA_LLAMADA
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'tipo_acceso', linea: linea, columna: columna, tipo: 1, acceso0: null, acceso1: null, acceso2: $2};
    }
    | s_dot identificador
    {
      var linea = yylineno;
      var columna = yyleng;
      $$ = {etiqueta: 'tipo_acceso', linea: linea, columna: columna, tipo: 0, acceso0: null, acceso1: $2, acceso2: null};
    }
  ;

DATO_PRIMITIVO
    : nulo
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 1, valor: $1}, valor: yytext, dimensiones: []}; 
      }
    | boolean
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 2, valor: $1}, valor: yytext, dimensiones: []}; 
      }
    | number
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 3, valor: $1}, valor: yytext, dimensiones: []};
      }
    | string
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 4, valor: $1}, valor: yytext, dimensiones: []};
      }
    | identificador
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 5, valor: $1}, valor: yytext, dimensiones: []};
      }
    | identificador LISTA_DIMENSIONES2
      {
        var linea = yylineno;
        var columna = yyleng;
        $$ = {etiqueta: 'dato_primitivo', linea: linea, columna: columna, tipo: {etiqueta: 'tipo', tipo: 5, valor: $1}, valor: $1, dimensiones: $2};
      }
    ;

LISTA_DIMENSIONES2
  : LISTA_DIMENSIONES2 DIMENSION
    {
      $1.push($2);
      $$ = $1;
    }
  | DIMENSION
    {
      $$ = [$1];
    }
  ;

DIMENSION
  : s_cor_open EXPRESION s_cor_close
    {
      $$ = $2;
    }
  ;
