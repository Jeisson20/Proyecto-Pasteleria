// Importación del paquete 'pg' (PostgreSQL para Node.js)
import pkg from 'pg'
const { Pool } = pkg // Extraemos el constructor Pool para manejar conexiones

// Configuración del pool de conexiones a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'pasteleria_db'
})

export default pool
