'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const logRequest = require('./logger.js');

app.use(express.json());
app.use(logRequest);

///error routs
app.use('*', notFoundHandler);
app.use(errorHandler);

///////////// error function
function errorHandler(err, req, res, next) {
    res.status(500);
    res.statusMessage = 'Generic Server Error!';
    res.json({ error: err });
}

function notFoundHandler(req, res, next) {
    res.status(404);
    res.statusMessage = 'Not Found!';
    res.json({ error: 'Not Found' });
}

/// 
app.use(timestamp);
// app.use(logger);

///////
function timestamp(req, res, next) {
    req.requestTime = Data.now();
    next();
}

// function logger(req, res, next) {
//     console.log(req.requestTime)
//     console.log(req.method)
//     console.log(req.path)
//     next();
// }

///main Routs
app.get('/api/v1/categories', getcategories);
app.get('/api/v1/categories/:id', getcategoriesid);
app.post('/api/v1/categories/:id', postcategories);
app.put('/api/v1/categories', putcategories);
app.delete('/api/v1/categories/:id', deletecategories);

app.get('/api/v1/products', getproducts);
app.get('/api/v1/products/:id', getproductsid);
app.post('/api/v1/products/:id', postproducts);
app.put('/api/v1/products', putproducts);
app.delete('/api/v1/products/:id', deleteproducts);


/////////categoriesfunctions
function getcategories(req, res, next) {
    let count = db.length;
    let results = db;
    res.json({ count, results });
}

function getcategoriesid(req, res, next) {
    let id = req.params.id;
    let record = db.filter((record) =>
        record.id === parseInt(id));
    res.json(record);
}

function postcategories(req, res, next) {
    let { name } = req.body;
    let record = { name };
    record.id = db.length + 1;
    db.push(record);
    res, status(201).json(record);
}

function putcategories(req, res, next) {
    let idToUpdate = req.params.id;
    let { name, id } = req.body;
    let updateedRecord = { name, id };
    db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
    res.json(updatedRecord);
}

function deletecategories(req, res, next) {
    let id = req.params.id;
    db = db.filter((record) => record.id !== parseInt(id));
    res.json({ msg: 'deleted done' })
}

///////// product functions
function getproducts(req, res, next) {
    let count = db.length;
    let results = db;
    res.json({ count, results });
}

function getproductsid(req, res, next) {
    let id = req.params.id;
    let record = db.filter((record) =>
        record.id === parseInt(id));
    res.json(record);
}

function postproducts(req, res, next) {
    let { name } = req.body;
    let record = { name };
    record.id = db.length + 1;
    db.push(record);
    res, status(201).json(record);
}

function putproducts(req, res, next) {
    let idToUpdate = req.params.id;
    let { name, id } = req.body;
    let updateedRecord = { name, id };
    db = db.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
    res.json(updatedRecord);
}

function deleteproducts(req, res, next) {
    let id = req.params.id;
    db = db.filter((record) => record.id !== parseInt(id));
    res.json({ msg: 'deleted done' })
}



module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`listening on ${PORT}`));
    }
}
