const mongoose=require("mongoose")
const data=require("./sample.js")
require("dotenv").config()
const Db_url=process.env.DB_URL + process.env.DATABASE

mongoose.connect(Db_url)
// mongoose.connect('mongodb+srv://shubhamrathod267:shubham123@cluster0.ewazkx5.mongodb.net/insta_clone?retryWrites=true&w=majority')
.then(res=>{
    console.log(`connected to database ${process.env.DATABASE}`)
})
.catch(res=>{
    console.log(res)
})

const createSchema=new mongoose.Schema({
    name:{type:String},
    location:{type:String},
    likes:{type:Number},
    description:{type:String},
    PostImage:{type:String},
   
    date:{type:Date,default:Date.now().toLocaleString()
    
    }
})
const dbModel=mongoose.model("upi-data",createSchema)

// for(let x=0;x<data.length;x++)
// {
//     let doc1=new dbModel({
//         name:data[x].name,
//         location:data[x].location,
//         likes:data[x].likes,
//         description: data[x].description,
//         PostImage: data[x].PostImage,
//         date:data[x].date
//     })
//     doc1.save();
// }


module.exports=dbModel
