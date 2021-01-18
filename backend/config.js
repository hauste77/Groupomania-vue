// const mysql = require('mysql');

// const db = mysql.createConnection({
//     host     : "127.0.0.1",
//     username : "root",
//     password : "",
//     database: "database_development_groupomania"
// });



// module.exports = db;

const Sequelize = require('sequelize')
const db = {}
var database = require('../models');
const sequelize = new Sequelize("groupomania", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logQueryParameters: true
})

db.sequelize = sequelize
db.Sequelize = Sequelize

database.sequelize
  .authenticate()
  .then(() => {
    console.log('Nice ! successful connection');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db
