const projectService = require('../services/project.service');


exports.createProject = async (req, res) => {
    try {
        //extraer datos del request
        const { data} = req.body;
        //Llama a user service para crear al usuario
        const project = await projectService.createProject(data);
            
        return res.status(200).json({ message: 'proyecto creado con éxito.', proyecto: newProject });
    } catch (err) {
        return res.status(500).json({ error: err.message });
}
};


exports.updateProject = async (req , res ) => {
    const { id } = req.params;
    const { data } = req.body;
    try{
        const updatedProject = await projectService.updateProject(id, data);
        res.status(200).json({message : 'Proyecto actualizado con éxito', project});
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.deleteProject = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedProject = await projectService.deleteProject(id);
        return res.status(200).json({ message: 'Proyecto eliminado con éxito.' });
}catch (err){
    return res.status(500).json({ error: err.message });
}
};

exports.getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectService.getProject(id);
        return res.status(200).json({ message: 'Proyecto obtenido con éxito.', proyecto: project });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        return res.status(200).json({ message: 'Proyectos obtenidos con éxito.', proyectos: projects });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getProjectsByUserId = async (req, res) => {
    try {
        const { userid } = req.params;
        const projects = await projectService.getProjectsByUserId(userid);
        return res.status(200).json({ message: 'Proyectos obtenidos con éxito.', proyectos: projects });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
exports.assignUsersToProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Proyecto no encontrado');

    const users = await User.findAll({ where: { id: data.userIds } });
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await project.addUsuarios(users);
    return await Project.findByPk(data.projectId, {
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

exports.removeUserFromProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Proyecto no encontrado');

    const user = await User.findByPk(data.userId);
    if (!user) throw new Error('Usuario no encontrado');

    await project.removeUsuario(user);
};


