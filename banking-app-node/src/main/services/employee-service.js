const bcrypt=require('bcrypt');
const employeeRepository=require('../repository/employee-repository');
const jwt=require('jsonwebtoken')


class EmployeeService{


    async createEmployee(employeeData){
        //check if the employee already exists 
        const employeeExists=await employeeRepository.employeeExists(employeeData.username);
        if(employeeExists){
            throw new Error("employee already exists try logging in");
        }
        else{
            const {password}=employeeData;
            const salt=await bcrypt.genSalt(12);
            const hashPassword=await bcrypt.hash(password,salt);
            employeeData.password=hashPassword
            const createEmployee=await employeeRepository.addEmployee(employeeData);
            return createEmployee;
        }
    }

    async validateUser(username,password){
        const userExist=await employeeRepository.employeeExists(username);
        //now that we got the userback we will validate the password other wise return the problem
        if(!userExist){
            throw new Error("user does not exist");
        }
            const isMatch=await bcrypt.compare(password,userExist.password);

            if(!isMatch){
                throw new Error("Password do not match");
            }

        return userExist;
    }

    generateToken(employee) {
        const token = jwt.sign(
            { userId: employee._id, username: employee.username },
            'your_secret_key', // Replace with environment variable
            { expiresIn: '10 min' }
        );
        return token;
    }
}
module.exports=new EmployeeService();