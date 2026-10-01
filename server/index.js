require('dotenv').config();
const express= require('express');
const mongoose= require('mongoose');
const cors=require('cors');


const app= express();

app.use(cors());
app.use(express.json());

app.get('/health',(req,res)=>{
    res.json({status:'ok'});

});

const authRoutes=require('./routes/auth');
app.use('/api/auth',authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.error('MongoDB connection error:',err));

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on PORT${PORT}`));

const productRoutes= require('./routes/products');
app.use('/api/products', productRoutes);

const CartRoutes= require('./routes/cart');
app.use('/api/cart',CartRoutes);

const orderRotues= require('./routes/orders');
app.use('/api/orders',orderRotues);