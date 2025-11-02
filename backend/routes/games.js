const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const { authMiddleware, adminOnly } = require('../middleware/auth');

router.get('/', authMiddleware, async (req,res)=>{
  res.json(await Game.find());
});

router.get('/:id', authMiddleware, async (req,res)=>{
  const g = await Game.findById(req.params.id);
  if(!g) return res.status(404).json({msg:'not found'});
  res.json(g);
});

router.post('/', authMiddleware, adminOnly, async (req,res)=>{
  const g = new Game(req.body);
  await g.save();
  res.status(201).json(g);
});

router.put('/:id', authMiddleware, adminOnly, async (req,res)=>{
  const g = await Game.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(g);
});

router.delete('/:id', authMiddleware, adminOnly, async (req,res)=>{
  await Game.findByIdAndDelete(req.params.id);
  res.json({msg:'deleted'});
});

module.exports = router;
