import express from "express"; //افضل من الريكواير 
import mongoose from "mongoose";
import Book from "./models/book.js";
import dotenv from "dotenv"


dotenv.config()
const app = express()
app.use(express.json());

main().catch(err => console.log(err));


async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    
  console.log("database///////////////");
  
  }



    app.post("/addBook",(req,res)=>{
        const book = new Book({
            Book_title:req.body.Book_title,
            Author: req.body.Author,
            Edition_number: req.body.Edition_number,
            Publisher: req.body.Publisher,
            electronic_version:req.body.electronic_version,
            price: req.body.price,
            languages_supported: req.body.languages_supported || [],
        
            classification:req.body.classification,
          
    })
    book.save()
    .then((result)=>{
res.send(result)
    })
})
    


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

const port = 3000 

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

    
})