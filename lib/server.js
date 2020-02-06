/* eslint-disable strict */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const logRequest = require('./logger.js');

app.use(express.json());// represint my data in json formaatedm part of globle middelwere
app.use(timestamp, logRequest);

///main Routs
let dbCate = [];
app.get('/categories',getPuplicCategories);
app.get('/api/v1/categories', getcategories);
app.get('/api/v1/categories/:id', getcategoriesid);
app.post('/api/v1/categories', postcategories);
app.put('/api/v1/categories/:id', putcategories);
app.delete('/api/v1/categories/:id', deletecategories);

let dbPro = [];
app.get('/api/v1/products', getproducts);
app.get('/api/v1/products/:id', getproductsid);
app.post('/api/v1/products', postproducts);
app.put('/api/v1/products/:id', putproducts);
app.delete('/api/v1/products/:id', deleteproducts);

///////////// error function
function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Generic Server Error!';
  res.json({ error: err});
}

function notFoundHandler(req, res, next) {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.json({ error: 'Not Found'});
}
///error routs
app.use('*',notFoundHandler);
app.use('/error', errorHandler);
app.use(errorHandler);

///
// app.use(timestamp);
// app.use(logger);

///////
function timestamp(req, res, next) {
  const convertToTime = Date(Date.now());
  req.requestTime = convertToTime.toString();
  next();
}

function getPuplicCategories(req, res) {
     let categoriesOutput = {
      name: req.query.name,
      displayName: req.query.displayName,
    };
    res.status(200).json(categoriesOutput);
  }

/////////categoriesfunctions
function getcategories(req, res, next) {
  let count = dbCate.length;
  let results = dbCate;
  res.json({ count, results});
}

function getcategoriesid(req, res, next) {
  let id = req.params.id;
  let record = dbCate.filter((record) =>
    record.id === parseInt(id));
  res.json(record);
}

function postcategories(req, res, next) {
  let { name} = req.body;
  let record = { name };
  record.id = dbCate.length + 1;
  dbCate.push(record);
  res.status(201).json(record);
}

function putcategories(req, res, next) {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  dbCate = dbCate.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
}

function deletecategories(req, res, next) {
  let id = req.params.id;
  dbCate = dbCate.filter((record) => record.id !== parseInt(id));
  res.json({ msg: 'deleted done' });
}

///////// product functions
function getproducts(req, res, next) {
  let count = dbPro.length;
  let results = dbPro;
  res.json({ count, results});
}

function getproductsid(req, res, next) {
  let id = req.params.id;
  let record = dbPro.filter((record) =>
    record.id === parseInt(id));
  res.json(record);
}

function postproducts(req, res, next) {
  let { name} = req.body;
  let record = { name };
  record.id = dbPro.length + 1;
  dbPro.push(record);
  res.status(201).json(record);
}

function putproducts(req, res, next) {
  let idToUpdate = req.params.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  dbPro = dbPro.map((record) => (record.id === parseInt(idToUpdate)) ? updatedRecord : record);
  res.json(updatedRecord);
}

function deleteproducts(req, res, next) {
  let id = req.params.id;
  dbPro = dbPro.filter((record) => record.id !== parseInt(id));
  res.json({ msg: 'deleted done' });
}



module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  },
};
