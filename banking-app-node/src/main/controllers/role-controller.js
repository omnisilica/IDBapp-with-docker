const RoleService=require('../services/role-service');
const express=require('express');
const router=express.Router();

class RoleController{
    async addRole(req,res){
        try{
            const role=await RoleService.addRole(req.body);
            res.status(200).json(role);
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    }

    async deleteRole(req,res){
        try{
            const role=await RoleService.deleteRole(req.body.role_id);
            res.status(200).json(role);
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    }

    async test(req,res){
        res.status(200).json({message:"It is here"});
    }
}
const roleController=new RoleController();

router.post('/add-role',roleController.addRole);
router.delete('/delete-role',roleController.deleteRole);
router.get('/',roleController.test);

module.exports=router;