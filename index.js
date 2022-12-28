require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors')
const eventRouter = require('./routes/event')
const userRouter = require('./routes/user')
const paymentRouter = require('./routes/payment')
const connectToMongo = require('./db');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors())

connectToMongo();

app.use('/api/v1/event', eventRouter);
app.use('/api/v1/u', userRouter);
app.get("/images/:imageName", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "images", req.params.imageName));
});




// Razorpay Payment
app.use("/payment", require("./routes/payment"));

app.post('/orders', (req, res) => {
  res.send({
    "amount": 20000,
    "currency": "INR",
    "orderid": "rtadsqsf"
  });
});

app.post('/success', (req, res) => {
  console.log(req.body);
  res.send(req.body)
})




app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
