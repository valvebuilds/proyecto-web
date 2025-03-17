const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

//Define table que relaciona proyectos con usuarios
const userProject = sequelize.define('userProject', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'usuarios_proyectos',
});

module.exports = userProject;