const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0/try').then(()=>{
    console.log('db conneted')
}).catch(()=>{
    console.log('error in db')
})

const useSchema = new mongoose.Schema({
    name:String,
    email:String,
    imgurl:String
})

const userModel = mongoose.model('userdata',useSchema)
module.exports = userModel