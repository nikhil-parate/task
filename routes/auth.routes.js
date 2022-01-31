const express = require('express');
const router = express.Router();
const service = require('../servies/auth.services');

router.post('/login',async (req,res)=>{
  await service.employeLogin(req.body,res);
});

router.post('/admin',async (req,res)=>{
    await service.adminLogin(req.body,res);
  });

  router.post('/register',async (req,res)=>{
    await service.registerCustomer(req.body,res);
  });

  router.post('/customer-login',async (req,res)=>{
    await service.customerLogin(req.body,res);
  });

  module.exports = router;
