const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/db');
const auth = require('../middlewares/authenticate')(db);
const pdf = require('../middlewares/html-pdf');
const stuDetails = require('../middlewares/user-details')(db);
const errorResponse = require('../handlers/error');
const courseRoute = require('../routes/course');
const router = express.Router();

router.get('/logout', (req, res, next)=>{
  console.log('login out')
  res.cookie('serialized', {
    isIn: false,
    'x-token': null
  });
  res.json({
    success: true,
    msg: 'User has logged out'
  });
});

router.post('/register', function(req, res, next){
  db.user.createRegKey(req)
    .then(function(){
      return req.body;
    })
    .then(info=>{
      return db.user.create(info);
    })
    .then(user=>{
      req.user = user;
      return user.generateToken();
    })
    .then(function(token){
      respondWithToken(res, token, req.user, {
        msg: 'New user has been created',
        statusCode: 201
      });
    })
    .catch(err=>next(err));
});

router.post('/login', function(req, res, next){
  db.user.findOne({
    where:{
      email: req.body.email
    }
  })
  .then(function(user){
    if (!user) return next(errorResponse('Invalid credentials', 400));
    req.user = user;
    return user;
  })
  .then(user=>{
    return bcrypt.compare(req.body.password, user.get('hash'))
  })
  .then(result=>{
    if (!result) return next(errorResponse('Invalid credentials', 400));
    return req.user.generateToken();    
  })
  .then(token=>{
    respondWithToken(res, token, req.user, {
      msg: 'User has logged in',
      statusCode: 200
    });
  })
  .catch(err=>{
    next(err);
  });
});

function respondWithToken(res, token, user, option){
  res
    .status(option.statusCode || 200)
    .cookie('serialized', {
      serialized: user.get('id'),
      isIn: true,
      'x-token': token
    })
    .json({
      success: true,
      msg: option.msg,
      data: user.toPublicJSON()
    });
}

module.exports = router;
