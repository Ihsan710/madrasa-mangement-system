const Citizen = require('../models/Citizen');
const bcrypt = require('bcrypt');

// @desc    Get current citizen profile
// @route   GET /api/citizen/profile
// @access  Private/Citizen
const getProfile = async (req, res) => {
    try {
        const citizen = await Citizen.findById(req.user._id).select('-password');
        if (citizen) {
            res.json(citizen);
        } else {
            res.status(404).json({ message: 'Citizen not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update citizen profile
// @route   PUT /api/citizen/profile
// @access  Private/Citizen
const updateProfile = async (req, res) => {
    try {
        const citizen = await Citizen.findById(req.user._id);

        if (citizen) {
            citizen.name = req.body.name || citizen.name;
            citizen.mobile = req.body.mobile || citizen.mobile;
            citizen.address = req.body.address || citizen.address;
            citizen.bloodGroup = req.body.bloodGroup || citizen.bloodGroup;

            if (req.file) {
                citizen.profilePhoto = `/uploads/${req.file.filename}`;
            }

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                citizen.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedCitizen = await citizen.save();

            res.json({
                _id: updatedCitizen._id,
                name: updatedCitizen.name,
                mobile: updatedCitizen.mobile,
                address: updatedCitizen.address,
                bloodGroup: updatedCitizen.bloodGroup,
                profilePhoto: updatedCitizen.profilePhoto,
                token: req.headers.authorization.split(' ')[1] // Keep same token
            });
        } else {
            res.status(404).json({ message: 'Citizen not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProfile, updateProfile };
