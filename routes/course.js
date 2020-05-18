const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/db');
const auth = require('../middlewares/authenticate')(db);
const pdf = require('../middlewares/html-pdf');
const stuDetails = require('../middlewares/user-details')(db);
const errorResponse = require('../handlers/error');
const router = express.Router();

router.post('/', auth.authToken, auth.authEmail, function(req, res){
  db.course.create(req.body)
  .then(function(course){
    req.user.addCourse(course).then(function(){
      return course.reload();
    }).then(function(course){
      res.json(course.toJSON());
    }, function(e){
      res.status(500).send(e||null);
    });
  }, function(e){
    res.status(500).send(e||null);
  });
});

module.exports = router;