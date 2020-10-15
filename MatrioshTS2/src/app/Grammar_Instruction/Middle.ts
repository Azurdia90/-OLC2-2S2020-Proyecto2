class Middle
{
    private input : String;
    private output : String;

    private static instance : Middle = new Middle();

    constructor()
    {
        this.input = "";
        this.output = "";
    }

    public static getInstance()
    {
        if(this.instance != null)
        {
            return this.instance;
        }
        else
        {
            this.instance = new Middle();
            return this.instance;
        }
    }

    public getInput()
    {
        return this.input;
    }

    public setInput(p_input : String)
    {
        this.input = p_input;
    }

    public getOuput()
    {
        return this.output;
    }

    public setOuput(p_output : String)
    {
        this.output = this.output.concat(p_output.toString(),"\n");
    }

    public clear()
    {
        this.input = "";
        this.output = "";
    }

}

export default Middle;