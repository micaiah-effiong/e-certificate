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

router.use(auth.authToken)

router.get('/', (req, res, next)=>{
  if(!req.user) return next(errorResponse('Invalid Credentials', 401));
  req
    .user
    .getCourses()
    .then((userCourses)=>{
      let result = [];
      if (userCourses && userCourses.length > 0) {
        result = userCourses.map(course=>{
          return course.toJSON();
        });
      }
      res
        .json({
          success: true,
          data: result
        });
    })
    .catch(err=>next(err));
});

router.post('/', (req, res, next)=>{
  if(!req.user) return next(errorResponse('Invalid Credentials', 401));

  req.user.getCourses()
    .then(function(userCourses){
      let result = userCourses.filter(course=>{
        if(course.courseName == req.body.courseName) return course;
      });

      // checking  for already registered course
      if(result.length > 0) return next(errorResponse('Course already registered', 400));
      req.body.courseName = db.course.getCourseNameFromCourseCode(req.body.courseCode);
      db.course.create(req.body)
        .then(course=>course)
        .then(course=>{
          return req.user.addCourse(course)
          .then(function(){
            return course.reload();
          })
        })
        .then(function(course){
          res.json({
            success: true,
            data: course.toJSON()
          });
        })
        .catch(err=>next(err));
    });    
});

module.exports = router;