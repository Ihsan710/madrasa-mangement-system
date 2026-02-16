const express = require('express');
const router = express.Router();
const {
    addCitizen,
    getCitizens,
    getCitizenById,
    updateCitizen,
    deleteCitizen
} = require('../controllers/adminController');
const { getDashboardStats } = require('../controllers/statsController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, adminOnly, getDashboardStats);

router.route('/citizens')
    .post(protect, adminOnly, addCitizen)
    .get(protect, adminOnly, getCitizens);

router.route('/citizens/:id')
    .get(protect, adminOnly, getCitizenById)
    .put(protect, adminOnly, updateCitizen)
    .delete(protect, adminOnly, deleteCitizen);

module.exports = router;
