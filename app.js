import express from "express";
import path from 'path'
import postRouter from "./routes/posts.js";




const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join('uploads')));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT,  PATCH, OPTION");
    next();
})

app.use("/api/posts",postRouter)



export default app;