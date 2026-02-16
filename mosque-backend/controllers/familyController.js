const FamilyMember = require('../models/FamilyMember');
const Citizen = require('../models/Citizen');

// @desc    Add a family member
// @route   POST /api/family
// @access  Private/Citizen
const addFamilyMember = async (req, res) => {
    const { name, relation, age, maritalStatus, spouseName, bloodGroup, studying, working } = req.body;

    if (!name || !relation || !age) {
        return res.status(400).json({ message: 'Name, Relation and Age are required' });
    }

    try {
        const familyMember = await FamilyMember.create({
            citizenId: req.user._id,
            name,
            relation,
            age,
            maritalStatus,
            spouseName,
            bloodGroup,
            studying,
            working
        });

        // Add to citizen's family list
        const citizen = await Citizen.findById(req.user._id);
        citizen.familyMembers.push(familyMember._id);
        await citizen.save();

        res.status(201).json(familyMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all family members of logged in citizen
// @route   GET /api/family
// @access  Private/Citizen
const getFamilyMembers = async (req, res) => {
    try {
        const members = await FamilyMember.find({ citizenId: req.user._id });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a family member
// @route   DELETE /api/family/:id
// @access  Private/Citizen
const deleteFamilyMember = async (req, res) => {
    try {
        const member = await FamilyMember.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ message: 'Family member not found' });
        }

        // Ensure user owns this record
        if (member.citizenId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await FamilyMember.deleteOne({ _id: req.params.id });

        // Remove from citizen's list
        const citizen = await Citizen.findById(req.user._id);
        citizen.familyMembers = citizen.familyMembers.filter(id => id.toString() !== req.params.id);
        await citizen.save();

        res.json({ message: 'Family member removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addFamilyMember, getFamilyMembers, deleteFamilyMember };
