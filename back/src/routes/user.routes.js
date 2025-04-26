const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();
const { authenticateToken, checkRole } = require('../middleware/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middleware/error.middleware');

//endpoints de usuario que primero autentican y verifican rol de administrador antes de llamar a los metodos
router.post('/users/create', authenticateToken, checkRole([ROLES.ADMIN]), userController.createUser);
router.put('/users/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);
router.get('/users', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);
router.delete('/users/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);
router.get('/users/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);

router.use(errorHandler);


module.exports = router;

