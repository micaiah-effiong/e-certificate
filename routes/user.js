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
        data: result,
        count: result.length
      });
    })
    .catch(err=>{
      next(err);
    })
});

router.get('/profile', auth.authToken, (req, res)=>{
  res.send('Here is your profile');
});

router.get('/:id', auth.authToken, (req, res, next)=>{
  let id = parseInt(req.params.id);
  return db.user.findByPk(id)
    .then(user=>{
      if(!user) return next(errorResponse('user not found', 400));
      return res.json({
        success: true,
        data: user.toPublicJSON()
      });
    })
    .catch(err=>{
      next(err);
    });
});

router.put('/:id', auth.authToken, (req, res, next)=>{
  let id = parseInt(req.params.id);
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
  let id = parseInt(req.params.id);
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

module.exports = router;