const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    logging: console.log,
    define: {
        freezeTableName: true
    }
});

module.exports = {
    sequelize,
    connect: async function(){
        try {
            await sequelize.authenticate()
            console.log("Connection has been established successfully")
        } catch (error) {
            console.error("connection to database has been failed",error)
        }
    }
}