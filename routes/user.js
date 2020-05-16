const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/db');
const auth = require('../middlewares/authenticate')(db);
const pdf = require('../middlewares/html-pdf');
const stuDetails = require('../middlewares/user-details')(db);
const router = express.Router();

// POST /create

/*
  Authenticate user
*/

// GET /:id
// PUT /edit/:id
// DELETE /:id

router.post('/register', function(req, res){
  db.user.createRegKey(req).then(function(){
    db.user.create(req.body).then(function(user){
      res.status(201).json(user.toPublicJSON());
    }, function(e){
      res.status(500).send(e);
    });
  }, function(e){
    res.status(500).send(e);
  });
});

router.post('/login', function(req, res){
  db.user.findOne({
    where:{
      email: req.body.email
    }
  })
  .then(function(user){
    if (!user) return new Error("Invalid credentials");
    return user;
  })
  .then(user=>{
    return bcrypt.compare(req.body.password, user.get('hash'))
    .then(result=>user)
  })
  .then(user=>{
    return user.generateToken()
    .then(token=>{
      return {
        user,
        token
      }
    })
  })
  .then(userToken=>{
    res.cookie('serialized', {
      serialized: userToken.user.get('id'),
      isIn: true,
      'x-token': userToken.token
    }).json(userToken.user.toPublicJSON());
  })
  .catch(e=>{
    res.status(500).send(e);
  });
});

router.get('/profile', auth.authToken, (req, res)=>{
  res.send('req.cookies');
});

router.get('/logout', (req, res)=>{
  res.clearCookie('serialized');
  res.send('Thanks for getting out');
});

module.exports = router;