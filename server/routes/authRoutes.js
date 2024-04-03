const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// Ruta para el inicio de sesión
router.post('/login', [
  // Validación de los campos del formulario
  body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
], authController.login);

module.exports = router;
