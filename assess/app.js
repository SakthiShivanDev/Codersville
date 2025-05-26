import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './src/routes/index.js'

dotenv.config()
const port=process.env.PORT||5000

const app=express()
app.use(cors())
app.use(express.json())
app.use('/api',router)
app.get('/',(req,res)=>{
    res.json({success:true,message:"200 OK"})
})

app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(`Server running in ${port}`)
})