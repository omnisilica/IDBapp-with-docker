const mongoose=require('mongoose');

const Schema=mongoose.Schema;


const employeeSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    DOB:{
        type:Date,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    role_id: {
        type:  Number,
        required: true,
        ref: 'Role'
      
    }
})

module.exports=mongoose.model("Employee",employeeSchema);