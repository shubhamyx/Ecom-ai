const express =require('express');
const Product =require('../models/Product');
const { protect,adminOnly} = require('../middleware/auth');

const router = express.Router();

//public
router.get('/',async(req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const product = await Product.findById();
        res.json(product);
    }catch(err){
        res.status(500).json({message:err.message});

    }
});

//admin only

router.post('/',protect,adminOnly,async(req,res)=>{
    try{
        const product= await Product.create(req.body);
        res.status(201).json(product);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.put('/:id',protect,adminOnly,async(req,res)=>{
    try{
        const product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

router.delete('/:id',protect,adminOnly,async(req,res)=>{
    try{
        const product= await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({message:'Product not Found'});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports= router;