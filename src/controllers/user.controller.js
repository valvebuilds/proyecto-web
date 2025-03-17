const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol_id, administrador_id } = req.body;

        if (!nombre || !email || !password || !rol_id || !administrador_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        };

        const user = await UserService.createUser(nombre, email, password, rol_id, administrador_id);
            
        return res.status(200).json({ message: 'Usuario creado con éxito.', user: newUser });
    } catch (err) {
        return res.status(500).json({ error: err.message });
}
}

exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id;
        const { email } = req.query;
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email);
        res.status(200).json({message: 'Usuarios consultados con éxito', users});
    } catch(err){
        res.status(500).json({ message: 'Error al obtener usuarios ', err});
    }
};

exports.getAllUsersByRolId = async (req, res) => {
    try{
        const { rol_id } = req.query;
        const users = await userService.getAllUsersByRolId(rol_id);
        res.status(200).json({ message: "Usuarios consultados con éxito", users });
    } catch (err) {
        res.status(500).json({ message: "Error al obtener usuarios", error: err.message });
    }
};


exports.updateUser = async (req , res ) => {
    const { id } = req.params;
    const { nombre, email, rol_id, administrador_id} = req.body;
    const admin_from_token = req.user.id;
    try{
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({message : 'Usuario actualizado con éxito', user});
    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const admin_from_token = req.user.id; 
        const deletedUser = await userService.deleteUser(id, admin_from_token);
        
        res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar el usuario", error: err.message });
    }
};