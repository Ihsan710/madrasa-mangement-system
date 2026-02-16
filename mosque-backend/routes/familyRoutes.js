const express = require('express');
const router = express.Router();
const { addFamilyMember, getFamilyMembers, deleteFamilyMember } = require('../controllers/familyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addFamilyMember)
    .get(protect, getFamilyMembers);

router.route('/:id')
    .delete(protect, deleteFamilyMember);

module.exports = router;
