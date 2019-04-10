const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => { //cb == callback, en el null recibe una funcion
      cb(null, path.resolve(__dirname, '..', '..', 'tmp')) //donde puede tratar algun err
    },
    filename:  (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`
        cb(null, file.key);
      })
    }
  })
}