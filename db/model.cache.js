const mongoose = require("mongoose");

const cacheSchema = new mongoose.Schema({
    key:{
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true
    }
})

const Cache = mongoose.model("Cache", cacheSchema);

module.exports = {Cache};