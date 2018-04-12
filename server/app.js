var express = require('express');
var bodyParser = require('body-parser');
var morgon = require('morgan');
var mongojs = require('mongojs');
var jwt = require('jsonwebtoken');
var app = express();
var db = mongojs('local', ['user', 'personalData']);
var port = process.env.PORT || 3000;


app.use(morgon('dev'));
app.use(bodyParser.json());
app.listen(port, function () {
  console.log('listening on port', port);
});

app.use(express.static('../dist'));
app.set('secretkey', 'topsecretkeyforencryption');
app.post('/createUser', function (req, res) {
  console.log('req.body', req.body);
  db.user.insert(req.body, function (err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      /* var token = jwt.sign({id: data._id}, app.get('secretkey'), {
         expiresIn: 86400
       });
       console.log('token', token);*/
      res.status(200).send({auth: true});
    }
  });
});
app.post('/login', function (req, res) {
  db.user.findOne({
    'username': req.body.username,
    'password': req.body.password
  }, {'password': 0}, function (err, data) {
    if (data) {
      var token = jwt.sign({id: data._id}, app.get('secretkey'), {
        expiresIn: 86400
      });
      res.status(200).send({auth: true, token: token});
    }
  });
});
app.post('/CreatePersonalInfo', function (req, res) {

  jwt.verify(req.body.token, app.get('secretkey'), function (err, decode) {
    if (err) {
      res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    } else {
      console.log('decode', decode);
      delete req.body.token;
      db.personalData.insert(req.body, function (err, data) {
        if (err) {
          res.status(400).send({auth: false, message: 'error inserting data'});
        } else {
          res.status(200).send({auth: true, message: 'succesfully inserting data'});
        }
      });
    }

  });

});
