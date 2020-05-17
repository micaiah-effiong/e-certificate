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

router.get('/', auth.authToken, (req, res)=>{
  db.user.findAll()
    .then(users=>{
      if(!users) return res.status(404).json({
        success: false,
        msg: 'users not found'
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
      res.status(500).json({
        success: false,
        msg: 'An error occured while fetching users',
        err: err
      });
    })
});

router.get('/profile', auth.authToken, (req, res)=>{
  res.send('req.cookies');
});

router.get('/logout', (req, res)=>{
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


router.post('/', function(req, res){
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
    .then(result=>{
      return {user, result}
    });
  })
  .then(info=>{
    if (info.result) {
      let {user} = info;
      return user.generateToken()
      .then(token=>{
        return {
          user,
          token
        }
      })
    }
    return new Error("Invalid credentials");
  })
  .then(userToken=>{
    res.cookie('serialized', {
      serialized: userToken.user.get('id'),
      isIn: true,
      'x-token': userToken.token
    }).json({
      success: true,
      msg: 'User has logged in',
      data: userToken.user.toPublicJSON()
    });
  })
  .catch(e=>{
    res.status(400).json({
      success: false,
      err: e,
      msg: "Could not login user due to Invalid credentials"
    });
  });
});

router.put('/:id', auth.authToken, (req, res)=>{
  db.user.findOne({where:{id: req.param.id}})
    .then(user=>{
      if(!user) return res.status(400).json({
        status: false,
        msg: 'no valid user with such ID'
      });
      return user;
    })
    .then(user=>{
      db.user.update(req.body)
        .then(result=>{
          res.json({
            success: true,
            msg: 'User has been updated',
            data: result.toPublicJSON()
          })
        });
    })
    .catch(err=>{
      res
        .status(500)
        .json({
          success: false,
          msg: 'Error occured while trying to update user details',
          err: err
        })
    })
});

router.delete('/:id', auth.authToken, (req, res)=>{
  
});

router.get('/:id', auth.authToken, (req, res)=>{
  let id = +(req.params.id);
  return db.user.findByPk(id)
    .then(user=>{
      if(!user) return res.status(404).json({
        success: false,
        msg: 'user not found'
      });
      return res.json({
        success: true,
        data: user
      });
    })
    .catch(err=>{
      res.status(400).json({
        success: false,
        msg: 'An error occured while fetching user',
        err: err
      });
    })
});

module.exports = router;