const Role = require('../model/role-model');

class RoleRepository {
    async addRole(roleData) {
      try{
      const role= new Role(roleData);
      await role.save();
      }
      catch(err){
        console.log(err);
      }
    }

  

    async getRoleByName(role_id) {
       try{
        const role=await Role.findOne({role_id:role_id});
        console.log(role);
        return role;
       }
       catch(err){
            console.log(err);
       }
    }



    async deleteRole(roleId) {
        try {
            return await Role.deleteOne(roleId);
        } catch (error) {
            throw new Error(error);
        }
    }
    async roleExists(role_id){
        try{
            const role=await Role.findOne({role_id:role_id});
            console.log(role);
            return role;
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports = new RoleRepository();