const express = require('express');
const router = express.Router();
const { loginAdmin, loginCitizen, registerAdmin } = require('../controllers/authController');

router.post('/admin/login', loginAdmin);
router.post('/citizen/login', loginCitizen);
router.post('/admin/register', registerAdmin); // Use with care

module.exports = router;
