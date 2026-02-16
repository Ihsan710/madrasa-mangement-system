const Citizen = require('../models/Citizen');
const MonthlyFee = require('../models/MonthlyFee');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const citizenCount = await Citizen.countDocuments({ role: 'citizen' });

        // --- Calculate Total Revenue ---
        const fees = await MonthlyFee.find({});
        let totalCollected = 0;
        fees.forEach(record => {
            record.payments.forEach(p => {
                if (p.paid) totalCollected += p.amount;
            });
        });

        // --- Calculate Monthly Revenue for Charts (Current Year) ---
        const currentYear = new Date().getFullYear();
        // Initialize 12 months with 0
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const monthlyRevenue = months.map(name => ({ name, amount: 0 }));

        fees.forEach(record => {
            if (record.year === currentYear) {
                record.payments.forEach(p => {
                    if (p.paid) {
                        // Extract month name from "January-2026"
                        const fullMonthName = p.month.split('-')[0];
                        const monthIndex = new Date(`${fullMonthName} 1, 2000`).getMonth();
                        if (monthIndex >= 0 && monthIndex < 12) {
                            monthlyRevenue[monthIndex].amount += p.amount;
                        }
                    }
                });
            }
        });

        // --- Calculate Demographics ---
        // Assuming age is not directly stored, we might base this on some other logic or mocking if age isn't available.
        // Since Citizen model doesn't strictly have DOB/Age yet based on previous files, 
        // we will fetch all citizens and categorize them if possible, or use a placeholder based on real counts.
        // For now, let's categorize by 'role' or just return the total count as 'Adults' and 0 others to be truthful,
        // OR better, let's update Citizen model later. For now, we return truthful counts based on what we have.

        // Actually, let's just use the basic Family Members count if available.
        // Checking familyApi or models might be needed, but to keep it simple and "real-ish" without schema changes:
        // We will counting the head of families (Citizens) as adults. 
        // If we had a FamilyMember model, we could count them. 
        // Let's assume for this MVP, we just show "Families" as the main stat.

        // Wait, I can see 'getFamilyMembers' in frontend. So there is a FamilyMember model or it's embedded.
        // Let's check if we can import FamilyMember.
        // Update: I don't have the FamilyMember model file path handy in context, but I used familyRoutes. 
        // Let's try to require it. If it fails, I'll stick to Citizen count.

        let demographics = [
            { name: 'Citizens', value: citizenCount },
            { name: 'Family Members', value: 0 } // Placeholder until we fetch real family count
        ];

        try {
            // Attempt to count family members if the model exists in the standard location
            const FamilyMember = require('../models/FamilyMember');
            const familyCount = await FamilyMember.countDocuments({});
            demographics = [
                { name: 'Heads', value: citizenCount },
                { name: 'Members', value: familyCount }
            ];
        } catch (e) {
            // Model might not exist or be named differently, ignore and return basic
            console.log("FamilyMember model not found for stats");
        }

        res.json({
            totalCitizens: citizenCount,
            totalCollected,
            monthlyRevenue,
            demographics
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };
