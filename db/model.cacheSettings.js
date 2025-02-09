const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    cacheLimit: {type: Number, required: true, default: 3}
});

const Settings = mongoose.model("Settings",settingsSchema);

module.exports = {Settings};