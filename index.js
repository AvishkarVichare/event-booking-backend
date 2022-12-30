require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors')
const eventRouter = require('./routes/event')
const userRouter = require('./routes/user')
// const paymentRouter = require('./routes/payment')
const paymentRoutes = require('./routes/payment')
const connectToMongo = require('./db');
const path = require('path');
const Razorpay = require('razorpay')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors())

connectToMongo();


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});


app.use('/api/v1/event', eventRouter);
app.use('/api/v1/u', userRouter);
app.get("/images/:imageName", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "images", req.params.imageName));
});
app.post('/api/v1/orders',async(req, res)=>{
  console.log(instance)
      const options = {
          amount: Number(req.body.amount * 100),
          currency: "INR",
      }
  
      const order = await instance.orders.create(options);
      // console.log(order);
      res.json({order})
      
  })
  // app.get('api/v1/getRazorKey',(req,res)=>{
  //   res.json({key:process.env.RAZORPAY_KEY_ID })
  // })





app.listen(5000, () => {
  console.log('Server listening on port 5000');
});



module.exports = {instance}