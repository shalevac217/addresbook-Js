const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure your DB connection is set up separately

const User = sequelize.define('User', {
    idusers: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = User;
