const express = require('express');
const router = express.Router();
const httpStatus = require('../lib/httpStatus');
const jwtModule = require('../lib/jwtModule');
const verifyToken = require('../lib/verifyToken');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dev = require('../config/development')
const bcrypt = require('bcryptjs');
const config = require('../config/index');

router.post('/login', function (req, res) {
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
  const {email, password } = req.body
  if (!email || !password) {
    return res.status(httpStatus.BAD_REQUEST).send({ auth: false, error: 'Invalid parameters in request' });
  }
  User.findOne({ email }, function (error, user) {
    if (error) {
      const message = `Server error: ${error.message}`
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ auth: false, error: message });
    } else {
      if (user) {
        const { _id, email, password } = user
        const passwordMatch = bcrypt.compareSync(req.body.password, password);
        if (passwordMatch) {
          // sign and return a new token
          const payload = { id: _id }
          const signingOptions = {
            subject: email,
            audience:dev.jwtToken
          }
          const signedToken = jwtModule.sign(payload, signingOptions)
          let data={};
          data.Token=signedToken;
          data.User=user;
          return res.status(httpStatus.OK).send({ 
            success: true, data:data
          });
        } else {
          return res.status(httpStatus.UNAUTHORIZED).send({ success: false, error: message });
        }
      } else {
        const message = `User not found (email: ${req.body.email})`
        return res.status(httpStatus.NOT_FOUND).send({ success: false, error: message });
      }
    }
  });
});

router.post('/register', function (req, res) {
  const { email, name, password } = req.body
  if (!email || !name || !password) {
    return res.status(httpStatus.BAD_REQUEST).send({ registered: false, error: 'Invalid parameters in request' });
  }
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name: name,
    email: email,
    password: hashedPassword
  },
    function (error, user) {
      if (error) {
        const message = `Server error: ${error.message}`
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ registered: false, error: message });
      }
      // if user created, return a signed token
      const payload = { id: user._id }
      const options = { subject: email, audience: dev.jwtToken }
      const signedToken = jwtModule.sign(payload, options)
      res.status(httpStatus.OK).send({ registered: true, token: signedToken });
    });

});

// router.get('/me', function (req, res) {
//   console.log(req);
// });

router.get('/profile', verifyToken, function (req, res, next) {
  console.log('====================================');
  console.log(req.userId);
  console.log('====================================');
  User.findById(req.userId, { password: 0 }, function (error, user) {
    console.log('====================================');
    console.log(error);
    console.log("$$$$$$$$", user);
    console.log('====================================');
    ;
    if (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Server error: ${error.message}`);
    }
    if (user) {
      let data={};
          // data.Token=req.headers.authorization;
          data.User=user;
          return res.status(httpStatus.OK).send({ 
            success: true, data:user
          });
    } else {
      return res.status(httpStatus.NOT_FOUND).send(`User not found (_id: ${req.userId})`);
    }
  });
});

module.exports = router;
