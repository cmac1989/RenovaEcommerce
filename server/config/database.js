const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('unable to connect to the database', error);
    }
}
 testConnection();



// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });
//
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err.stack);
//         return;
//     }
//     console.log('Connected to MySQL as id ' + db.threadId);
// });
//
module.exports = sequelize;