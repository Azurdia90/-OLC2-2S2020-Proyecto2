/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var Optimizacion = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,15],$V1=[1,26],$V2=[1,20],$V3=[1,25],$V4=[1,21],$V5=[1,22],$V6=[1,16],$V7=[1,17],$V8=[1,31],$V9=[1,30],$Va=[1,28],$Vb=[1,29],$Vc=[1,27],$Vd=[1,23],$Ve=[1,24],$Vf=[5,19,20,21,22,24,35,39,41,42,45,46,48,49,51,52,54],$Vg=[1,48],$Vh=[2,63],$Vi=[8,28,29,30,31,32,33,34,44,47,56,57,58,59,60],$Vj=[1,64],$Vk=[8,38],$Vl=[1,79],$Vm=[1,100],$Vn=[1,99],$Vo=[1,101],$Vp=[1,102],$Vq=[1,103],$Vr=[20,25,46,48,49,52],$Vs=[20,46,48,49,52];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"inicio":3,"listInstrucciones":4,"EOF":5,"instrucciones":6,"declaraciones":7,"PUNTOC":8,"expAritmetica":9,"asignacion":10,"accesoAsigEdd":11,"obtenerEdd":12,"saltoIncondicional":13,"saltosCondicional":14,"sentPrint":15,"declaraconMetodo":16,"callMetodo":17,"saltoEtq":18,"RETURN":19,"entero":20,"GOTO":21,"ETQ":22,"DOSP":23,"IF":24,"APAR":25,"tipoDato":26,"signoRel":27,"CPAR":28,"MAYOR":29,"MAYORQUE":30,"MENOR":31,"MENORQUE":32,"DIFERENTE":33,"IGUALIGUAL":34,"PRINT":35,"com":36,"TIPPRINT":37,"COMA":38,"INT":39,"listId":40,"FLOAT":41,"PILA":42,"COR":43,"CORC":44,"HEAP":45,"P":46,"IGUAL":47,"H":48,"TEMP":49,"edd":50,"VOID":51,"identificador":52,"ALLAVE":53,"CLLAVE":54,"signos":55,"MENOS":56,"MAS":57,"DIV":58,"POR":59,"MOD":60,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"PUNTOC",19:"RETURN",20:"entero",21:"GOTO",22:"ETQ",23:"DOSP",24:"IF",25:"APAR",28:"CPAR",29:"MAYOR",30:"MAYORQUE",31:"MENOR",32:"MENORQUE",33:"DIFERENTE",34:"IGUALIGUAL",35:"PRINT",36:"com",37:"TIPPRINT",38:"COMA",39:"INT",41:"FLOAT",42:"PILA",43:"COR",44:"CORC",45:"HEAP",46:"P",47:"IGUAL",48:"H",49:"TEMP",51:"VOID",52:"identificador",53:"ALLAVE",54:"CLLAVE",56:"MENOS",57:"MAS",58:"DIV",59:"POR",60:"MOD"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[6,2],[6,2],[6,1],[6,2],[6,2],[6,1],[6,1],[6,1],[6,3],[13,3],[18,2],[14,8],[14,6],[27,1],[27,1],[27,1],[27,1],[27,1],[27,1],[15,11],[15,8],[7,2],[7,2],[7,5],[7,5],[7,5],[7,5],[7,4],[7,4],[7,4],[7,4],[7,2],[7,2],[7,2],[7,2],[40,3],[40,1],[10,3],[11,9],[12,9],[16,7],[16,7],[16,7],[17,4],[9,11],[9,5],[9,4],[55,1],[55,1],[55,1],[55,1],[55,1],[26,1],[26,1],[26,1],[26,1],[26,1],[50,1],[50,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

        return $$[$0-1];

break;
case 2:

        $$[$0-1].push($$[$0]);
        this.$ = $$[$0-1];
    
break;
case 3: case 43:

        this.$ = [$$[$0]];
    
break;
case 4: case 5: case 8:

        this.$ = $$[$0-1];
    
break;
case 6: case 7: case 10: case 11:

        this.$ =$$[$0-1];
    
break;
case 9: case 12:

        this.$ =$$[$0];
    
break;
case 13: case 14:

        this.$ = $$[$0];
    
break;
case 15:

    
break;
case 16:

            //this.$ = new saltoIncondicional($$[$0-1],_$[$0-2].first_line, _$[$0-2].first_column);
            this.$ = {etiqueta : "saltoIncondicional", etiq: $$[$0-1], linea: _$[$0-2].first_line, columna: _$[$0-2].first_column};
        
break;
case 17:

            //this.$ = new saltoEtiqueta($$[$0-1],_$[$0-1].first_line, _$[$0-1].first_column);
            this.$ = {etiqueta : "saltoEtiqueta", etiq: $$[$0-1], linea: _$[$0-1].first_line, columna: _$[$0-1].first_column};
        
break;
case 18:

            //this.$ = new saltoCondicional($$[$0-5],$$[$0-4],$$[$0-3],$$[$0],_$[$0-7].first_line, _$[$0-7].first_column);
            this.$ = {etiqueta : "saltoCondicional", tipoDato: $$[$0-5], signo: $$[$0-4], tipoDato2: $$[$0-3], etiquetaV: $$[$0], linea: _$[$0-7].first_line, columna: _$[$0-7].first_column};
        
break;
case 19:

            //this.$ = new saltoCondicional($$[$0-3],$$[$0-2],$$[$0-1],$$[$02],_$[$0-5].first_line, _$[$0-5].first_column);
            this.$ = {etiqueta : "saltoCondicional", tipoDato: $$[$0-3], signo: "==", tipoDato2: $$[$0-3], etiquetaV: $$[$0], linea: _$[$0-5].first_line, columna: _$[$0-5].first_column};
        
break;
case 20:

            this.$ = ">";
         
break;
case 21:

             this.$ =">=";
         
break;
case 22:

             this.$ = "<";
         
break;
case 23:

             this.$ = "<=";
         
break;
case 24:

             this.$ = "!=";
         
break;
case 25:

             this.$ = "==";
         
break;
case 26:

            //this.$ = new saltoImprimir($$[$0-7],"temp",$$[$0-4],_$[$0-10].first_line, _$[$0-10].first_column);
            this.$ = {etiqueta : "saltoImprimir", tipoDato: $$[$0-7], cad: "temp", tipoDato2: $$[$0-1], linea: _$[$0-10].first_line, columna: _$[$0-10].first_column};
        
break;
case 27:

            //this.$ = new saltoImprimir($$[$0-4],"temp",$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column);
            this.$ = {etiqueta : "saltoImprimir", tipoDato: $$[$0-4], cad: "temp", tipoDato2: $$[$0-1], linea: _$[$0-7].first_line, columna: _$[$0-7].first_column};
        
break;
case 28: case 29:

        //this.$ = new saltoDeclaracion($$[$0],_$[$0-1].first_line, _$[$0-1].first_column);
        this.$ = {etiqueta : "saltoDeclaracion", listaId: $$[$0], linea: _$[$0-1].first_line, columna: _$[$0-1].first_column};
    
break;
case 30: case 31:

        this.$ = "decStack";
    
break;
case 32: case 33:

        this.$ = "decHeap";
    
break;
case 34: case 35: case 38: case 39:

        this.$ = "decP";
    
break;
case 36: case 37: case 40: case 41:

        this.$ = "decH";
    
break;
case 42:

        $$[$0-2].push($$[$0]);
        this.$ = $$[$0-2];
    
break;
case 44:

        //this.$ = new saltoAsignacion($$[$0-2],$$[$0],_$[$0-2].first_line, _$[$0-2].first_column);
        this.$ = {etiqueta : "saltoAsignacion", tipoDato: $$[$0-2], tipoDato2: $$[$0], linea: _$[$0-2].first_line, columna: _$[$0-2].first_column};
    
break;
case 45:

        //this.$ = new saltoAsigEdd($$[$0-8],$$[$0-6],$$[$0-3],_$[$0-8].first_line, _$[$0-8].first_column);
        this.$ = {etiqueta : "saltoGetEdd", tipoDato: $$[$0-3], eed: $$[$0-8], tipoDato2: $$[$0], linea: _$[$0-8].first_line, columna: _$[$0-8].first_column};
    
break;
case 46:

        //this.$ = new saltoGetEdd($$[$0-8],$$[$0-6],$$[$0-4],_$[$0-8].first_line, _$[$0-8].first_column);
        this.$ = {etiqueta : "saltoGetEdd", tipoDato: $$[$0-8], eed: $$[$0-6], tipoDato2: $$[$0-1], linea: _$[$0-8].first_line, columna: _$[$0-8].first_column};
    
break;
case 47:

        //this.$ = new saltoDecMetodo($$[$0-6],$$[$0-2],_$[$0-6].first_line, _$[$0-6].first_column);
        this.$ = {etiqueta : "saltoDecMetodo", ide: $$[$0-5], listaInstru: $$[$0-1], linea: _$[$0-6].first_line, columna: _$[$0-6].first_column};
    
break;
case 48: case 49:

        //this.$ = new saltoDecMetodo($$[$0-5],$$[$0-1],_$[$0-6].first_line, _$[$0-6].first_column);
        this.$ = {etiqueta : "saltoDecMetodo", ide: $$[$0-5], listaInstru: $$[$0-1], linea: _$[$0-6].first_line, columna: _$[$0-6].first_column};
    
break;
case 50:

        //this.$ = new saltocallMetodo($$[$0-3],_$[$0-3].first_line, _$[$0-3].first_column);
        this.$ = {etiqueta : "saltocallMetodo", identificador: $$[$0-3], linea: _$[$0-3].first_line, columna: _$[$0-3].first_column};
    
break;
case 51:

        //this.$ = new saltoExpAritmetica($$[$0-10],$$[$0-8],$$[$0-7],$$[$0-6],_$[$0-10].first_line, _$[$0-10].first_column);
        this.$ = {etiqueta : "saltoExpAritmetica", tipoDato: $$[$0-10], tipoDato2: $$[$0-5], signo: $$[$0-4], tipoDato3: $$[$0], linea: _$[$0-10].first_line, columna: _$[$0-10].first_column};
    
break;
case 52:

        //this.$ = new saltoExpAritmetica($$[$0-4],$$[$0-2],$$[$0-1],$$[$0],_$[$0-4].first_line, _$[$0-4].first_column);
        this.$ = {etiqueta : "saltoExpAritmetica", tipoDato: $$[$0-4], tipoDato2: $$[$0-2], signo: $$[$0-1], tipoDato3: $$[$0], linea: _$[$0-4].first_line, columna: _$[$0-4].first_column};
    
break;
case 53:

        var op1 = {nombre: "expresion", tipo:"num", valor:0};
        //this.$ = new saltoExpAritmetica($$[$0-3],op1,$$[$0-1],$$[$0],_$[$0-3].first_line, _$[$0-3].first_column);
        this.$ = {etiqueta : "saltoExpAritmetica", tipoDato: $$[$0-3], tipoDato2: op1, signo: $$[$0-1], tipoDato3: $$[$0], linea: _$[$0-3].first_line, columna: _$[$0-3].first_column};
    
break;
case 54: case 55: case 56: case 57: case 58:

            this.$ = $$[$0];
        
break;
case 59:

            //this.$ = new saltoLiteral("expresion","num",$$[$0],_$[$0].first_line, _$[$0].first_column);
            this.$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "num", valor: $$[$0], linea: _$[$0].first_line, columna: _$[$0].first_column};
        
break;
case 60:

            //this.$ = new saltoLiteral("expresion","temp",$$[$0],_$[$0].first_line, _$[$0].first_column);
            this.$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "temp", valor: $$[$0], linea: _$[$0].first_line, columna: _$[$0].first_column};
        
break;
case 61:

            //this.$ = new saltoLiteral("expresion","ptStack",$$[$0],_$[$0].first_line, _$[$0].first_column);
            this.$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "ptStack", valor: $$[$0], linea: _$[$0].first_line, columna: _$[$0].first_column};
        
break;
case 62:

            //this.$ = new saltoLiteral("expresion","ptHeap",$$[$0],_$[$0].first_line, _$[$0].first_column);
            this.$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "ptHeap", valor: $$[$0], linea: _$[$0].first_line, columna: _$[$0].first_column};
        
break;
case 63:

            //this.$ = new saltoLiteral("expresion","identificador",$$[$0],_$[$0].first_line, _$[$0].first_column);
            this.$ = {etiqueta : "saltoLiteral", cad1: "expresion", cad2: "identificador", valor: $$[$0], linea: _$[$0].first_line, columna: _$[$0].first_column};
        
break;
case 64:

        this.$ = "heap";
     
break;
case 65:

         this.$ = "pila";
     
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,20:$V1,21:$V2,22:$V3,24:$V4,26:18,35:$V5,39:$V6,41:$V7,42:$V8,45:$V9,46:$Va,48:$Vb,49:$Vc,50:19,51:$Vd,52:$Ve},{1:[3]},{5:[1,32],6:33,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,20:$V1,21:$V2,22:$V3,24:$V4,26:18,35:$V5,39:$V6,41:$V7,42:$V8,45:$V9,46:$Va,48:$Vb,49:$Vc,50:19,51:$Vd,52:$Ve},o($Vf,[2,3]),{8:[1,34]},{8:[1,35]},{8:[1,36]},{8:[1,37]},{8:[1,38]},o($Vf,[2,9]),{8:[1,39]},{8:[1,40]},o($Vf,[2,12]),o($Vf,[2,13]),o($Vf,[2,14]),{20:[1,41]},{40:42,42:[1,43],45:[1,44],46:[1,45],48:[1,46],49:$Vg,52:[1,47]},{40:49,42:[1,50],45:[1,51],46:[1,52],48:[1,53],49:$Vg,52:[1,54]},{47:[1,55]},{43:[1,56]},{22:[1,57]},{25:[1,58]},{25:[1,59]},{52:[1,60]},{25:[1,61],47:$Vh},{23:[1,62]},o($Vi,[2,59]),o($Vi,[2,60]),o($Vi,[2,61]),o($Vi,[2,62]),{43:[2,64]},{43:[2,65]},{1:[2,1]},o($Vf,[2,2]),o($Vf,[2,4]),o($Vf,[2,5]),o($Vf,[2,6]),o($Vf,[2,7]),o($Vf,[2,8]),o($Vf,[2,10]),o($Vf,[2,11]),{8:[1,63]},{8:[2,28],38:$Vj},{43:[1,65]},{43:[1,66]},{8:[2,38],47:[1,67]},{8:[2,40],47:[1,68]},{25:[1,69]},o($Vk,[2,43]),{8:[2,29],38:$Vj},{43:[1,70]},{43:[1,71]},{8:[2,39],47:[1,72]},{8:[2,41],47:[1,73]},{25:[1,74]},{20:$V1,25:[1,75],26:76,42:$V8,45:$V9,46:$Va,48:$Vb,49:$Vc,50:78,52:$Vl,56:[1,77]},{25:[1,80]},{8:[1,81]},{20:$V1,26:82,46:$Va,48:$Vb,49:$Vc,52:$Vl},{36:[1,83]},{25:[1,84]},{28:[1,85]},o($Vf,[2,17]),o($Vf,[2,15]),{49:[1,86]},{20:$V1,26:87,46:$Va,48:$Vb,49:$Vc,52:$Vl},{20:$V1,26:88,46:$Va,48:$Vb,49:$Vc,52:$Vl},{20:$V1,26:89,46:$Va,48:$Vb,49:$Vc,52:$Vl},{20:$V1,26:90,46:$Va,48:$Vb,49:$Vc,52:$Vl},{28:[1,91]},{20:$V1,26:92,46:$Va,48:$Vb,49:$Vc,52:$Vl},{20:$V1,26:93,46:$Va,48:$Vb,49:$Vc,52:$Vl},{20:$V1,26:94,46:$Va,48:$Vb,49:$Vc,52:$Vl},{20:$V1,26:95,46:$Va,48:$Vb,49:$Vc,52:$Vl},{28:[1,96]},{39:[1,97]},{8:[2,44],55:98,56:$Vm,57:$Vn,58:$Vo,59:$Vp,60:$Vq},{20:$V1,26:104,46:$Va,48:$Vb,49:$Vc,52:$Vl},{43:[1,105]},o([8,28,29,30,31,32,33,34,44,56,57,58,59,60],$Vh),{39:[1,106]},o($Vf,[2,16]),{27:107,28:[1,108],29:[1,109],30:[1,110],31:[1,111],32:[1,112],33:[1,113],34:[1,114]},{37:[1,115]},{28:[1,116]},{8:[1,117]},o($Vk,[2,42]),{44:[1,118]},{44:[1,119]},{8:[2,34]},{8:[2,36]},{53:[1,120]},{44:[1,121]},{44:[1,122]},{8:[2,35]},{8:[2,37]},{53:[1,123]},{28:[1,124]},{20:$V1,26:125,46:$Va,48:$Vb,49:$Vc,52:$Vl},o($Vr,[2,54]),o($Vr,[2,55]),o($Vr,[2,56]),o($Vr,[2,57]),o($Vr,[2,58]),{8:[2,53]},{25:[1,126]},{28:[1,127]},{20:$V1,26:128,46:$Va,48:$Vb,49:$Vc,52:$Vl},{21:[1,129]},o($Vs,[2,20]),o($Vs,[2,21]),o($Vs,[2,22]),o($Vs,[2,23]),o($Vs,[2,24]),o($Vs,[2,25]),{36:[1,130]},{53:[1,131]},o($Vf,[2,50]),{8:[2,30]},{8:[2,32]},{4:132,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,20:$V1,21:$V2,22:$V3,24:$V4,26:18,35:$V5,39:$V6,41:$V7,42:$V8,45:$V9,46:$Va,48:$Vb,49:$Vc,50:19,51:$Vd,52:$Ve},{8:[2,31]},{8:[2,33]},{4:133,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,20:$V1,21:$V2,22:$V3,24:$V4,26:18,35:$V5,39:$V6,41:$V7,42:$V8,45:$V9,46:$Va,48:$Vb,49:$Vc,50:19,51:$Vd,52:$Ve},{20:$V1,26:134,46:$Va,48:$Vb,49:$Vc,52:$Vl},{8:[2,52]},{39:[1,135]},{20:$V1,26:136,46:$Va,48:$Vb,49:$Vc,52:$Vl},{28:[1,137]},{22:[1,138]},{38:[1,139]},{4:140,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,20:$V1,21:$V2,22:$V3,24:$V4,26:18,35:$V5,39:$V6,41:$V7,42:$V8,45:$V9,46:$Va,48:$Vb,49:$Vc,50:19,51:$Vd,52:$Ve},{6:33,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,20:$V1,21:$V2,22:$V3,24:$V4,26:18,35:$V5,39:$V6,41:$V7,42:$V8,45:$V9,46:$Va,48:$Vb,49:$Vc,50:19,51:$Vd,52:$Ve,54:[1,141]},{6:33,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,20:$V1,21:$V2,22:$V3,24:$V4,26:18,35:$V5,39:$V6,41:$V7,42:$V8,45:$V9,46:$Va,48:$Vb,49:$Vc,50:19,51:$Vd,52:$Ve,54:[1,142]},{55:143,56:$Vm,57:$Vn,58:$Vo,59:$Vp,60:$Vq},{28:[1,144]},{44:[1,145]},{21:[1,146]},{8:[2,19]},{20:$V1,25:[1,147],26:148,46:$Va,48:$Vb,49:$Vc,52:$Vl},{6:33,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:$V0,20:$V1,21:$V2,22:$V3,24:$V4,26:18,35:$V5,39:$V6,41:$V7,42:$V8,45:$V9,46:$Va,48:$Vb,49:$Vc,50:19,51:$Vd,52:$Ve,54:[1,149]},o($Vf,[2,48]),o($Vf,[2,49]),{25:[1,150]},{20:$V1,26:151,46:$Va,48:$Vb,49:$Vc,52:$Vl},{47:[1,152]},{22:[1,153]},{39:[1,154]},{28:[1,155]},o($Vf,[2,47]),{39:[1,156]},{44:[1,157]},{20:$V1,26:158,46:$Va,48:$Vb,49:$Vc,52:$Vl},{8:[2,18]},{28:[1,159]},{8:[2,27]},{28:[1,160]},{8:[2,46]},{8:[2,45]},{20:$V1,26:161,46:$Va,48:$Vb,49:$Vc,52:$Vl},{20:$V1,26:162,46:$Va,48:$Vb,49:$Vc,52:$Vl},{28:[1,163]},{8:[2,51]},{8:[2,26]}],
defaultActions: {30:[2,64],31:[2,65],32:[2,1],89:[2,34],90:[2,36],94:[2,35],95:[2,37],104:[2,53],118:[2,30],119:[2,32],121:[2,31],122:[2,33],125:[2,52],138:[2,19],153:[2,18],155:[2,27],157:[2,46],158:[2,45],162:[2,51],163:[2,26]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

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
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:/*comentario lineal*/ 
break;
case 2:/*comentario multilineal*/
break;
case 3:return 20
break;
case 4:return 37
break;
case 5:return 37  
break;
case 6:return 37
break;
case 7:return 37
break;
case 8:return 33
break;
case 9:return 30
break;
case 10:return 32
break;
case 11:return 57
break;
case 12:return 56
break;
case 13:return 59
break;
case 14:return 58
break;
case 15:return 60
break;
case 16:return 34
break;
case 17:return 47
break;
case 18:return 38
break;
case 19:return 23
break;
case 20:return 8
break;
case 21:return 'dol'
break;
case 22:return 25
break;
case 23:return 28
break;
case 24:return 29
break;
case 25:return 31
break;
case 26:return 53
break;
case 27:return 54
break;
case 28:return 36
break;
case 29:return 43
break;
case 30:return 44
break;
case 31:return 25
break;
case 32:return 28
break;
case 33:return 24
break;
case 34:return "GOTO"
break;
case 35:return 'PROC'
break;
case 36:return 'BEGIN'
break;
case 37:return 'END'
break;
case 38:return 'CALL'
break;
case 39:return 35
break;
case 40:return 45
break;
case 41:return 42
break;
case 42:return 46
break;
case 43:return 48
break;
case 44:return "VOID"
break;
case 45:return 39
break;
case 46:return 41
break;
case 47:return 19;
break;
case 48:return 49 
break;
case 49:return 22
break;
case 50:return 22
break;
case 51:return 52
break;
case 52:return 5
break;
}
},
rules: [/^(?:\s+)/,/^(?:\/\/[^\n]*)/,/^(?:\/\*[^"/#"]*\*\/)/,/^(?:[-]?[0-9]+(\.[0-9]+)?\b)/,/^(?:%c\b)/,/^(?:%i\b)/,/^(?:%f\b)/,/^(?:%d\b)/,/^(?:!=)/,/^(?:>=)/,/^(?:<=)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:==)/,/^(?:=)/,/^(?:,)/,/^(?::)/,/^(?:;)/,/^(?:\$)/,/^(?:\()/,/^(?:\))/,/^(?:>)/,/^(?:<)/,/^(?:\{)/,/^(?:\})/,/^(?:")/,/^(?:\[)/,/^(?:\])/,/^(?:\()/,/^(?:\))/,/^(?:if\b)/,/^(?:goto\b)/,/^(?:proc\b)/,/^(?:begin\b)/,/^(?:end\b)/,/^(?:call\b)/,/^(?:printf\b)/,/^(?:Heap\b)/,/^(?:Stack\b)/,/^(?:P\b)/,/^(?:H\b)/,/^(?:void\b)/,/^(?:int\b)/,/^(?:float\b)/,/^(?:return\b)/,/^(?:t[0-9]+)/,/^(?:l[0-9]+)/,/^(?:L[0-9]+)/,/^(?:([a-zA-ZñÑ]|(_[a-zA-ZñÑ]))([a-zA-ZñÑ]|_|[0-9])*)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = Optimizacion;
exports.Parser = Optimizacion.Parser;
exports.parse = function () { return Optimizacion.parse.apply(Optimizacion, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}