const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
// require('dotenv').config();


const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box); 
  })
});


const db_pass = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const db_cloud_name = process.env.DB_CLOUD_NAME


mongoose.connect(`mongodb+srv://omnistack:omnistack@cluster0-r6scv.mongodb.net/omnistack?retryWrites=true`, {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;
  return next();
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);