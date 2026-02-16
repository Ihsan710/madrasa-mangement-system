const Citizen = require('../models/Citizen');
const bcrypt = require('bcrypt');

// @desc    Add a new citizen
// @route   POST /api/admin/citizens
// @access  Private/Admin
const addCitizen = async (req, res) => {
    const { membershipId, mobile, password, name, address, bloodGroup } = req.body;

    // Validation
    if (!membershipId || !mobile || !password || !name) {
        return res.status(400).json({ message: 'Please include all required fields' });
    }

    try {
        // Check if citizen exists
        const citizenExists = await Citizen.findOne({ $or: [{ membershipId }, { mobile }] });

        if (citizenExists) {
            return res.status(400).json({ message: 'Citizen with this ID or Mobile already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create citizen
        const citizen = await Citizen.create({
            membershipId,
            mobile,
            password: hashedPassword,
            name,
            address,
            bloodGroup,
            role: 'citizen'
        });

        if (citizen) {
            res.status(201).json({
                _id: citizen._id,
                name: citizen.name,
                membershipId: citizen.membershipId
            });
        } else {
            res.status(400).json({ message: 'Invalid citizen data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all citizens
// @route   GET /api/admin/citizens
// @access  Private/Admin
const getCitizens = async (req, res) => {
    try {
        const citizens = await Citizen.find({}).sort({ createdAt: -1 });
        res.json(citizens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get citizen by ID
// @route   GET /api/admin/citizens/:id
// @access  Private/Admin
const getCitizenById = async (req, res) => {
    try {
        const citizen = await Citizen.findById(req.params.id);
        if (citizen) {
            res.json(citizen);
        } else {
            res.status(404).json({ message: 'Citizen not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update citizen
// @route   PUT /api/admin/citizens/:id
// @access  Private/Admin
const updateCitizen = async (req, res) => {
    try {
        const citizen = await Citizen.findById(req.params.id);

        if (citizen) {
            citizen.name = req.body.name || citizen.name;
            citizen.address = req.body.address || citizen.address;
            citizen.mobile = req.body.mobile || citizen.mobile;
            citizen.bloodGroup = req.body.bloodGroup || citizen.bloodGroup;
            citizen.membershipId = req.body.membershipId || citizen.membershipId;

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                citizen.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedCitizen = await citizen.save();
            res.json({
                _id: updatedCitizen._id,
                name: updatedCitizen.name,
                msg: "Citizen Updated"
            });
        } else {
            res.status(404).json({ message: 'Citizen not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete citizen
// @route   DELETE /api/admin/citizens/:id
// @access  Private/Admin
const deleteCitizen = async (req, res) => {
    try {
        const citizen = await Citizen.findById(req.params.id);

        if (citizen) {
            await Citizen.deleteOne({ _id: req.params.id });
            // Note: In newer Mongoose, document.remove() is deprecated. Use deleteOne() on model or findByIdAndDelete.
            res.json({ message: 'Citizen removed' });
        } else {
            res.status(404).json({ message: 'Citizen not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addCitizen,
    getCitizens,
    getC_itizenById: getCitizenById, // Typo fixed in export key just in case, but keeping logic clear
    getCitizenById,
    updateCitizen,
    deleteCitizen
};
