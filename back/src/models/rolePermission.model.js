const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//Define table que relaciona roles con permisos
const rolePermission = sequelize.define('rolePermission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    permiso_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'roles_permisos',
});

module.exports = rolePermission;