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

router.use('/course', courseRoute);

router.get('/', auth.authToken, (req, res, next)=>{
  db.user.findAll()
    .then(users=>{
      if(!users) return res.json({
        success: true,
        data: users
      });
      let result = users.map(user=>{
        return user.toPublicJSON();
      });
      return res.json({
        success: true,
        data: result
      });
    })
    .catch(err=>{
      next(err);
    })
});

router.get('/profile', auth.authToken, (req, res)=>{
  res.send('Here is your profile');
});

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

router.post('/', function(req, res, next){
  db.user.createRegKey(req)
    .then(function(){
      return req.body;
    })
    .then(info=>{
      return db.user.create(info);
    })
    .then(function(user){
      res
        .status(201)
        .json({
          success: true,
          data: user.toPublicJSON()
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
    if (!result) {
      return next(errorResponse('Invalid credentials', 400));
    }
    return req.user.generateToken();    
  })
  .then(token=>{
    res.cookie('serialized', {
      serialized: req.user.get('id'),
      isIn: true,
      'x-token': token
    }).json({
      success: true,
      msg: 'User has logged in',
      data: req.user.toPublicJSON()
    });
  })
  .catch(err=>{
    next(err);
  });
});

router.put('/:id', auth.authToken, (req, res, next)=>{
  let id = +(req.params.id);
  if (!(req.cookies.serialized.serialized == id)) {
    return next(errorResponse('Action not allowed', 401));
  }else{
    db.user.findOne({
      where: { id }
    })
      .then(user=>{
        if(!user) return next(errorResponse('No such user', 400));
        return user;
      })
      .then(user=>{
        return user.update(req.body);
      })
      .then(result=>{
        res.json({
          success: true,
          msg: 'User has been updated',
          data: result.toPublicJSON()
        });
      })
      .catch(err=>{
        next(err);
      });
  }
});

router.delete('/:id', auth.authToken, (req, res, next)=>{
  let id = +(req.params.id);
  if (!(req.cookies.serialized.serialized == id)) {
    return next(errorResponse('Action not allowed', 401));
  }else{
    return db.user.destroy({where: {id: id}})
      .then(user=>{
        if(!user) return next(errorResponse('user not found', 400));
        return res.json({
          success: true,
          data: user
        });
      })
      .catch(err=>{
        next(err);
      });
  }
});

router.get('/:id', auth.authToken, (req, res, next)=>{
  let id = +(req.params.id);
  return db.user.findByPk(id)
    .then(user=>{
      if(!user) return next(errorResponse('user not found', 400));
      return res.json({
        success: true,
        data: user
      });
    })
    .catch(err=>{
      next(err);
    });
});

module.exports = router;