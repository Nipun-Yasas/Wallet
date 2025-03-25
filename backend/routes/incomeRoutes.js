const express = require('express');
const router = express.Router();

const {addIncome,getAllIncomes,deleteIncome,downloadIncomeExcel} = require('../controllers/incomeController');
const {protect} = require('../middleware/authMiddleware');

router.post('/add',protect,addIncome);
router.get('/get',protect,getAllIncomes);
router.get('/downloadexcel',protect,downloadIncomeExcel);
router.delete('/:id',protect,deleteIncome);

module.exports = router;