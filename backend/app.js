const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')});


const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();

app.use('/images', express.static(path.join(__dirname, '../templates/images')));
app.use(express.json());
app.use(cors({
    origin: '*'  
}));
app.use('/api/v1/products', products);
app.use('/api/v1/orders', orders);

app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT} in`);
});