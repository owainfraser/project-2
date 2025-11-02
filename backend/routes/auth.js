const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req,res)=>{
  const { username, password } = req.body;
  if(!username || !password) return res.status(400).json({msg:'username and password required'});
  const exists = await User.findOne({username});
  if(exists) return res.status(400).json({msg:'username taken'});
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const user = new User({username,passwordHash});
  await user.save();
  res.status(201).json({msg:'user created'});
});

router.post('/login', async (req,res)=>{
  const { username, password } = req.body;
  const user = await User.findOne({username});
  if(!user) return res.status(400).json({msg:'invalid credentials'});
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(400).json({msg:'invalid credentials'});
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'8h'});
  res.json({token, user:{id:user._id, username:user.username, role:user.role}});
});

module.exports = router;
