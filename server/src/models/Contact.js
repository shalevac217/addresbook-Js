const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure your DB connection is set up separately
const User = require('./User'); // Import User model

const Contact = sequelize.define('Contact', {
    idaddresses: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'idusers'
        }
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    timestamps: false
});

// Define the relationship
User.hasMany(Contact, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Contact.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Contact;
