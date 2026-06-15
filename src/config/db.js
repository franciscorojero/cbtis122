import pg from "pg";
import fs from "fs";
import dotenv from "dotenv/config";

// dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(process.env.SSL_CA_PATH).toString()
    }
});

export default pool;