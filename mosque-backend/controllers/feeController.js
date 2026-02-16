const MonthlyFee = require('../models/MonthlyFee');
const Citizen = require('../models/Citizen');

// @desc    Initialize/Set monthly fees for a citizen for a year
// @route   POST /api/admin/fees/initialize
// @access  Private/Admin
const initializeFees = async (req, res) => {
    const { citizenId, year, monthlyAmount } = req.body;

    if (!citizenId || !year || !monthlyAmount) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        let feeRecord = await MonthlyFee.findOne({ citizenId, year });

        if (feeRecord) {
            return res.status(400).json({ message: 'Fees for this year already initialized' });
        }

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const payments = months.map(month => ({
            month: `${month}-${year}`,
            amount: monthlyAmount,
            paid: false
        }));

        feeRecord = await MonthlyFee.create({
            citizenId,
            year,
            payments
        });

        // Link to citizen (optional, but good for quick access)
        await Citizen.findByIdAndUpdate(citizenId, { monthlyFee: feeRecord._id });

        res.status(201).json(feeRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get fees for a citizen
// @route   GET /api/admin/fees/:citizenId
// @access  Private/Admin
const getFees = async (req, res) => {
    try {
        const fees = await MonthlyFee.find({ citizenId: req.params.citizenId }).sort({ year: -1 });
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update fee status (Paid/Unpaid)
// @route   PUT /api/admin/fees/status
// @access  Private/Admin
const updateFeeStatus = async (req, res) => {
    const { citizenId, monthYear, paid } = req.body; // monthYear format: "January-2026", paid: boolean

    try {
        const feeRecord = await MonthlyFee.findOne({
            citizenId,
            "payments.month": monthYear
        });

        if (feeRecord) {
            const paymentIndex = feeRecord.payments.findIndex(p => p.month === monthYear);

            if (paymentIndex !== -1) {
                // Toggle status
                feeRecord.payments[paymentIndex].paid = paid;

                // Set date if paid, remove date if unpaid
                if (paid) {
                    feeRecord.payments[paymentIndex].date = new Date();
                } else {
                    feeRecord.payments[paymentIndex].date = null;
                }

                await feeRecord.save();
                res.json({ message: `Payment for ${monthYear} marked as ${paid ? 'Paid' : 'Unpaid'}` });
            } else {
                res.status(404).json({ message: 'Month not found' });
            }
        } else {
            res.status(404).json({ message: 'Fee record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get fees for logged in citizen
// @route   GET /api/fees/my-fees
// @access  Private/Citizen
const getMyFees = async (req, res) => {
    try {
        const fees = await MonthlyFee.find({ citizenId: req.user._id }).sort({ year: -1 });
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all fees for a specific year (or all years if not specified)
// @route   GET /api/admin/fees/all
// @access  Private/Admin
const getAllFees = async (req, res) => {
    try {
        const { year } = req.query;
        const query = year ? { year } : {};

        const fees = await MonthlyFee.find(query)
            .populate('citizenId', 'name membershipId mobile')
            .sort({ 'citizenId.name': 1 }); // Sort by citizen name if possible, or handle in frontend

        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { initializeFees, getFees, updateFeeStatus, getMyFees, getAllFees };
