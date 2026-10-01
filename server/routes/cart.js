const express = require('express');
const Cart= require('../models/Cart');
const {protect}= require('../middleware/auth');

const router= express.Router();

//GET current user's cart 
router.get('/',protect,async(req,res)=>{
    try{
        let cart= await Cart.findOne({user:req.user.id}).populate('items.product');
        if(!cart)cart= await Cart.create({user:req.user.id,items:[]});
        res.json(cart);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

//add item 
router.post('/add',protect,async(req,res)=>{
    try{
        const {productId,qauntity}= req.body;
        let cart= await Cart.findOne({user:req.user.id});
        if(!cart)cart= await Cart.create({user:req.user.id,items:[]});

        const existingItem= cart.items.find(item=>item.product.toString()===productId);
        if(existingItem){
            existingItem.qauntity+=qauntity || 1;            
        }else{
            cart.items.push({product:productId,qauntity:qauntity||1});
        }
        await cart.save();
        res.json(cart);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

// remove item
router.delete('/remove/:productId',protect,async(req,res)=>{
    try{
        const cart=await Cart.findOne({user:req.user.id});
        if(!cart) return res.status(404).json({message:'Cart not found'});
        
        cart.items= cart.items.filter(item=>item.product.toString()!==req.params.productId);
        await cart.save();
        res.json(cart);
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;