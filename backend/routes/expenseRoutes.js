const express = require('express');
const router = express.Router();

const {addExpense,getAllExpenses,deleteExpense,downloadExpenseExcel} = require('../controllers/expenseController');
const {protect} = require('../middleware/authMiddleware');

router.post('/add',protect,addExpense);
router.get('/get',protect,getAllExpenses);
router.get('/downloadexcel',protect,downloadExpenseExcel);
router.delete('/:id',protect,deleteExpense);

module.exports = router;