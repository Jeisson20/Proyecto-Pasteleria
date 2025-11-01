import pkg from 'pg';
const { Pool } = pkg;

let instance = null;

class Database {
    constructor() {
        if (!instance) {
            instance = new Pool({
                user: 'postgres',
                password: '1234',
                host: 'localhost',
                port: 5432,
                database: 'pasteleria_db',
            });
        }
        return instance;
    }
}

const pool = new Database();
export default pool;