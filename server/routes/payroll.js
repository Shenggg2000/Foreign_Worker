const express = require('express');
const router = express.Router();
const helper = require('../helper');
const payroll = require('../services/payroll');

router.get('/getemployees', helper.authenticateToken, async (req, res) => {
  try {
    let result = await payroll.getEmployees(req.user);
    if (result != 'Get Employee Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Get Employee Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Get Employee Error`, err.message);
  }
});

router.get('/getadditions', async (req, res) => {
  try {
    let result = await payroll.getAdditions();
    if (result != 'Get Additions Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Get Additions Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Get Additions Error`, err.message);
  }
});

router.get('/getdeductions', async (req, res) => {
  try {
    let result = await payroll.getDeductions();
    if (result != 'Get Deductions Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Get Deductions Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Get Deductions Error`, err.message);
  }
});

router.post('/run', helper.authenticateToken, async (req, res) => {
  try {
    let result = await payroll.run(req.user, req.body);
    if (result != 'Run Payroll Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Run Payroll Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Run Payroll Error`, err.message);
  }
});

router.get('/history', helper.authenticateToken, async (req, res) => {
  try {
    let result = await payroll.allHistory(req.user);
    if (result != 'Get Historys Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Get Historys Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Get Historys Error`, err.message);
  }
});

router.get('/history/:id', async (req, res) => {
  try {
    let result = await payroll.history(req.params.id);
    if (result != 'Get Specific Historys Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Get Specific Historys Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Get Specific Historys Error`, err.message);
  }
});

router.get('/runable', helper.authenticateToken, async (req, res) => {
  try {
    let result = await payroll.runable(req.user);
    if (result != 'Get Runable Error') {
      res.json({
        error: false,
        errorMessage: "",
        data: result
      });
    } else {
      res.json({
        error: true,
        errorMessage: "Get Runable Error",
        data: {}
      });
    }
  } catch (err) {
    console.error(`Get Runable Error`, err.message);
  }
});

module.exports = router;
