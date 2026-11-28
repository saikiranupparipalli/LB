// db.js
// PostgreSQL connection pool configuration using 'pg'.

import {Pool} from "pg"
import { configDotenv } from "dotenv"

configDotenv()
// study about Pool class
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

})

export {pool}