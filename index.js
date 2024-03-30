const port = 4000
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(cors())

//mongodb+srv://Sankalp:<password>@nodeprojects.hrkgda2.mongodb.net/
mongoose.connect('mongodb+srv://Sankalp:1234@nodeprojects.hrkgda2.mongodb.net/E-commerce')

//Api Creation
app.get('/',(req,res)=>{
    res.send('Im awake humans')
})

//Image Storage Engine
const  storage = multer.diskStorage({
    destination:'./upload/images', 
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use('/images',express.static('upload/images'))

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        succes:1,
        img_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

app.listen(port,(error)=>{
    if (!error) {
        console.log('Server running');
    }
    else{
        console.log('Error');
    }
})

