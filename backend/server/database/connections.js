const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    }).then((con)=>{
        console.log(`Mongo DB Connected: ${con.connection.host}`);
    })
}

module.exports = connectDB