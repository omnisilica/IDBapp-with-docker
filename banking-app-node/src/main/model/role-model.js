const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const roleSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    role_id:{
        type:Number,
        requried:true,
        unique:true
    },
    created_at:{
       type: Date,
       default:Date.now,
       requried:true
    }
})

module.exports=mongoose.model("Role",roleSchema)