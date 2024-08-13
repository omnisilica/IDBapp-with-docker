const express=require('express');
const employeeService=require('../services/employee-service');
const router=express.Router();
const roleService=require('../services/role-service');

//the url login-employee

class EmployeeController{

async test(req,res){
    res.status(200).json({ message: "It is here"});
}
//this to add the admins and teller into our database
async createEmployee(req,res){
    try{
        const {role_id}=req.body;
        const roleExists=await roleService.roleExists(role_id);
        if(!roleExists){
            throw new Error("Role does not exist");
        }
    
    const user=await employeeService.createEmployee(req.body);
    res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

async loginEmployee(req,res){
    if(req.session && req.session.role=="admin"|| req.session.role=="teller"){
        res.status(400).json({message:`already logged in as ${req.session.role}`})
     }
    try{
        const {username,password}=req.body;
        const userExist=await employeeService.validateUser(username,password);
        const token=employeeService.generateToken(userExist);
        console.log(userExist);
        req.session.user=userExist;
        req.session.isAuthenticated=true;
        req.session.role="admin";
    
        res.status(200).json({employee:userExist,token:token}) ;
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

 
}
const employeeController=new EmployeeController();


router.get("/",employeeController.test);
router.post("/create",employeeController.createEmployee)
router.post('/login-employee',employeeController.loginEmployee)

module.exports=router;