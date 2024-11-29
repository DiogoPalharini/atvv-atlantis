import mysql from 'mysql2/promise';


export const db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '1234', 
    database: 'atlantis_hotel', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
