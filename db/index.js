const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const initializeDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABSE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true  
        })
        console.log('DB connected successfully.')
    }catch(error){
        console.log('Error connecting db.')
    }
}

module.exports = {initializeDB};