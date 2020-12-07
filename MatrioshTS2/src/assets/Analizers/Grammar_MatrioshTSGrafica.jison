%{
    class arbol{
        
        constructor() {
            this.nombre = "";
            this.valor = "";
            this.tipo = "";
            this.linea = "";
            this.columna = "";
            this.hijos = new Array();
        }
    }
%}

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
"Array"               return 'r_array'
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

/*ya*/
BODY_MATRIOSHTS
    : LISTA_CONTENIDO EOF
      {
        $$ = new arbol(); 
        $$.nombre="LISTA_CONTENIDO"; 
        $$.hijos=new Array(); 
        $$.hijos.push($1);
        return $$;
      }
    ;

/*ya*/
LISTA_CONTENIDO
    :  LISTA_CONTENIDO TYPES 
      {
        $$=new arbol();
        $$.nombre="LISTA_CONTENIDO"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($2);
      }
    | LISTA_CONTENIDO FUNCION
      {
        $$=new arbol();
        $$.nombre="LISTA_CONTENIDO"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($2);
      }
    | LISTA_CONTENIDO SENTENCIA 
      {
        $$=new arbol();
        $$.nombre="LISTA_CONTENIDO"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($2);
      }
    | TYPES
      {
        $$=new arbol();
        $$.nombre="TYPES"; 
        $$.hijos = new Array(); 
        $$.hijos.push($1);
      }     
    | FUNCION
      {
        $$=new arbol();
        $$.nombre="FUNCION"; 
        $$.hijos = new Array(); 
        $$.hijos.push($1);
      }  
    | SENTENCIA
      {
        $$=new arbol();
        $$.nombre="SENTENCIA"; 
        $$.hijos = new Array(); 
        $$.hijos.push($1);
      } 
    ;

 /********************************************SENTENCIAS******************************************/

/*ya*/
LISTA_SENTENCIAS
    : LISTA_SENTENCIAS SENTENCIA 
      {
        $$=new arbol();
        $$.nombre="LISTA_SENTENCIAS"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($2);
      }
    | SENTENCIA
      {
        $$=new arbol();
        $$.nombre="sentencias"; 
        $$.hijos=new Array();
        $$.hijos.push($1); 
      }   
    ;

/*ya*/
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

/*ya*/
LISTA_IDENTIFICADORES
    : LISTA_IDENTIFICADORES s_coma identificador
      { 
        $$=new arbol();
        $$.nombre="LISTA_IDENTIFICADORES"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($3);
      }
    | identificador
      { 
        $$=new arbol();
        $$.nombre="identificador"; 
        $$.hijos=new Array();
        $$.hijos.push($1); 
      }
    ;

/*ya*/
SENTENCIA_DECLARACION
    : r_let LISTA_IDENTIFICADORES s_doble_dot TIPO s_asign EXPRESION
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_DECLARACION"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
        $$.hijos.push($4);
        $$.hijos.push($6);
      }
    | r_let LISTA_IDENTIFICADORES s_doble_dot TIPO
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_DECLARACION"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
        $$.hijos.push($4);
      }
    | r_let LISTA_IDENTIFICADORES s_asign EXPRESION
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_DECLARACION"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
        $$.hijos.push($4);
      }
    | r_let LISTA_IDENTIFICADORES
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_DECLARACION"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
      }
    | r_const LISTA_IDENTIFICADORES s_doble_dot TIPO s_asign EXPRESION
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_DECLARACION"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
        $$.hijos.push($4);
        $$.hijos.push($6);
      }  
    | r_const LISTA_IDENTIFICADORES s_doble_dot TIPO
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_DECLARACION"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
        $$.hijos.push($4);
      }
    | r_const LISTA_IDENTIFICADORES s_asign EXPRESION
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_DECLARACION"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
        $$.hijos.push($4);
      }
    | r_const LISTA_IDENTIFICADORES
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_DECLARACION"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
    }
    ;

/*ya*/
SENTENCIA_ASIGNACION 
    : identificador s_asign EXPRESION
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_ASIGNACION"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = $1;
        n.hijos = new Array();
        $$.hijos.push(n);
        $$.hijos.push($3);
    }
    | identificador LISTA_DIMENSIONES2 s_asign EXPRESION
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_ASIGNACION"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = $1;
        n.hijos = new Array();
        $$.hijos.push(n);
        $$.hijos.push($2);
        $$.hijos.push($4);
    }
    | SENTENCIA_ACCESO s_asign EXPRESION
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_ASIGNACION"; 
        $$.hijos=new Array();
        $$.hijos.push($1);
        $$.hijos.push($3);
    }
    ;

/*ya*/
SENTENCIA_IF
    : r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close LISTA_ELSE_IF r_else s_key_open LISTA_SENTENCIAS s_key_close
      { 
        $$=new arbol();
        $$.nombre="SENTENCIA_IF"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = "if";
        n.hijos = new Array();
        $$.hijos.push(n);
        $$.hijos.push($3);
        $$.hijos.push($6);
        $$.hijos.push($8);  
        $$.hijos.push($11);  
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close r_else s_key_open LISTA_SENTENCIAS s_key_close
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_IF"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = "if";
        n.hijos = new Array();
        $$.hijos.push(n);
        $$.hijos.push($3);
        $$.hijos.push($6);
        $$.hijos.push($10);  
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close LISTA_ELSE_IF
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_IF"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = "if";
        n.hijos = new Array();
        $$.hijos.push(n);
        $$.hijos.push($3);
        $$.hijos.push($6);
        $$.hijos.push($8);  
      }
    | r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_IF"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = "if";
        n.hijos = new Array();
        $$.hijos.push(n);
        $$.hijos.push($3);
        $$.hijos.push($6);
      }
    ;

/*ya*/
LISTA_ELSE_IF
    : LISTA_ELSE_IF SENTENCIA_ELSE_IF
      {
        $$=new arbol();
        $$.nombre="lista_else_if"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($2);
      }
    | SENTENCIA_ELSE_IF
      {
        $$=new arbol();
        $$.nombre="sentencia_else_if"; 
        $$.hijos = new Array(); 
        $$.hijos.push($1);
      }
    ;

/*ya*/
SENTENCIA_ELSE_IF
    : r_else r_if s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_ELSE_IF"; 
        $$.hijos=new Array();
        $$.hijos.push($4);
        $$.hijos.push($7);
      }
    ;

/*ya*/
SENTENCIA_SWITCH
    : r_switch s_par_open EXPRESION s_par_close s_key_open LISTA_CASOS DEFECTO s_key_close
      {
        $$=new arbol();
        $$.nombre="sentencia_switch"; 
        $$.hijos=new Array();
        $$.hijos.push($3);
        $$.hijos.push($6);
        $$.hijos.push($7);
      }
    | r_switch s_par_open EXPRESION s_par_close s_key_open LISTA_CASOS s_key_close
      {
        $$=new arbol();
        $$.nombre="sentencia_switch"; 
        $$.hijos=new Array();
        $$.hijos.push($3);
        $$.hijos.push($6);
      }
    ;

/*ya*/
LISTA_CASOS
    : LISTA_CASOS CASO
      {
        $$=new arbol();
        $$.nombre="lista_casos"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($2);
      }
    | CASO
      {
        $$=new arbol();
        $$.nombre="caso"; 
        $$.hijos = new Array(); 
        $$.hijos.push($1);
      }
    ;

/*ya*/
CASO
    : r_case EXPRESION s_doble_dot LISTA_SENTENCIAS
      {
          $$=new arbol();
          $$.nombre="caso"; 
          $$.hijos=new Array();
          $$.hijos.push($2);
          $$.hijos.push($4);
      }
    ;     

/*ya*/
DEFECTO
    : r_default s_doble_dot LISTA_SENTENCIAS
      {
            $$=new arbol();
            $$.nombre="Defecto"; 
            $$.hijos=new Array();
            $$.hijos.push($3);
      }
    ;

/*ya*/
SENTENCIA_WHILE
    : r_while s_par_open EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        $$=new arbol();
        $$.nombre="While"; 
        $$.hijos=new Array();
        $$.hijos.push($3);
        $$.hijos.push($6);
      }
    ;

/*ya*/
SENTENCIA_DO_WHILE
    : r_do s_key_open LISTA_SENTENCIAS s_key_close r_while s_par_open EXPRESION s_par_close
      {
        $$=new arbol();
        $$.nombre="DoWhile"; 
        $$.hijos=new Array();
        $$.hijos.push($3);
        $$.hijos.push($7);
      }
    ;  

/*ya*/
SENTENCIA_FOR
    : r_for s_par_open SENTENCIA_DECLARACION s_dot_coma EXPRESION s_dot_coma EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
            $$=new arbol();
            $$.nombre="For"; 
            $$.hijos=new Array();
            $$.hijos.push($3);
            $$.hijos.push($5);
            $$.hijos.push($7);
            $$.hijos.push($10);
      }
    |r_for s_par_open SENTENCIA_ASIGNACION s_dot_coma EXPRESION s_dot_coma EXPRESION s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
            $$=new arbol();
            $$.nombre="For"; 
            $$.hijos=new Array();
            $$.hijos.push($3);
            $$.hijos.push($5);
            $$.hijos.push($7);
            $$.hijos.push($10);
      }
    ; 

/*ya*/
SENTENCIA_FOR_LIST
    : r_for s_par_open r_let identificador r_in identificador s_par_close s_key_open EXPRESION s_key_close
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_FOR_LIST"; 
        $$.hijos=new Array();
        var n =new arbol();
        n.nombre = $4;
        $$.hijos.push(n);
        $$.hijos.push($4);
        var n2 =new arbol();
        n2.nombre = $6;
        $$.hijos.push(n2);
        $$.hijos.push($9);
      }
    | r_for s_par_open r_let identificador r_of identificador s_par_close s_key_open EXPRESION s_key_close
      {
        $$=new arbol();
        $$.nombre="SENTENCIA_FOR_LIST"; 
        $$.hijos=new Array();
        var n =new arbol();
        n.nombre = $4;
        $$.hijos.push(n);
        $$.hijos.push($4);
        var n2 =new arbol();
        n2.nombre = $6;
        $$.hijos.push(n2);
        $$.hijos.push($9);
      }
    ; 

/*ya*/
SENTENCIA_BREAK
    : r_break
      {
        $$=new arbol();
        $$.nombre="break"; 
        $$.hijos=new Array();
      }
    ;

/*ya*/
SENTENCIA_CONTINUE
    : r_continue
      {
        $$=new arbol();
        $$.nombre="continue"; 
        $$.hijos=new Array();
      }
    ;

/*ya*/
SENTENCIA_RETURN
    : r_return EXPRESION
      {
        $$=new arbol();
        $$.nombre="return"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
      }
    | r_return
      {
        $$=new arbol();
        $$.nombre="return"; 
        $$.hijos=new Array();
      }
    ;

/***************************************************************************LISTAS DE PRODUCCIONES TYPES*********************************************************************************************************/

/*ya*/
TYPES
  : r_type identificador s_asign s_key_open LISTA_ATRIBUTOS s_key_close s_dot_coma
    {
        $$=new arbol();
        $$.nombre="TYPES"; 
        $$.hijos=new Array();
        var n =new arbol();
        n.nombre = $2;
        $$.hijos.push(n);
        $$.hijos.push($5);
    }
  ;

/*ya*/
LISTA_ATRIBUTOS
  : LISTA_ATRIBUTOS s_coma ATRIBUTO
    {
        $$=new arbol();
        $$.nombre="LISTA_ATRIBUTOS"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($1);        
        $$.hijos.push($3);
    }
  | ATRIBUTO
    {
        $$=new arbol();
        $$.nombre="ATRIBUTO"; 
        $$.hijos = new Array(); 
        $$.hijos.push($1);
    }
  ;

/*ya*/
ATRIBUTO
  : identificador s_doble_dot TIPO
    {
        $$=new arbol();
        $$.nombre="ATRIBUTO"; 
        $$.hijos = new Array(); 
        var n = new arbol();
        n.nombre = $2;
        n.hijos = new Array();
        $$.hijos.push(n);
        $$.hijos.push($3);
    }
  ;

/*ya*/
LISTA_ATRIBUTOS2
  : LISTA_ATRIBUTOS2 s_coma ATRIBUTO2
    {
        $$=new arbol();
        $$.nombre="LISTA_ATRIBUTOS2"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($3);
    }
  | ATRIBUTO2
    {
        $$=new arbol();
        $$.nombre="ATRIBUTO2"; 
        $$.hijos = new Array(); 
        $$.hijos.push($1);
    }
  ;

/*ya*/
ATRIBUTO2
  : identificador s_doble_dot EXPRESION
    { 
        $$=new arbol();
        $$.nombre="ATRIBUTO2"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre=$1;
        $$.hijos.push(n);
        $$.hijos.push($3);
    }
  ;

/***************************************************************************LISTAS DE PRODUCCIONES FUNCIONES***********************************************************************************************************/

/*ya*/
FUNCION
    : r_function identificador s_par_open LISTA_PARAMETROS s_par_close s_doble_dot TIPO s_key_open LISTA_SENTENCIAS s_key_close
      {
        $$=new arbol();
        $$.nombre="FUNCION"; 
        $$.hijos=new Array();
        var n =new arbol();
        n.nombre = $2;
        $$.hijos.push(n);
        $$.hijos.push($4);
        $$.hijos.push($7);
        $$.hijos.push($9);  
      }
    | r_function identificador s_par_open s_par_close s_doble_dot TIPO s_key_open LISTA_SENTENCIAS s_key_close
      {
        $$=new arbol();
        $$.nombre="FUNCION"; 
        $$.hijos=new Array();
        var n =new arbol();
        n.nombre = $2;
        $$.hijos.push(n);
        $$.hijos.push($6);
        $$.hijos.push($8);  
      } 
    | r_function identificador s_par_open LISTA_PARAMETROS s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        $$=new arbol();
        $$.nombre="FUNCION"; 
        $$.hijos=new Array();
        var n =new arbol();
        n.nombre = $2;
        $$.hijos.push(n);
        $$.hijos.push($4);
        $$.hijos.push($7);
      }
    | r_function identificador s_par_open s_par_close s_key_open LISTA_SENTENCIAS s_key_close
      {
        $$=new arbol();
        $$.nombre="FUNCION"; 
        $$.hijos=new Array();
        var n =new arbol();
        n.nombre = $2;
        $$.hijos.push(n);
        $$.hijos.push($6);
      } 
    ;

/*ya*/
LISTA_PARAMETROS
    : LISTA_PARAMETROS s_coma DECLARACION_PARAMETRO
      {
        $$=new arbol();
        $$.nombre="Parametros"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($3);
      }
    | DECLARACION_PARAMETRO
      {
        $$=new arbol();
        $$.nombre="Parametros"; 
        $$.hijos = new Array(); 
        $$.hijos.push($1);
      }
    ;

/*ya*/
DECLARACION_PARAMETRO
    :  identificador s_doble_dot TIPO
      {
        $$=new arbol();
        $$.nombre="DECLARACION_PARAMETRO"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre=$1;
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    ;

/***************************************************************************LISTAS DE PRODUCCIONES TIPOS DE DATOS*********************************************************************************************************/

/*ya*/
TIPO
    : r_boolean LISTA_DIMENSIONES{
        $$=new arbol();
        $$.nombre="boolean"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
    }
    | r_number LISTA_DIMENSIONES
      {
        $$=new arbol();
        $$.nombre="number"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
      } 
    | identificador LISTA_DIMENSIONES
      {
        if($1.toLowerCase() == "string")
        {
          $$=new arbol();
          $$.nombre="string"; 
          $$.hijos=new Array();
          $$.hijos.push($2);
        }
        else
        {
          $$=new arbol();
          $$.nombre="boolean"; 
          $$.hijos=new Array();
          $$.hijos.push($2);};
        }
      }
    | r_void
      {
        $$=new arbol();
        $$.nombre="void"; 
        $$.hijos=new Array();
      }
    | r_nulo
      {
        $$=new arbol();
        $$.nombre="nulo"; 
        $$.hijos=new Array();
      }
    | r_boolean
      {
        $$=new arbol();
        $$.nombre="boolean"; 
        $$.hijos=new Array();
      }
    | r_number
      {
        $$=new arbol();
        $$.nombre="number"; 
        $$.hijos=new Array();
      }
    | identificador
      {
        $$=new arbol();
        $$.nombre="E"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre=$1; 
        n.hijos=new Array();
        $$.hijos.push(n);
      }
    |
    ;

/*ya*/
LISTA_DIMENSIONES
  : LISTA_DIMENSIONES s_cor_open s_cor_close
  { 
        $$=new arbol();
        $$.nombre="LISTA_DIMENSIONES"; 
        $$.hijos=new Array();
        $$.hijos.push($1);
  }
  | s_cor_open s_cor_close
  { 
        $$=new arbol();
        $$.nombre="LISTA_DIMENSIONES []"; 
        $$.hijos=new Array();
  }
  ;

/***************************************************************************LISTAS DE PRODUCCIONES EXPRESIONES*********************************************************************************************************/
/*ya*/
LISTA_EXPRESIONES 
    : LISTA_EXPRESIONES s_coma EXPRESION
      {
        $$=new arbol();
        $$.nombre="LISTA_EXPRESIONES"; 
        $$.hijos=new Array();
        $$.hijos=$1.hijos;        
        $$.hijos.push($3);
      }
    | EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION"; 
        $$.hijos = new Array(); 
        $$.hijos.push($1);
      }
    ;

/*ya*/
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

/*ya*/
EXPRESION_ARITMETICA
    : EXPRESION s_plus EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_ARITMETICA"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="+"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_minus EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_ARITMETICA"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="-"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_mul EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_ARITMETICA"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="*"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_div EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_ARITMETICA"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="/"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_exponential EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_ARITMETICA"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="^^"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_mod EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_ARITMETICA"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="%"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
      }
    ;

/*ya*/
EXPRESION_RELACIONAL
    : EXPRESION s_greather EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_RELACIONAL"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre=">"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_less EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_RELACIONAL"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="<"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_greather_equal EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_RELACIONAL"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre=">="; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_less_equal EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_RELACIONAL"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="=<"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_equal EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_RELACIONAL"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="=="; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_not_equal EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_RELACIONAL"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="!="; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    ;

/*ya*/
EXPRESION_LOGICA
    : EXPRESION s_or EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_LOGICA"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="||"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | EXPRESION s_and EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_LOGICA"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="&&"; 
        n.hijos=new Array(); 
        $$.hijos.push($1);
        $$.hijos.push(n);
        $$.hijos.push($3);
      }
    | s_not EXPRESION
      {
        $$=new arbol();
        $$.nombre="EXPRESION_LOGICA"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="!"; 
        n.hijos=new Array(); 
        $$.hijos.push(n);
        $$.hijos.push($2);
      }
    ;

/*ya*/
OPERADOR_UNARIO
    : s_minus EXPRESION %prec UMINUS
      {
        $$=new arbol();
        $$.nombre="OPERADOR_UNARIO"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre="-"+$2; 
        $$.hijos.push(n);
      }
    ;

/*ya*/
OPERADOR_INCREMENTO
    : identificador s_increment
      {
        $$=new arbol();
        $$.nombre="OPERADOR_INCREMENTO"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = $1;
        $$.hijos.push(n);
        var n2 = new arbol();
        n2.nombre = $2;
        $$.hijos.push(n2);
        }  
    ;    

/*ya*/
OPERADOR_DECREMENTO
    : identificador s_decrement
      {
        $$=new arbol();
        $$.nombre="OPERADOR_DECREMENTO"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = $1;
        $$.hijos.push(n);
        var n2 = new arbol();
        n2.nombre = $2;
        $$.hijos.push(n2);
      }
    ; 

/*ya*/
OPERADOR_TERNARIO 
    : EXPRESION s_ternario EXPRESION s_doble_dot EXPRESION
    {
        $$=new arbol();
        $$.nombre="OPERADOR_TERNARIO"; 
        $$.hijos=new Array();
        $$.hijos.push($1);
        $$.hijos.push($3);
        $$.hijos.push($5);
    }
    ;

/*ya*/
SENTENCIA_INSTANCIA
  : s_cor_open LISTA_EXPRESIONES s_cor_close
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_INSTANCIA"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
    }
  | r_new r_array s_par_open EXPRESION s_par_close
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_INSTANCIA"; 
        $$.hijos=new Array();
        $$.hijos.push($4);
    }
  | s_key_open LISTA_ATRIBUTOS2 s_key_close
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_INSTANCIA"; 
        $$.hijos=new Array();
        $$.hijos.push($2);
    }
  ;

/*ya*/
SENTENCIA_LLAMADA
  : identificador s_par_open LISTA_EXPRESIONES s_par_close
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_LLAMADA"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = $1;
        $$.hijos.push(n);
        $$.hijos.push($3);
    }
  | identificador s_par_open s_par_close
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_LLAMADA"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = $1;
        $$.hijos.push(n);
    } 
  ;

/*ya*/
SENTENCIA_ACCESO  
  : identificador LISTA_DIMENSIONES2 LISTA_ACCESOS
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_ACCESO"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = $1;
        $$.hijos.push(n);
        $$.hijos.push($2);
        $$.hijos.push($3);
    }
    |identificador LISTA_ACCESOS
    {
        $$=new arbol();
        $$.nombre="SENTENCIA_ACCESO"; 
        $$.hijos=new Array();
        var n = new arbol();
        n.nombre = $1;
        $$.hijos.push(n);
        $$.hijos.push($2);
    }
  ;

/*ya*/
LISTA_ACCESOS   
  : LISTA_ACCESOS ACCESO
    {
        $$=new arbol();
        $$.nombre="LISTA_ACCESOS";
        $$.hijos=new Array();
        $$.hijos= $1.hijos;        
        $$.hijos.push($2);
    }
    |ACCESO
    {
        $$=new arbol();
        $$.nombre="ACCESO"; 
        $$.hijos=new Array();
        $$.hijos.push($1); 
    }
  ;

/*ya*/
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

/*ya*/
DATO_PRIMITIVO
    : nulo
      {
        $$=new arbol();
        $$.nombre="DATO_PRIMITIVO"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre=$1; 
        n.hijos=new Array();
        $$.hijos.push(n);
      }
    | boolean
      {
        $$=new arbol();
        $$.nombre="DATO_PRIMITIVO"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre=$1; 
        n.hijos=new Array();
        $$.hijos.push(n);
      }
    | number
      {
        $$=new arbol();
        $$.nombre="DATO_PRIMITIVO"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre=$1; 
        n.hijos=new Array();
        $$.hijos.push(n);
        }
    | string
      {
        $$=new arbol();
        $$.nombre="DATO_PRIMITIVO"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre=$1; 
        n.hijos=new Array();
        $$.hijos.push(n);
      }
    | identificador
      {
        $$=new arbol();
        $$.nombre="DATO_PRIMITIVO"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre=$1; 
        n.hijos=new Array();
        $$.hijos.push(n);
        }
    | identificador LISTA_DIMENSIONES2
      {
        $$=new arbol();
        $$.nombre="DATO_PRIMITIVO"; 
        $$.hijos=new Array();
        var n = new arbol(); 
        n.nombre=$1; 
        n.hijos=new Array();
        $$.hijos.push(n);
        $$.hijos.push($2);
      }
    ;

/*ya*/
LISTA_DIMENSIONES2
  : LISTA_DIMENSIONES2 DIMENSION
    {
        $$=new arbol();
        $$.nombre="LISTA_DIMENSIONES2";
        $$.hijos=new Array();
        $$.hijos= $1.hijos;        
        $$.hijos.push($2);
    }
  | DIMENSION
    {
        $$=new arbol();
        $$.nombre="DIMENSION"; 
        $$.hijos=new Array();
        $$.hijos.push($1); 
    }
  ;

/*ya*/
DIMENSION
  : s_cor_open EXPRESION s_cor_close
    {
        $$=new arbol();
        $$.nombre="DIMENSION"; 
        $$.hijos=new Array();
    }
  ;
