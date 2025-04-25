const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');
const Role = require('./role.model');
const Permission = require('./permission.model');
const RolePermission = require('./rolePermission.model');

//Relacion muchos a muchos entre usuaqrios y proyectos
User.belongsToMany(Project, { through : UserProject, foreignKey: 'usuario_id', as: 'proyectos'});
Project.belongsToMany(User, {through : UserProject, foreignKey: 'proyecto_id', as: 'usuarios'});

//Relación muchos a uno de projectos a administradores
Project.belongsTo(User, { foreignKey: 'admin_id', as: 'admin'});

//Relacion uno a uno user y rol
User.belongsTo(Role, {foreignKey: 'rol_id', as : 'rol'});

//Relacion uno a uno user y admin
User.belongsTo(User, {foreignKey : 'admin_id', as: 'admin'});

//relacion muchos a muchos entre Roles y permisos
Permission.belongsToMany(Role, { through : RolePermission, foreignKey : 'permiso_id' , as : 'roles'});
Role.belongsToMany(Permission,{ through: RolePermission, foreignKey: 'rol_id', as: 'permisos' });


module.exports = {User, Project, UserProject};