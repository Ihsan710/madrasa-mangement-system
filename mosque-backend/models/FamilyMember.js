const mongoose = require('mongoose');

const familyMemberSchema = mongoose.Schema({
    citizenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Citizen', required: true },
    name: { type: String, required: true },
    relation: { type: String, required: true }, // father, mother, son, daughter, etc.
    age: { type: Number, required: true },
    maritalStatus: { type: String },
    spouseName: { type: String },
    bloodGroup: { type: String },
    studying: { type: String },
    working: { type: String },
    photo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('FamilyMember', familyMemberSchema);
