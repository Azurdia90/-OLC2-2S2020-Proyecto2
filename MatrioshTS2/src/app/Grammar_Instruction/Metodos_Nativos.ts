
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


        var proc_impresion_numero: string;

        var proc_impresion_cadena : string;

        var proc_concatenacion_cadena : string;

        var proc_cast_boolean_cadena : string;

        var proc_cast_char_cadena : string;

        var proc_cast_numero_cadena : string;

        var proc_pow_potencia_numero : string;

        var proc_cast_cadena_numero : string;

        var proc_cast_cadena_numero : string;

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
        
        proc_concatenacion_cadena =  "void concatenacion_cadena()\n"
                                    +"{\n"
                                    +"    //t0 this, t1 retorno;\n"
                                    +"    t2 = P + 2;\n"
                                    +"    t3 = P + 3;\n"
                                    +"    t4 = Stack[(int)t2];\n"
                                    +"    t5 = Stack[(int)t3];\n"
                                    +"    t6 = Heap[(int)t4];\n"
                                    +"    t4 = t4 + 1;\n"
                                    +"    t7 = Heap[(int)t5];\n"
                                    +"    t5 = t5 + 1;\n"
                                    +"    t8 = t6 + t7;\n"
                                    +"    t9 = H;\n"
                                    +"    Heap[(int)t9] = t8;\n"
                                    +"    t10 = t9 + 1;\n"
                                    +"    L14:\n"
                                    +"    t11 = Heap[(int)t4];\n"
                                    +"    if(t11 == 3) goto L15;\n"
                                    +"    Heap[(int)t10] = t11;\n"
                                    +"    t10 = t10 + 1;\n"
                                    +"    t4 = t4 + 1;\n"
                                    +"    goto L14;\n"
                                    +"    L15:\n"
                                    +"    L16:\n"
                                    +"    t12 = Heap[(int)t5];\n"
                                    +"    if(t12 == 3) goto L17;\n"
                                    +"    Heap[(int)t10] = t12;\n"
                                    +"    t10 = t10 + 1;\n"
                                    +"    t5 = t5 + 1;\n"
                                    +"    goto L16;\n"
                                    +"    L17:\n"
                                    +"    Heap[(int)t10] = 3;\n"
                                    +"    t10 = t10 + 1;\n"
                                    +"    H = t10 + 1;\n"
                                    +"    t1 = P + 1;\n"
                                    +"    Stack[(int)t1] = t9;\n"
                                    +"}\n";    

        proc_cast_boolean_cadena =   "void cast_boolean_cadena()\n"
                                    +"{"
                                    +"    //t0 this, t1 retorno;\n"
                                    +"    t2 = P + 2;\n"
                                    +"    t3 = Stack[(int)t2];\n"                               
                                    +"    if(t3 == 1) goto L21; \n"
                                    +"    t4 = H;\n"                            
                                    +"    Heap[(int)H] = 5;\n"
                                    +"    H= H + 1;\n"
                                    +"    Heap[(int)H] = 102;\n"
                                    +"    H= H + 1;\n"
                                    +"    Heap[(int)H] = 97;\n"
                                    +"    H= H + 1;\n"
                                    +"    Heap[(int)H] = 108;\n"
                                    +"    H= H + 1;\n"
                                    +"    Heap[(int)H] = 115;\n"
                                    +"    H= H + 1;\n"
                                    +"    Heap[(int)H] = 101;\n"
                                    +"    H= H + 1;\n"
                                    +"    goto L22;\n"
                                    +"    L21:\n"                        
                                    +"    t4 = H;\n"
                                    +"    Heap[(int)H] = 4;\n"
                                    +"    H= H + 1;\n"
                                    +"    Heap[(int)H] = 116;\n"
                                    +"    H= H + 1;\n"
                                    +"    Heap[(int)H] = 114;\n"
                                    +"    H= H + 1;\n"
                                    +"    Heap[(int)H] = 117;\n" 
                                    +"    H= H + 1;\n"
                                    +"    Heap[(int)H] = 101;\n" 
                                    +"    H= H + 1;\n"
                                    +"    L22:\n"
                                    +"    Heap[(int)H] = 3;\n" 
                                    +"    H = H + 1;\n"
                                    +"    t5 = P + 1;\n"
                                    +"    Stack[(int)t5] = t4;\n"
                                    +"}\n";

        proc_cast_numero_cadena =   "void cast_numero_cadena()\n"
                                    +"{\n"
                                    +"    //t0 this, t1 retorno;\n"
                                    +"    t2 = 10;\n"
                                    +"    t3 = P + 2;\n"
                                    +"    t4 = Stack[(int)t3];\n"
                                    +"    t5 = (int)t4 % (int)1;\n"
                                    +"    t6 = t4 - t5;\n"
                                    +"    t7  = t6;\n"
                                    +"    t8 = H;\n"
                                    +"    Heap[(int)t8] = 1;\n"
                                    +"    H = H + 1;\n"
                                    +"    t9 = H;\n"
                                    +"    if(t4 == 0) goto L32;\n"
                                    +"    goto L33;\n"
                                    +"    L32:\n"                         
                                    +"    Heap[(int)t9] = 48;\n"
                                    +"    t9 = t9 + 1;\n"
                                    +"    Heap[(int)t9] = 46;\n"
                                    +"    t9 = t9 + 1;\n"
                                    +"    Heap[(int)t9] = 48;\n"
                                    +"    t9 = t9 + 1;\n"
                                    +"    Heap[(int)t9] = 48;\n"
                                    +"    t9 = t9 + 1;\n"
                                    +"    Heap[(int)t9] = 3;\n"
                                    +"    t9 = t9 + 1;\n"
                                    +"    H = t9 + 1;\n"
                                    +"    goto L40;\n"
                                    +"    L33:\n"
                                    +"    if(t4 < 0) goto L35;\n" 
                                    +"    goto L36;\n"
                                    +"    L35:\n"                                
                                    +"    Heap[(int)t9] = 45;\n"
                                    +"    t9 = t9 + 1;\n"
                                    +"    t6 = t6 * -1;\n"
                                    +"    t7 = t7 * -1;\n"
                                    +"    t5 = t5 * -1;\n"
                                    +"    L36:\n"
                                    +"    if(t6 == 0) goto L37;\n"
                                    +"    goto L38;\n"
                                    +"    L37:\n"
                                    +"    Heap[(int)t9] = 48 ;\n"
                                    +"    t9 = t9 + 1;\n"
                                    +"    goto L8;\n"
                                    +"    L38:\n"                                
                                    +"    if(t7 >= 1) goto L7;\n"
                                    +"    goto L8;\n"
                                    +"    L7:\n" 
                                    +"    t7 = t7 / t2;\n"
                                    +"    t9 = t9 + 1;\n"
                                    +"    goto L38;\n"
                                    +"    L8:\n"                                
                                    +"    t10 = t9 + 1;\n"
                                    +"    Heap[(int)t9] = 46;\n"
                                    +"    t9 = t9 - 1;\n"
                                    +"    L39:\n"
                                    +"    t11 = (int)t6 % (int)t2;\n"
                                    +"    t30 = 48 + t11;\n"
                                    +"    Heap[(int)t9] = t30;\n"
                                    +"    t9 = t9 - 1;\n"   
                                    +"    t15 = 10 - t11;\n"
                                    +"    t15 = t15 / t2;\n"
                                    +"    t6 = t6 / t2;\n"
                                    +"    t6 = t6 + t15;\n"
                                    +"    t6 = t6 - 1;\n"
                                    +"    if(t6 != 0) goto L39;\n"
                                    +"    L34:\n"
                                    +"    t5 = t5 * t2;\n"
                                    +"    t12 = t5;\n"
                                    +"    t5 = (int)t5 % (int)1;\n"
                                    +"    t12 = t12 - t5;\n"
                                    +"    t30 = 48 + t12;\n"
                                    +"    Heap[(int)t10] = t30;\n"
                                    +"    t10 = t10 + 1;\n"
                                    +"    if(t5 !=  0) goto L41;\n"
                                    +"    L41: \n"
                                    +"    if(t12 != 0) goto L34;\n"
                                    +"    L40:\n"   
                                    +"    Heap[(int)t10] = 3;\n"
                                    +"    H = t10 + 1;\n"
                                    +"    t31 = P + 1;\n"
                                    +"    t10 = t10 + 1;\n"
                                    +"    Stack[(int)t31] = t8;\n"
                                    +"}\n";

        proc_pow_potencia_numero  =  "void potencia_numero()\n"
                                    +"{\n"                                
                                    +"    //t0 this, t1 retorno;\n"
                                    +"    t2 = P + 2;\n"
                                    +"    t3 = Stack[(int)t2];\n"
                                    +"    t4 = P + 3;\n"
                                    +"    t5 = Stack[(int)t4];\n"
                                    +"    if(t5!=0) goto L5;\n" 
                                    +"    t6 = 1;\n"
                                    +"    goto L4;\n"
                                    +"    L5:\n"
                                    +"    t7 = 1;\n"
                                    +"    t6 = t3;\n"
                                    +"    L6:\n"
                                    +"    if(t7 >= t5) goto L4;\n"
                                    +"    t6 = t6 * t3;\n"
                                    +"    t7 = t7 + 1;\n"
                                    +"    goto L6;\n"
                                    +"    L4:\n"                               
                                    +"    t8 = P + 1;\n"
                                    +"    Stack[(int)t8] = t6;\n"
                                    +"}\n";  
        

        all_proc_impresion = "\n"+proc_impresion_booleano+"\n"+proc_impresion_numero+"\n"+"\n"+proc_impresion_cadena+"\n"
                             +proc_pow_potencia_numero+"\n"+proc_concatenacion_cadena+"\n"
                             +proc_cast_boolean_cadena+"\n"+proc_cast_numero_cadena+"\n"
                             +proc_cast_cadena_numero+"\n"
                             +proc_begin_array;

        return all_proc_impresion;
    }
}

const metodos_nativos = new Metodos_Nativos;

export default metodos_nativos;