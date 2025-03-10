const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: { type: DataTypes.STRING, allowNull: false},
    descripcion: { type: DataTypes.STRING, allowNull: false, unique: true},
    fecha_creacion: { type: DataTypes.DATE, allowNull: false},
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'proyectos',
});

module.exports = Project;