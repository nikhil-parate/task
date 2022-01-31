const mongo = require('../mongo');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const regschema = joi.object ({
    name: joi.string().required(),
    email: joi.string().required().email(),
    phone: joi.number().integer().min(10).required(),
    password: joi.string().alphanum().min(6).required()
});
const logschema = joi.object({
    email: joi.string().required(),
    password: joi.string().alphanum().min(6).required()
});
const policyschema = joi.object({
    email: joi.string().required().email(),
     policy1: joi.string().required(),
    policy2: joi.string().required(),
    policy3: joi.string().required(),
});
const service = {
    async registerCustomer(data,res) {
        const {error} = regschema.validate(data);
        if(error) {
            return res.send({error: error.details[0].message});
        }
       const user = await this.findCustomerEmail(data.email);
       if(user) {return res.status(400).send({error:"user already exist"})}
      
       const salt = await bcrypt.genSalt(10);
       data.password = await bcrypt.hash(data.password, salt);
       console.log(mongo.db.collection('customer').find())
       await mongo.db.collection('customer').insertOne(data);
       res.send({message:"successfully registered"})
    },

    async employeLogin(data,res) {
       const {error} = logschema.validate(data);
       if(error) {
           return res.send({error: error.details[0].message});
       }
       const user = await this.findUserEmail(data.email);
       if(!user) {return res.status(400).send({error:"username or password is incorrect, email"})}
       const valid = await bcrypt.compare(data.password, user.password);
       if(!valid) {
           return res.status(400).send({error:"username or password is incorrect.pass"});
       }
       const token = jwt.sign({ userId: user._id}, process.env.TOKEN_PASS, {expiresIn: '8h'});
        res.send({ token });
    }, 

    async adminLogin(data,res) {
        const {error} = logschema.validate(data);
        if(error) {
            return res.send({error: error.details[0].message});
        }
        const user = await this.findAdminEmail(data.email);
        if(!user) {return res.status(400).send({error:"username or password is incorrect, email"})}
        const token = jwt.sign({ userId: user._id}, process.env.TOKEN_PASS, {expiresIn: '8h'});
        console.log(token);
         res.send({ token });
     }, 

     async customerLogin(data,res) {
        const {error} = logschema.validate(data);
        if(error) {
            return res.send({error: error.details[0].message});
        }
        const user = await this.findCustomerEmail(data.email);
        if(!user) {return res.status(400).send({error:"username or password is incorrect, email"})}
        const token = jwt.sign({ userId: user._id}, process.env.TOKEN_PASS, {expiresIn: '8h'});
        console.log(token);
         res.send({ token });
     }, 
    
     async policyUpdate(data,res) {
         const {error} = policyschema.validate(data);
        if(error) {
            return res.send({error: error.details[0].message});
        }
        const user = await this.findPolicyEmail(data.email);
       if(user) {return res.status(400).send({error:"user already accepted policy or email id is duplicate"})}
        await mongo.db.collection('policy').insertOne(data);
        res.send({message:"policy updated"});
     },
     
    async getdata() {
         const data = await mongo.db.collection('policy').find();
         res.send(data);
     },
    
    findUserEmail(email) {
     return mongo.db.collection("employee").findOne({email});
    },

    findAdminEmail(email) {
        return mongo.db.collection("admin").findOne({email});
    },

    findCustomerEmail(email) {
        return mongo.db.collection("customer").findOne({email});
    },
    
    findPolicyEmail(email) {
        return mongo.db.collection("policy").findOne({email});
    },
   }
   
   module.exports = service;
