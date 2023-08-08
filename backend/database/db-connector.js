// Get an instance of mysql we can use in the app
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DATABASE
})

// Export it for use in our applicaiton
export { pool };