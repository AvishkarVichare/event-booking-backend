require('dotenv').config();
const express = require('express');
const app = express();
const eventRouter = require('./routes/event')
const userRouter = require('./routes/user')
const connectToMongo = require('./db');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}))


connectToMongo();

app.use('/api/v1/event', eventRouter);
app.use('/api/v1/u', userRouter);
app.get("/images/:imageName", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "images", req.params.imageName));
});



app.listen(4000, () => {
  console.log('Server listening on port 3000');
});
