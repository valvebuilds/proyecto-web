const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('roles', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: { type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false,
    tableName: 'roles',
});

module.exports = Role;