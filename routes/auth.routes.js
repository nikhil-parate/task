const express = require('express');
const router = express.Router();
const service = require('../servies/auth.services');

route.post('/login',async (req,res)=>{
  await service.employeLogin(req.body,res);
});

route.post('/admin',async (req,res)=>{
    await service.adminLogin(req.body,res);
  });

  route.post('/register',async (req,res)=>{
    await service.registerCustomer(req.body,res);
  });

  route.post('/customer-login',async (req,res)=>{
    await service.customerLogin(req.body,res);
  });

  module.exports = router;
