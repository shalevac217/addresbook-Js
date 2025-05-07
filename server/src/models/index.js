const sequelize = require('../config/database');
const User = require('./User');
const Contact = require('./Contact');

sequelize.sync()
    .then(() => console.log("Database & tables created!"))
    .catch(err => console.error("Error syncing database:", err));

module.exports = { User, Contact };
