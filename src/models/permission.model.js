const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

//Definición de objeto Permission
const Permission = sequelize.define('permisos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: { type: DataTypes.STRING, allowNull: false},
}, {
    timestamps: false,
    tableName: 'permisos',
});

module.exports = Permission;