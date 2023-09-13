const express = require('express');

const app = express();


app.use('/api/posts',(req,res,next)=>{
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