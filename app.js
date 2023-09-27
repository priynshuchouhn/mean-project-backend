const express = require('express');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT,  PATCH, OPTION");
    next();
})

app.post('/api/posts',(req,res,next)=>{
const post = req.body;
console.log(post);
res.status(200).json({
    message : 'Post Added successfully',
    data: post,
    success: true
   })
})


app.get('/api/posts',(req,res,next)=>{
    const posts = [
        {id:1, title: 'First post', content:'Content of first post!'},
        {id:2, title: 'second post', content:'Content of second post!'},
        {id:3, title: 'Third post', content:'Content of third post!'},
    ];
   res.status(200).json({
    message : 'Post fetched successfully',
    data: posts,
    success: true
   })
})
module.exports = app;