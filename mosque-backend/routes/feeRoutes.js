const express = require('express');
const router = express.Router();
const { initializeFees, getFees, updateFeeStatus, getMyFees, getAllFees } = require('../controllers/feeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/initialize', protect, adminOnly, initializeFees);
router.put('/status', protect, adminOnly, updateFeeStatus); // Changed /pay to /status
router.get('/all', protect, adminOnly, getAllFees);
router.get('/my-fees', protect, getMyFees);
router.get('/:citizenId', protect, adminOnly, getFees);

module.exports = router;
