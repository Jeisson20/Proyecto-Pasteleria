// Importamos Axios, la librería para hacer peticiones HTTP
import axios from 'axios'

// Creamos una instancia personalizada de Axios
const instance = axios.create({
    // URL base para todas las peticiones 
    baseURL: 'http://localhost:3000/api',

    // Permite enviar cookies automáticamente con cada petición
    withCredentials: true,
})

// Exportamos la instancia para usarla en otros módulos 
export default instance
