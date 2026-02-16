const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Citizen = require('../models/Citizen');

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth Admin & get token
// @route   POST /api/auth/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                _id: admin._id,
                username: admin.username,
                role: admin.role,
                token: generateToken(admin._id, admin.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth Citizen & get token
// @route   POST /api/auth/citizen/login
// @access  Public
const loginCitizen = async (req, res) => {
    const { identifier, password } = req.body; // identifier can be membershipId or mobile

    try {
        const citizen = await Citizen.findOne({
            $or: [{ membershipId: identifier }, { mobile: identifier }]
        });

        if (citizen && (await bcrypt.compare(password, citizen.password))) {
            res.json({
                _id: citizen._id,
                name: citizen.name,
                membershipId: citizen.membershipId,
                role: citizen.role,
                profilePhoto: citizen.profilePhoto, // Include profile photo
                token: generateToken(citizen._id, citizen.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register Admin (Initial setup only)
// @route   POST /api/auth/admin/register
// @access  Public (Should be protected or removed in prod)
const registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminExists = await Admin.findOne({ username });

        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            username,
            password: hashedPassword,
        });

        if (admin) {
            res.status(201).json({
                _id: admin._id,
                username: admin.username,
                token: generateToken(admin._id, admin.role),
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginAdmin, loginCitizen, registerAdmin };
