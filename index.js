const express = require("express");
const dotenv = require("dotenv");
const { initializeDB } = require("./db");
const { default: mongoose } = require("mongoose");
const { Cache } = require("./db/model.cache");
const { Settings } = require("./db/model.cacheSettings");

dotenv.config();

const app = express();

const PORT = 8080 || process.env.PORT

app.use(express.json());
initializeDB();

/**
 * sample GET endpoint for the application
 */
app.get('/',(req,res)=>{
    res.send('Hi World')
})

/**
 * POST endpoint for setting up cache limit
 */

app.post("/settings/limit", async(req,res)=>{
    const {limit} = req.body;
    if(!limit || limit < 1){
        return res.status(400).json({message:"Invalid cache limit value"})
    }

    let settings = await Settings.findOne();
    if(settings){
        settings.cacheLimit = limit;
        await settings.save();
    }
    else{
        await Settings.create({cacheLimit:limit});
    }

    return res.status(200).json({message: `Cache limit updated to ${limit}`})

})


/**
 * POST endpoint for creating a cache.
 */
app.post('/cache', async(req,res)=>{
    
    const {key, value} = req.body;

    if(!key || !value){
        return res.status(400).json({message:"key and value are required to store cache data"});
    }
    
    const settings = await Settings.findOne();
    const cacheLimit = settings ? settings.cacheLimit : 3;
    const countCachedDoc = await Cache.countDocuments();

    if(countCachedDoc>=cacheLimit){
        return res.status(400).json({message:"Max size hit, can't store more cache"});
    }
    
    const existingCache = await Cache.findOne({key});
    if(existingCache){
        return res.status(409).json({message:`this cache with key:'${key}' already exists`});
    }
    
    await Cache.create({key,value});
    return res.status(201).json({message:"Cache created successfully."})

})

/**
 * GET endpoint to get cache by KEY
 */
app.get('/cache/:key', async(req,res)=>{
    const {key} = req.params;
    const cacheEntry = await Cache.findOne({key});
    if(!cacheEntry){
        return res.status(404).json({message:`cache with provided key:${key} doesnot exist`});
    }
    return res.status(200).json({key:cacheEntry.key,value:cacheEntry.value});
})

app.delete('/cache/:key',async(req,res)=>{
    const {key} = req.params;
    const deletedCache = await Cache.findOneAndDelete({key}); 
    if(!deletedCache){
        return res.status(404).json({message:`cache with provided key:'${key}' doesnot exist to delete`});
    }
    return res.status(200).json({message:`cahce with key:'${key}' deleted successfully`});
})

app.listen(PORT,()=>console.log(`app listening on port ${PORT}`))