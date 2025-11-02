const express = require('express');
const router = express.Router();
const Copy = require('../models/Copy');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/', authMiddleware, async (req,res)=>{
  res.json(await Copy.find().populate('game'));
});

router.get('/game/:gameId', authMiddleware, async (req,res)=>{
  res.json(await Copy.find({game:req.params.gameId}).populate('game'));
});

router.post('/', authMiddleware, adminOnly, async (req,res)=>{
  const c = new Copy(req.body);
  await c.save();
  res.status(201).json(c);
});

router.put('/:id', authMiddleware, adminOnly, async (req,res)=>{
  res.json(await Copy.findByIdAndUpdate(req.params.id, req.body, {new:true}));
});

router.delete('/:id', authMiddleware, adminOnly, async (req,res)=>{
  await Copy.findByIdAndDelete(req.params.id);
  res.json({msg:'deleted'});
});

module.exports = router;
