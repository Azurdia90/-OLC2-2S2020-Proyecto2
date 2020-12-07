export abstract class Optimizacion {
    public static heap = new Array();
    public static stack = new Array();
    public static codigo = new Array();
    public static p = 0;
    public static h = 0;
    public static temporales = new Array();
    public static labels = 0;

    public static addHeap(val: any) {
        this.heap.push(val);
    }

    public static addStack(val: any) {
        this.stack.push(val);
    }

    public static newTemporal(): string {
        //igualar listar
        let name = "t_" + this.temporales.length;
        this.temporales.push(name);
        return name;
    }

    public static newLabel(): string {
        this.labels += 1;
        return "L" + this.labels;
    }

    public static getHeap() {
        return this.heap.length;
    }

    public static getStack() {
        return this.stack.length;
    }

    public static agregarC(label: string) {
        this.codigo.push(label + ";");
    }

    public static agregarLabel(label: string) {
        this.codigo.push("" + label + ":");
    }

    public static agregarIfGoto(val1: any,sim: string, val2: any, goto: any) {
        this.codigo.push("if ("+ val1 + " "+ sim +" "+ val2 + ") goto "+ goto +";");
    }
    public static agregarGoTo(etq: string) {
        this.codigo.push("goto " + etq +";");
    }

    public static generarCommentario(text: string) {
        this.codigo.push("/*" + text + "*/ ");
    }

    public static declaracionTemporales() {
        /*
        var cadena = "float ";
        for(var x = 0; x <= this.temporales; x++){
           if(x == this.temporales){
             cadena += "t"+x+";\n";
           }else{
             cadena += "t"+x+", ";
           }
       }
        cadena += "\nvar Stack[];\n";
        cadena += "\nvar Heap[];\n"
        return cadena+"\n";*/
    }

    public static agregarP(val1: any, val2: any) {
        this.codigo.push("pila[" + val1 + "] = " + val2 + ";");
        this.stack.push(val2);
    }

    public static sacarP(val1: any, val2: any) {
        this.codigo.push(val1 + " = pila[" + val2 + "];");
    }

    public static agregarH(val1: any, val2: any) {
        this.codigo.push("heap[" + val1 + "] = " + val2 + ";");
    }

    public static sacarH(val1: any, val2: any) {
        this.codigo.push(val1 + " = heap[" + val2 + "];");
    }

    public static iniFun(id:any){
        this.codigo.push("int "+id+"(){");
    }
    public static iFun(id:any){
        this.codigo.push(id+"(){");
    }

    public static fFun(){
        this.codigo.push("}");
    }

    
}