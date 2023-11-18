import express from "express";
import Post from "../models/post.js";


const postRouter = express.Router();

postRouter.post('', (req, res, next) => {
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
            data: req.body,
            success: false
        })
    });

})


postRouter.get('', (req, res, next) => {
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

postRouter.delete('/:id', (req,res,next)=>{
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

export default postRouter;
