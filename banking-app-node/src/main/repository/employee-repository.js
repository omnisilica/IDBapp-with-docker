const Employee=require('../model/employee-model');

class EmployeeRepository{

//this is to create a new employee 
async addEmployee(EmployeeData) {
    const newEmployee = new Employee(EmployeeData);
    try {
        await newEmployee.save();
        return "Employee has been saved to the Database";
    } catch (error) {
        // Handle the error, possibly logging it and returning a message or throwing it again
        console.error("Error saving the employee:", error);
        throw new Error("Failed to save the employee.");
    }
}

async employeeExists(username) {
    const employeeExist = await Employee.findOne({ username: username });
    if (!employeeExist) {
        return null;
    }
    return employeeExist;
}









}
module.exports=new EmployeeRepository();