const express = require('express');
const router = express.Router();
const helper = require('../helper');
const dashboard = require('../services/dashboard');

router.get('/company', helper.authenticateToken, async (req, res) => {
  try {
    let result = await dashboard.getCompany(req.user);
    if (result != 'Get Company Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Get Company Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Get Company Error`, err.message);
  }
});

router.get('/info', helper.authenticateToken, async (req, res) => {
  try {
    let result = await dashboard.getInfo(req.user);
    if (result != 'Get Dashboard Info Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Get Dashboard Info Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Get Dashboard Info Error`, err.message);
  }
});

router.post('/expireList', helper.authenticateToken, async (req, res) => {
  try {
    let result = await dashboard.getExpireList(req.user, req.body);
    if (result != 'Get Expire List Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Get Expire List Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Get Expire List Error`, err.message);
  }
});


module.exports = router;
