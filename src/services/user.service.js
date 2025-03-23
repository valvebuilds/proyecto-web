const { where } = require('sequelize');
const User = require ('../models/user.model');
const bcrypt = require('bcryptjs');



//Método para crear unn uevo usuario
exports.createUser = async (nombre, email, password,
                            rol_id, administrador_id) => {
                                try{
                                    //Primero verificar si ya esta registrado el correo 
                                    const userExists = await User.findOne({where: { email }});
                                    if (userExists) {
                                        throw new Error(`Ya existe un usuario vinculado al email ingresado.`);
                                    }
                                    //encriptar contraseña
                                    const hashedPassword= await bcrypt.hash(password,10);
                                    //Con sequelize se crea un nuevo registro en la base
                                    const newUser = await User.create({
                                        nombre,
                                        email,
                                        password: hashedPassword,
                                        rol_id,
                                        administrador_id
                                    });
                                    //retorna instancia del modelo User
                                    return newUser;
                                }catch (err) {
                                    throw new Error(`Error al crear al usuario: ${err.message}`);
                                }
};

//Método para que el admin acceda a su lista de usuarios asignados
exports.getAllUsersByAdministradorId = async (administrador_id, email) => {
    try{
        //se define parámetro de query para el where; id del admin
        const whereClause = { administrador_id };
        //permite opción adicional al admin de filtrar a sus usuarios por el correo. 
        if (email) {
            whereClause.email = email;
        }
        //retorna listado de usuarios con su info
        const users = await User.findAll({ where: whereClause, attributes: { exclude: ['password'] }});
        return users;
    }
    catch (err){
        throw new Error('Error al obtener los usuarios: ${ err.message }');
    }
};
//Método para filtar a usuarios según su rol
exports.getAllUsersByRolId = async (rol_id) => {
    try{
        //Definición de parámetro para el where
        const whereClause ={ rol_id };
        //Sequelize hace el query con el where y retorna listado de usuarios filtrados
        const users = await User.findAll({where : whereClause, attributes: {exclude: ['password']}});
        return users;
    }catch (err) {
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};
//Método para acrualizar datos del usuario
exports.updateUser = async (id , nombre , email , rol_id , administrador_id , admin_from_token) =>{
    try{
        //Sequeliza ubica al usuario por id (primarykey)
        const user = await User.findByPk(id);
        //Verifica que el admin sí tenga permiso de editar al usuario
        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }
        //si no se encuentra al usuario, arrojar un error
        if (!user){
            throw new Error('Usuario no encontrado');
        }
        //Verifica si se va a cambiar el correo y si este ya está registrado
        if (email && email !== user.email) {
            //Busca si ya existe un usuario con el correo nuevo
            const userExists = await User.findOne({ where: { email }});
            //arroja error si ya existe
            if (userExists){
                throw new Error('El email ya está en uso');
            }
        }
        //sqeuelize actualiza los datos introducidos en el registro del usuario
        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });
        //devuelve al usuario actualizado
        return user;
    }catch(err) {
        throw new Error(`Error al actualizar el usuario ${err.message}`);
    }
};

//Método para eliminar usuarios
exports.deleteUser = async (id, admin_from_token) => {
    try{
        //Ubica al usuario por id
        const user = await User.findByPk(id);
        //verifica permisos del admin para eliminar al usuario
        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }
        if (!user){
            throw new Error('Usuario no encontrado');
        }
        //sequelize destruye el registro del usuario
        await user.destroy();
        return { message: 'Usuario eliminado con éxito'};
    } catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};