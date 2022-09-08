const express = require('express')
const app = express();
const mongoose = require('mongoose');
const register = require('./route/route')
app.use(express.json());
app.set('layout', './views/layout.ejs')


const bodyParser = require('body-parser');
const jsonwebtoken = require("jsonwebtoken");
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect('mongodb://localhost:27012/final', {useNewUrlParser: true,});
app.set('view engine', 'ejs');
app.use('/',register)
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

app.listen(3012, function(err){

    if (err) {err.message}
    console.log("connected successfully");
})


