const userService = require('../services/user.service');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        //extraer datos del request
        const { nombre, email, password, rol_id, administrador_id } = req.body;
        //Llama a user service para crear al usuario
        const user = await UserService.createUser(nombre, email, password, rol_id, administrador_id);
            
        return res.status(200).json({ message: 'Usuario creado con éxito.', user: newUser });
    } catch (err) {
        return res.status(500).json({ error: err.message });
}
};

//Controlador para filtrar usuarios por admin
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        //extrae el id del usuario autenticado
        const admin_from_token = req.user.id;
        //parámetro de query por si el administrador quiere filtrar por un correo especifico
        const { email } = req.query;
        //llamado al servicio de usuarios para filtrar
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email);
        res.status(200).json({message: 'Usuarios consultados con éxito', users});
    } catch(err){
        res.status(500).json({ message: 'Error al obtener usuarios ', err});
    }
};

//Controlador que filtra users por rol
exports.getAllUsersByRolId = async (req, res) => {
    try{
        //parámetro de query con el rol para filtrar la busqueda
        const { rol_id } = req.query;
        //llamado al servicio de usuarios para filtrar segun el rol
        const users = await userService.getAllUsersByRolId(rol_id);
        res.status(200).json({ message: "Usuarios consultados con éxito", users });
    } catch (err) {
        res.status(500).json({ message: "Error al obtener usuarios", error: err.message });
    }
};

//Controlador para la actualización de registros de usuario
exports.updateUser = async (req , res ) => {
    //extraer del request la id del usuario a actualizar
    const { id } = req.params;
    //extraer del request los campos para actualizar la info del usuario
    const { nombre, email, rol_id, administrador_id} = req.body;
    //se extrae la id del admin conectado
    const admin_from_token = req.user.id;
    try{
        //llamado al servicio de usuarios para actualizar el registro
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({message : 'Usuario actualizado con éxito', user});
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

//Controlador para eliminar a un usuario
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; //Extrae id del usuario a eliminar desde el request
        const admin_from_token = req.user.id; //extrae id del usuario autenticado
        const deletedUser = await userService.deleteUser(id, admin_from_token); //llama al service de usuario para ejecutar método deleteUser
        
        res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar el usuario", error: err.message });
    }
};