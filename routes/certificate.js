const express = require('express');
const path = require('path');
const db = require('../db/db');
const { authToken } = require('../middlewares/authenticate')(db);
const pdf = require('../middlewares/html-pdf');
const mailer = require('../middlewares/mailer');
const stuDetails = require('../middlewares/user-details')(db);
const router = express.Router();

router.use(express.static(path.join(__dirname, '..', 'public')));

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '..', 'public', 'certificate.html'));
});

router.get('/get', authToken, stuDetails.completedCourse, pdf, mailer, function(req, res){
  res.send(req.userCertBuffer);
});

/*may not be used*/
router.get('/download', authToken, stuDetails.completedCourse, pdf, function(req, res){
  res.download(req.userCertBuffer);
});

router.get('/verify', stuDetails.verifyCert, function(req, res){
  res.json({
    success: true,
    data: {
      coures: req._completedCourse,
      user: req.user
    }
  });
});

module.exports = router;
