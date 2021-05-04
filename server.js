const app = require('express')();
const express = require('express');
const port = 2500;
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Room = require('./models/room');
const router = express.Router();
const http = require('http').Server(app);
const io = require('socket.io')(http);


mongoose.connect('mongodb://localhost/question-room',{useNewUrlParser: true, useUnifiedTopology : true})
  .then(() => console.log('MongoDB database connected'))
  .catch((err)=> console.log(err));


app.use('/static', express.static('static'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));

app.use('/', require('./routes/index-routes'))

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => console.log(`Example app listening on port ${port}!`))