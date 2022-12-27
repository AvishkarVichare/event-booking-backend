const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectToMongo = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/neww').then(()=>{
    console.log("connectdd")
}).catch((err)=>{
    console.log(err)
})
}

module.exports = connectToMongo;       