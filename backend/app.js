const express=require('express');
const bodyParser=require('body-parser');
const Post =require('./models/post');
const mongoose=require('mongoose');
const app=express();


app.use(bodyParser.json());
mongoose.connect("mongodb+srv://RafiGooty:WyxbdBZnNqfCxL4i@cluster0-fl562.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
  console.log('connected to database!');
})
.catch((err)=>{
  console.log(err,'connection failed!');
})


app.use((req,res,next)=>{

res.setHeader("Access-Control-Allow-Origin","*");
res.setHeader("Access-Control-Allow-Headers","origin,X-Requested-with,Content-Type,Accept");
res.setHeader("Access-Control-Allow-Methods","GET,POST,PATH,DELETE,OPTION,PUT");
  next();
})

app.post('/apps/data',(req,res,next)=>{
  //const post=  req.body;
  const post= new Post({
    title:req.body.title,
    content:req.body.content
  })
  console.log(post);
  res.status(201).json({
    message:'post added successfully'
  })
})

app.use((req,res,next)=>{
  console.log('First middle ware');
  next();
});

app.use('/apps/data', (req,res,next)=>{
  const post={
    title:"rafi",
    content:"basha"
  };
  res.status(200).json({
    message:"this is successfull",
    posts:[post]
  })

});

module.exports=app;
