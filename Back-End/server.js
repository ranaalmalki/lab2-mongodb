import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import router from "./routers/userRouter.js";
import jwt from 'jsonwebtoken';
import Book from './models/book.js';
dotenv.config()
const app = express()
app.use(express.json());

main().catch(err => console.log(err));


async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    
  console.log("database///////////////");
  
  }

  //reegister


function authenticateToken(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    })

}
app.use('/api/user',authenticateToken, router);



//login



app.get("/addBook",(req,res)=>{
    Book.find()
    .then((result)=>{
        res.send(result)
    })

})

app.patch("/addBook/:id",(req,res)=>{
const {id}=req.params
Book.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
.then((result)=>{
    res.send(result)
})
})


app.delete("/addBook/:id",(req,res)=>{
    const {id}=req.params
    Book.findByIdAndDelete(id,req.body,{new:true,runValidators:true})
    .then((result)=>{
        res.send(result)
    })
    })

    app.get("/addBook/:id",(req,res)=>{
        const {id} = req.params
        Book.findById(id)
        .then((result)=>{
            res.send(result)
        })
        
        })

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

    
})