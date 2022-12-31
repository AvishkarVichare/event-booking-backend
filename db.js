const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log("connected")
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectToMongo;       