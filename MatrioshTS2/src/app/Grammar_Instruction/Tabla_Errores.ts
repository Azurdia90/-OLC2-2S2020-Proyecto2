import { Errores } from '../Interfaces/Errores';

class Tabla_Errores extends Array<Errores>
{
    private static _instance : Tabla_Errores = new Tabla_Errores();
        
    public static getInstance() 
    {
        if (this._instance != null){
            return this._instance;    
        }else{
          this._instance = new Tabla_Errores();
          return this._instance;
        }         
    }

    public static clear()
    {
        this._instance = new Tabla_Errores(); 
    }
}

export default Tabla_Errores;