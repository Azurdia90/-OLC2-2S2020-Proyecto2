
class Metodos_Nativos
{

    private metodos_quemar : string;

    constructor()
    {
        this.metodos_quemar = "";
        this.metodos_quemar = this.build_metodos_impresion();
    }

    public getMetodos_quemar()
    {
        return this.metodos_quemar;
    }

    build_metodos_impresion()
    {
        var proc_impresion_booleano : string;

        var proc_pow_potencia_entero : string;

        var proc_pow_potencia_decimal : string;

        var proc_impresion_numero: string;

        var proc_impresion_caracter : string;

        var proc_impresion_cadena : string;

        var proc_concatenacion_cadena : string;

        var proc_cast_boolean_cadena : string;

        var proc_cast_char_cadena : string;

        var proc_cast_int_cadena : string;

        var proc_cast_decimal_cadena : string;

        var proc_cast_cadena_int : string;

        var proc_cast_cadena_decimal : string;

        var proc_cast_int_caracter : string;

        var proc_cast_decimal_caracter : string;

        var proc_begin_array : string;

        var proc_get_length_array : string;

        var all_proc_impresion : string;

        proc_impresion_booleano     =   "void imprimir_booleano()\n"
                                        +"{\n"
                                        +"    //t0 this, t1 retorno;\n"                                
                                        +"    t2 = 10;\n" 
                                        +"    t3 = 13;\n"  
                                        +"    t4 = P + 2;\n"
                                        +"    t5 = Stack[(int)t4];\n"                          
                                        +"    if(t5 == 1) goto L0; \n"
                                        +"    t6 = 102;\n"
                                        +"    t7 = 97;\n"
                                        +"    t8 = 108;\n"
                                        +"    t9 = 115;\n"
                                        +"    t10 = 101;\n"
                                        +"    printf(\"%c\",(int)t6);\n"
                                        +"    printf(\"%c\",(int)t7);\n"
                                        +"    printf(\"%c\",(int)t8);\n"
                                        +"    printf(\"%c\",(int)t9);\n"
                                        +"    printf(\"%c\",(int)t10);\n"
                                        +"    goto L1;\n"
                                        +"    L0:\n"
                                        +"    t6 = 116;\n"
                                        +"    t7 = 114;\n"
                                        +"    t8 = 117;\n"
                                        +"    t9 = 101;\n"
                                        +"    printf(\"%c\",(int)t6);\n"
                                        +"    printf(\"%c\",(int)t7);\n"
                                        +"    printf(\"%c\",(int)t8);\n" 
                                        +"    printf(\"%c\",(int)t9);\n" 
                                        +"    L1:\n"
                                        +"    printf(\"%c\",(int)t2);\n"
                                        +"    printf(\"%c\",(int)t3);\n"
                                        +"}\n";

        proc_impresion_numero  =     "void imprimir_numero()\n"
                                    +"{\n"
                                    +"    //t0 this, t1 retorno;\n"                            
                                    +"    t2 = 10;\n"                                
                                    +"    t3 = 13;\n"
                                    +"    t4 = P + 2;\n"
                                    +"    t5 = Stack[(int)t4];\n"
                                    +"    printf(\"%d\",(int)t5);\n"
                                    +"    printf(\"%c\",(int)t2);\n"
                                    +"    printf(\"%c\",(int)t3);\n"
                                    +"}\n";

        proc_impresion_caracter   =      "void imprimir_caracter()\n"
                                        +"{\n"
                                        +"    //t0 this, t1 retorno;\n"                            
                                        +"    t2 = 10;\n"                                
                                        +"    t3 = 13;\n"
                                        +"    t4 = P + 2;\n"
                                        +"    t5 = Stack[(int)t4];\n"
                                        +"    printf(\"%c\",(int)t5);\n"
                                        +"    printf(\"%c\",(int)t2);\n"
                                        +"    printf(\"%c\",(int)t3);\n"
                                        +"}\n";  

        proc_impresion_cadena   =    "void imprimir_cadena()\n"
                                    +"{\n"
                                    +"    //t0 this, t1 retorno;\n"
                                    +"    t2 = 10;\n"
                                    +"    t3 = 13;\n"                     
                                    +"    t4 = P + 2;\n"
                                    +"    t5 = Stack[(int)t4];\n"
                                    +"    t6 = Heap[(int)t5]; //tamaño cadena\n"
                                    +"    t5 = t5 + 1;\n"
                                    +"    L2:\n"
                                    +"    t7 = Heap[(int)t5];\n"
                                    +"    if(t7 == 3) goto L3;\n"
                                    +"    printf(\"%c\",(int)t7);\n"
                                    +"    t5 = t5 + 1;\n"
                                    +"    goto L2;\n"
                                    +"    L3:\n"                               
                                    +"    printf(\"%c\",(int)t2);\n"
                                    +"    printf(\"%c\",(int)t3);\n"
                                    +"}\n";
        
        

        all_proc_impresion = "\n"+proc_impresion_booleano+"\n"+proc_impresion_numero+"\n"+proc_impresion_caracter+"\n"+proc_impresion_cadena+"\n"
                             +proc_pow_potencia_entero+"\n"+proc_pow_potencia_decimal+"\n"+proc_concatenacion_cadena+"\n"
                             +proc_cast_boolean_cadena+"\n"+proc_cast_char_cadena+"\n"+proc_cast_int_cadena+"\n"+proc_cast_decimal_cadena+"\n"
                             +proc_cast_cadena_int+"\n"+proc_cast_cadena_decimal+"\n"+proc_cast_int_caracter+"\n"+proc_cast_decimal_caracter+"\n"
                             +proc_begin_array;

        return all_proc_impresion;
    }
}

const metodos_nativos = new Metodos_Nativos;

export default metodos_nativos;