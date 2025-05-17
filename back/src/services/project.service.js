const { where } = require('sequelize');
const Project = require('../models/project.model');
const User = require('../models/user.model');
const ROLES = require('../utils/constants');
const userProject = require('../models/userProject.model');

//Creacion de proyecto nuevo
exports.createProject = async (nombre, descripcion, fecha_creacion, admin_id) => {
            try{
                const newProject = await Project.create({
                    nombre, descripcion, fecha_creacion, admin_id
                });
                return newProject;
            }catch (err) {
                throw new Error(`Error al crear proyecto: ${err.message}`);
            }
};

//MEtodo que encuentra proyecto por id y actualiza datos del request body
exports.updateProject = async (id, data) => {
    const project = await Project.findByPk(id);
    if (!project) throw new Error('Proyecto no encontrado');
    await project.update(data);
    return project;
};

//Eliminar proyecto por id
exports.deleteProject = async (id) => {
    const project = await Project.findByPk(id);
    if (!project) throw new Error('Proyecto no encontrado');

    await project.destroy();
    return { message: 'Proyecto eliminado correctamente' };
};

//encontrar proyecto por su id
exports.getProject = async (id) => {
    const project = await Project.findByPk(id, {
        include: [
            {
                model: User,
                as: 'usuarios',
                attributes: ['id', 'nombre', 'email'],
                through: { attributes: [] }
            }
        ]
    });

    if (!project) throw new Error('Proyecto no encontrado');
    return project;
};

exports.getProjectsByUser = async (userId) => {
    
  const user = await User.findByPk(userId, {
    include: [{
      model: Project,
      as: 'proyectos', // asegúrate de que este alias coincida con tu asociación
      attributes: ['id', 'nombre', 'descripcion', 'fecha_creacion', 'admin_id'],
      through: { attributes: [] }, // para no traer los datos de la tabla intermedia
      include: [{
        model: User,
        as: 'admin', // si definiste esta relación para el admin del proyecto
        attributes: ['id', 'nombre']
      }]
    }]
  });

  if (!user) throw new Error('Usuario no encontrado');

  return user.proyectos; // Lista de proyectos asociados
};

//obtener todos los proyectos de la BD
exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'admin',
                    attributes: ['id', 'nombre']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });

        return projects;
    } catch (err) {
        throw new Error(`Error al obtener proyectos: ${err.message}`);
    }
};

//obtener todos los proyectos asociados a un usuario
//exports.getProjectsByUserId = async (userId) => { 

//};

//método para asociar usuarios a proyectos
exports.assignUsersToProject = async (projectId, userIds) => {
    // Buscar el proyecto por su ID
    const project = await Project.findByPk(projectId);
    if (!project) {
        throw new Error('Proyecto no encontrado');
    }
    // Buscar todos los usuarios por sus IDs
    const users = await User.findAll({
        where: { id: userIds }
    });

    // Verificar si todos los usuarios existen
    if (users.length !== userIds.length) {
        throw new Error('Algunos usuarios no fueron encontrados');
    }
    // Asignar los usuarios al proyecto
    await project.addUsuarios(users);
    // Retornar el proyecto actualizado con los usuarios asociados
    return await Project.findByPk(projectId, {
        include: [
            {
                model: User,
                as: 'usuarios',
                attributes: ['id', 'nombre', 'email'],
                through: { attributes: [] }
            }
        ]
    });
};
//método para desasociar usuarios de proyectos
exports.removeUserFromProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Proyecto no encontrado');
    const user = await User.findAll({
        where: { id: data.userIds }
    });
    if (!user) throw new Error('Usuario no encontrado');

    await project.removeUsuario(user);
};
















