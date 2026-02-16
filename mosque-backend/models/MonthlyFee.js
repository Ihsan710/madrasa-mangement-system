const mongoose = require('mongoose');

const monthlyFeeSchema = mongoose.Schema({
    citizenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Citizen', required: true },
    year: { type: Number, required: true },
    payments: [{
        month: { type: String, required: true }, // e.g., "Jan-2026"
        amount: { type: Number, required: true },
        paid: { type: Boolean, default: false },
        date: { type: Date }
    }]
}, { timestamps: true });

module.exports = mongoose.model('MonthlyFee', monthlyFeeSchema);
