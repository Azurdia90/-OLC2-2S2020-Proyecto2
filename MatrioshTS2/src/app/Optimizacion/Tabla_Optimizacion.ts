import { OptimizacionC } from '../Interfaces/OptmizacionC';

class Tabla_Optimizacion extends Array<OptimizacionC>
{
    private static _instance : Tabla_Optimizacion = new Tabla_Optimizacion();
        
    public static getInstance() 
    {
        if (this._instance != null){
            return this._instance;    
        }else{
          this._instance = new Tabla_Optimizacion();
          return this._instance;
        }         
    }

    public static clear()
    {
        this._instance = new Tabla_Optimizacion(); 
    }
}

export default Tabla_Optimizacion;