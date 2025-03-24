const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth',authRoutes);

app.use('/uploads',express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})

