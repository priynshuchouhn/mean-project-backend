import express from "express";
import Post from "./models/post.js";



const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT,  PATCH, OPTION");
    next();
})

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body['title'],
        content: req.body['content']
    });
    post.save().then((post) => {
        res.status(200).json({
            message: 'Post Added successfully',
            data: post,
            success: true
        })
    }).catch((e) => {
        res.status(404).json({
            message: 'Post Added Failed',
            data: e,
            success: false
        })
    });

})


app.get('/api/posts', (req, res, next) => {
    Post.find().then((documents)=>{
        res.status(200).json({
            message: 'Post fetched successfully',
            data: documents,
            success: true
        })
    }).catch(()=>{
        res.status(404).json({
            message: 'Could not fetch Post',
            data: [],
            success: false
        })
    })
});

app.delete('/api/posts/:id', (req,res,next)=>{
    Post.deleteOne({_id: req.params.id}).then(()=>{
        res.status(200).json({
            message: 'Post Deleted successfully',
            data: [],
            success: true
        })
    }).catch(()=>{
        res.status(404).json({
            message: 'Post Deletion Failed',
            data: [],
            success: false
        })

    })

})


export default app;