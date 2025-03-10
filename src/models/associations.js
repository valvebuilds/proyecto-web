const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');
const Role = require('./role.model');
const Permission = require('./permission.model');
const RolePermission = require('./rolePermission.model');

User.belongsToMany(Project, { through : UserProject, foreignKey: 'usuario_id', as: 'proyectos'});
Project.belongsToMany(User, {through : UserProject, foreignKey: 'proyecto_id', as: 'usuarios'});

Project.belongsTo(User, { foreignKey: 'administrador_id', as: 'administrador'});

User.belongsTo(Role, {foreignKey: 'rol_id', as : 'rol'});

User.belongsTo(User, {foreignKey : 'administrador_id', as: 'administrador'});

Permission.belongsToMany(Role, { through : RolePermission, foreignKey : 'permiso_id' , as : 'roles'});
Role.belongsToMany(Permission,{ through: RolePermission, foreignKey: 'rol_id', as: 'permisos' });


module.exports = {User, Project, UserProject};