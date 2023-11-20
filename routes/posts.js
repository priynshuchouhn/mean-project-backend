import express from "express";
import Post from "../models/post.js";
import multer from "multer";


const postRouter = express.Router();

const MIME_TYPE_MAP = {
    'image/png' :'png',
    'image/jpeg' :'jpg',
    'image/jpg' :'jpg'
}

const storage =  multer.diskStorage({
    destination: (req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid MIME TYPE");
        if(isValid){
            error = null;
        }
        cb(error, "uploads");
    },
    filename: (req,file,cb)=>{
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, fileName+"-"+Date.now()+"."+ext)
    }

})

// Add New Post
postRouter.post('', multer({storage:storage}).single("image"),(req, res, next) => {
    const url = req.protocol +"://" + req.get('host');
    const post = new Post({
        title: req.body['title'],
        content: req.body['content'],
        imagePath: url +"/uploads/" + req.file.filename
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

// Edit Post
postRouter.post('/edit', multer({storage:storage}).single("image"), (req, res, next) => {
    let imagePath = req.body['image'];
    if(req.file){
        console.log("here")
        const url = req.protocol +"://" + req.get('host');
        imagePath = url +"/uploads/" + req.file.filename
    }
    const id = req.body['_id']; 
    const post = {
        title: req.body['title'],
        content: req.body['content'],
        imagePath: imagePath
    };
    console.log(id);
    Post.findOneAndUpdate({_id: id}, post).then((document) => {
        res.status(200).json({
            message: 'Post Updated successfully',
            data: document,
            success: true
        })
    }).catch((e) => {
        res.status(404).json({
            message: 'Post Updation Failed',
            data: e,
            success: false
        })
    });

})

// Get All Post
postRouter.get('', (req, res, next) => {
    Post.find().then((documents)=>{
        res.status(200).json({
            message: 'All Posts fetched successfully',
            data: documents,
            success: true
        })
    }).catch(()=>{
        res.status(404).json({
            message: 'Could not fetch Posts',
            data: [],
            success: false
        })
    })
});

// Get Post by ID
postRouter.get('/id', (req, res, next) => {
    const { id } = req.query
    Post.findOne({_id: id}).then((document)=>{
        res.status(200).json({
            message: 'Post fetched successfully',
            data: document,
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


// Delete Post by Id
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
