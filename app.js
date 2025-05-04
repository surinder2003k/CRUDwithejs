const express = require('express')
const app = express()
const path = require('path')
const userModel =require('./models/userModel')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/', async (req,res)=>{
    const createuser =await userModel.create({
        name:req.body.name,
        email:req.body.email,
        imgurl:req.body.imgurl
    })
    res.redirect('/read')
})
app.get('/read', async (req,res)=>{
    const users = await userModel.find()
        res.render('read',{users})
})
app.get('/delete/:userid', async (req,res)=>{
    await userModel.findOneAndDelete({_id:req.params.userid})
    res.redirect('/read')
})
app.get('/update/:userid', async (req,res)=>{
    const edituser = await userModel.findOne({_id:req.params.userid})
        res.render('edit',{user:edituser})
})
app.post('/update/:userid', async (req,res)=>{
    const {newname,newemail,newimgurl}=req.body
    const edituser = await userModel.findOneAndUpdate({_id:req.params.userid},{
        name:newname,
        email:newemail,
        imgurl:newimgurl
    },{new:true})
    res.redirect('/read')
    console.log(edituser)
})
    
    
    

app.listen(3000)