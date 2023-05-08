require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
require('express-async-errors');
const cors = require('./middlewares/cors');

const StockRouter = require('./routers/stock.router');
const FloorRouter = require('./routers/floor.router');
const ProductRouter = require('./routers/product.router');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// use static file
app.use('/', express.static(path.join(__dirname, '/public')));

// use cors
app.use(cors);

app.use('/api', StockRouter);
app.use('/api', FloorRouter);
app.use('/api', ProductRouter);

app.get('/', (req, res) => {
    res.json({ username: 'tranquoctrung' });
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
