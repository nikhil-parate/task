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
  
  router.post('/policy',async(req,res)=>{
    await service.policyUpdate(req.body,res);
  });

 router.post('/newpolicy',async(req,res)=>{
    await service.newpolicyUpdate(req.body,res);
  });

 router.get('/data',async(req,res)=>{
    const post = await service.getdata(req.body,res);
   res.send(post);
  });
 router.get('/dataemploye',async(req,res)=>{
    post = await service.getdataemploye(req.body,res);
    res.send(post);
  });
router.get('/newdata',async(req,res)=>{
    post = await service.getnewdata(req.body,res);
    res.send(post);
  });
  module.exports = router;
