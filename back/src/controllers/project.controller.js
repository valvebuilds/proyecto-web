const projectService = require('../services/project.service');
const userService = require('../services/user.service');

//Método del controlador que extrae datos del request para la creación de un nuevo proyecto
exports.createProject = async (req, res) => {
    try {
        //extraer datos del request
        const { nombre, descripcion, fecha_creacion, admin_id} = req.body;
        //Llama a user service para crear al usuario
        const project = await projectService.createProject(nombre, descripcion, fecha_creacion, admin_id);
            
        return res.status(200).json({ message: 'proyecto creado con éxito.', proyecto: project });
    } catch (err) {
        return res.status(500).json({ error: err.message });
}
};

//Método que toma parámetro del request como id de proyecto. Se actualizan los datos del proyecto con 
//la data que se toma del cuerpo de la solicitud
exports.updateProject = async (req , res ) => {
    const { id } = req.params;
    const data = req.body;
    try{
        const updatedProject = await projectService.updateProject(id, data);
        res.status(200).json({message : 'Proyecto actualizado con éxito', updatedProject});
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Toma id de los parametros de la solicitud http para eliminar un proyecto
exports.deleteProject = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedProject = await projectService.deleteProject(id);
        return res.status(200).json({ message: 'Proyecto eliminado con éxito.' });
}catch (err){
    return res.status(500).json({ error: err.message });
}
};

//Método para obtener un proyecto, dado su id en los parametros de la solicitud
exports.getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectService.getProject(id);
        return res.status(200).json({ message: 'Proyecto obtenido con éxito.', proyecto: project });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

//Muestra todos los proyectos
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        return res.status(200).json({ message: 'Proyectos obtenidos con éxito.', proyectos: projects });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

//Dado un user id, se llama al servicio para mostrar los proyectos de un usuario
exports.getProjectsByUserId = async (req, res) => {
    try {
        const { userid } = req.params;
        const projects = await projectService.getProjectsByUserId(userid);
        return res.status(200).json({ message: 'Proyectos obtenidos con éxito.', proyectos: projects });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

//Método que toma id proyecto y un array de ids de usuario para asociarlos.
exports.assignUsersToProject = async (req, res) => {
    try {
        const { projectId, userIds } = req.body;

        if (!projectId || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ message: 'Se requiere un projectId y un array de userIds.' });
        }

        const result = await projectService.assignUsersToProject(projectId, userIds);
        return res.status(200).json({ message: 'Usuarios asignados al proyecto con éxito.', result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

//Igual que el metodo anterior, solo que desasocia los usuarios dados del proyecto dado
exports.removeUserFromProject = async (req,res) => {
    try {
        const  data  = req.body;

        if (!data.projectId || data.userIds.length === 0) {
            return res.status(400).json({ message: 'Se requiere un projectId y un array de userIds.' });
        }

        const result = await projectService.removeUserFromProject(data);
        return res.status(200).json({ message: 'El usuario ha sido retirado de proyecto.', result });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


