const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./models/productModels');
const products = require('./data/products.json');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

mongoose.connect(process.env.DB_URL)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products imported successfully!');
    process.exit();
  })
  .catch(err => {
    console.log('Error:', err);
    process.exit();
  });