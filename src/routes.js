const express = require('express');
const multer = require('multer');
const multer_config = require('./config/multer')

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');




routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
// en vez de single puede recibir any para recibir varios archivos a la vez
routes.post(
  '/boxes/:id/files', 
  multer(multer_config).single('file'), 
  FileController.store
);
module.exports = routes;