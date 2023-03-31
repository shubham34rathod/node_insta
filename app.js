const express=require("express")
const app=express();
const dbModel=require("./db/db.js")
const multer=require("multer")
const {GridFsStorage}=require("multer-gridfs-storage")
const {GridFSBucket,MongoClient}=require("mongodb")
require("dotenv").config()

let cors=require("cors");
const { Schema } = require("mongoose");
const data = require("./db/sample.js");
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const client=new MongoClient(process.env.DB_URL)

app.get("/postdata/:file",async(req,res)=>{
    console.log(req.file)
    try{
         await client.connect()
         const database=client.db(process.env.DATABASE)
         const photobucket=new GridFSBucket(database,
            {bucketName:process.env.PHOTOCOLLECTION})

            const event=photobucket.openDownloadStreamByName(req.params.file)
            event.on("data",(g)=>{
                return res.write(g)
            })
            event.on("error",(g)=>{
                return res.status(400).send(g)
            })
            event.on("end",(g)=>{
                return res.end()

            })

    }
    catch(e){
        res.send(e)
    }
})

const Storage=new GridFsStorage({
    url:process.env.DB_URL + process.env.DATABASE,
    file:(req,file)=>{
        // console.log(file)
        return {
            bucketName:process.env.PHOTOCOLLECTION,
            fileName:`${Date.now()}_${file.originalname}`
        }
    }
})
// console.log(Storage)
const upload=multer({
    storage:Storage
})


app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("/postdata",async(req,res)=>{
    try{
  let data=await dbModel.find({})
  res.send(data)
    }
    catch(e){
        res.send(e)
    }
})

app.post("/postdata",upload.single("PostImage"),async(req,res)=>{
    try{
    //  console.log(req.body)
    //  const createschema= await new dbModel({
    //     name:req.body.name,
    //     location:req.body.location,
    //     likes:req.body.likes,
    //     description:req.body.description,
    //     PostImage:req.file.filename,
    //     date:req.body.date

    //  })
     
    //  const data= await createschema.save()
    //  res.send(data)

    // console.log(req.body);
    console.log(req.body.name);
    }
    catch(e)
    {
        res.send(e)
    }
})

app.listen(8000,()=>{
    console.log("connected to port 8000")
})