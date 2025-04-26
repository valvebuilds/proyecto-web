const express = require('express');
const router = express.Router();
const errorHandler = require('../middleware/error.middleware');
const projectController = require('../controllers/project.controller');
const ROLES = require('../utils/constants');
const { authenticateToken, checkRole } = require('../middleware/auth.middleware');

//endpoints de proyectos, primero autentica usuario y verifica que sea admin antes de permitir cambios a la BD
router.post('/projects/create', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject);
router.put('/projects/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject);
router.delete('/projects/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getAllProjects);
router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getProjectsByUserId);

router.post('/projects/associate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.assignUsersToProject);
router.post('/projects/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.removeUserFromProject);


router.use(errorHandler);
module.exports = router;