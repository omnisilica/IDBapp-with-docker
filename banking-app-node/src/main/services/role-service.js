const bcrypt=require('bcrypt');
const roleRepository=require('../repository/role-repository');


class RoleService{
async addRole(roleData){
    try{
        const roleExists=await roleRepository.getRoleByName(roleData.role_id);
        if(roleExists){
            throw new Error("Role already exists");
        }
        else{
            const createRole=await roleRepository.addRole(roleData);
            return createRole;
        }
    }
    catch(err){
        console.log(err);
    }
}

async deleteRole(roleId){
    try{
        const deleteRole=await roleRepository.deleteRole(roleId);
        return deleteRole;
    }
    catch(err){
        console.log(err);
    }
}

async roleExists(role_id){
    try{
        const roleExist=await roleRepository.roleExists(role_id);
        return roleExist;
    }
    catch(err){
        console.log(err);
}
}
}

module.exports=new RoleService();