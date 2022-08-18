const express = require('express');
const router = express.Router();
const helper = require('../helper');
const auth = require('../services/auth');
const multer = require("multer");
const crypto = require("crypto");
const mime = require('mime');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
    });
  }
});
const upload = multer({ storage: storage });

router.post('/register', async (req, res, next) => {
  try {
    let result = await auth.register(req.body);
    if (result != 'Error in creating user') {
      const token = helper.generateAccessToken({ employer_id: result });
      res.json({
        error: false,
        errorMessage: "",
        data: {
          token
        }
      });
    }else{
      res.json({
        error: true,
        errorMessage: "Email has been used!",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Error while register `, err.message);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    let result = await auth.login(req.body);
    if (result != 'Not Found') {
      const token = helper.generateAccessToken({ employer_id: result });
      res.json({
        error: false,
        errorMessage: "",
        data: {
          token
        }
      });
    }else{
      res.json({
        error: true,
        errorMessage: "Incorrect Email Password Pair",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Error while login `, err.message);
    next(err);
  }
});

router.get('/user', helper.authenticateToken, async (req, res, next) => {
  try {
    let result = await auth.user(req.user);
    if (result.length > 0) {
      res.json({
        error: false,
        errorMessage: "",
        data: {
          result: result[0]
        }
      });
    }else{
      res.json({
        error: true,
        errorMessage: "Error while retrieve user data",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Error while retrieve user data`, err.message);
  }
});


/* GET programming languages. */
router.post('/update/user', helper.authenticateToken, async function(req, res, next) {
  try {
    let result = await auth.updateUser(req.body, req.user)
    if (result != 'Update Fail') {
      res.json({
        error: false,
        errorMessage: "",
        data: {
          message: "Update User Profile Successful"
        }
      });
    }else{
      res.json({
        error: true,
        errorMessage: "Old Password Incorrect",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

/* GET programming languages. */
router.post('/update/employer', [helper.authenticateToken, upload.single("logo")], async function(req, res, next) {
  try {
    let result = await auth.updateEmployer(req.body, req.user, req.file)
    if (result != 'Update Fail') {
      res.json({
        error: false,
        errorMessage: "",
        data: {
          message: "Update Company Profile Successful"
        }
      });
    }else{
      res.json({
        error: true,
        errorMessage: "Unable To Update Company Profile",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

module.exports = router;