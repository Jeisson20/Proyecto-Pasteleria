import express from 'express' // Framework para crear el servidor y manejar rutas
import morgan from 'morgan' // Middleware para mostrar logs de peticiones HTTP en consola
import cookieParser from 'cookie-parser' // Middleware para leer cookies del cliente
import cors from 'cors' // Middleware para permitir peticiones desde otros dominios (Cross-Origin)

// Importación de rutas personalizadas
import authRoutes from './routes/auth.routes.js' // Rutas relacionadas con autenticación 
import userRoutes from './routes/users.routes.js' // Rutas relacionadas con usuarios 

// Inicialización de la aplicación Express
const app = express()

// Configuración de CORS para permitir peticiones desde el frontend en localhost:5173
app.use(cors({
    origin: 'http://localhost:5173', // Dominio permitido para hacer peticiones
    credentials: true, // Permite el envío de cookies y cabeceras de autenticación
}))

// Middleware para mostrar en consola las peticiones HTTP (GET, POST, etc.)
app.use(morgan('dev'))

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json())

// Middleware para leer cookies enviadas por el cliente
app.use(cookieParser())

// Montaje de rutas: cualquier ruta que comience con /api será manejada por authRoutes o userRoutes
app.use("/api", authRoutes)
app.use("/api", userRoutes)

// Inicio del servidor en el puerto 3000
app.listen(3000)
