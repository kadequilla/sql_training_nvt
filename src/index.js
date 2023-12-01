const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const db = require('./queries');
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

//user
app.get('/users', db.getUsers);
app.post('/create-users', db.createUser);
app.put('/update-users/:id', db.updateUser);
app.delete('/delete-users/:id', db.deleteUser);

//module
app.get('/modules', db.getModule);
app.post('/create-module', db.createModule);
app.put('/update-module/:id', db.updateModule);
app.delete('/delete-module/:id', db.deleteModule);

//product group
app.get('/product-groups', db.getProductGroup);
app.post('/create-product-groups', db.createProductGroup);
app.put('/update-product-group/:id', db.updateProductGroup);
app.delete('/delete-product-group/:id', db.deleteProductGroup);

//product
app.get('/products', db.getProduct);
app.post('/create-product', db.createProduct);
app.put('/update-product/:id', db.updateProduct);
app.delete('/delete-product/:id', db.deleteProduct);


//product price
app.get('/product-prices', db.getProductPrice);
app.get('/product-prices-history', db.getProductPriceHistory);
app.post('/create-product-price', db.createProductPrice);
app.put('/update-product-price/:id', db.updateProductPrice);
app.delete('/delete-product-price/:id', db.deleteProductPrice);

//transaction
app.post('/create-transaction', db.createTransaction);
app.get('/gr', db.getGrList);
app.get('/sales', db.getSales);

//login
app.post('/login', db.login);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});