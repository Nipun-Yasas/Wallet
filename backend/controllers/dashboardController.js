const Income = require('../models/Income');
const Expense = require('../models/Expense');
const {isValidObjectId,Types} = require('mongoose');


const getDashboardData = async (req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])


        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])
        
        const last30DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 30*24*60*60*1000)},
        }).sort({ date: -1 })

        const incomeLast30Days = last30DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        )

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30*24*60*60*1000)},
        }).sort({ date: -1 })

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        )

        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"income",
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"expense",
                })
            ), 
        ].sort((a,b)=>(b.date-a.date))

        res.json({
            totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total|| 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses:{
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last30DaysIncome:{
                total:incomeLast30Days,
                transactions: last30DaysIncomeTransactions,
            },
            recentTransactions:lastTransactions
        });
        
    }
    catch(error){
        res.status(500).json({message:"Server Error",error})
    }
}

module.exports = { getDashboardData };