const mongoose = require('mongoose');

const citizenSchema = mongoose.Schema({
    membershipId: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    profilePhoto: { type: String },
    bloodGroup: { type: String },
    familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' }],
    monthlyFee: { type: mongoose.Schema.Types.ObjectId, ref: 'MonthlyFee' },
    role: { type: String, default: 'citizen' }
}, { timestamps: true });

module.exports = mongoose.model('Citizen', citizenSchema);
