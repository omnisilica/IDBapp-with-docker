import { Address } from "./Address";
import { getAddress } from "../services/apiAddress";

export interface EmployeeProfile {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    role_id: Number;
}

export function digestEmployeeProfile (response) : EmployeeProfile {
    return {
        id:                 response.employee.id,
        username:           response.employee.username,
        firstName:          response.employee.firstName,
        lastName:           response.employee.lastName,
        password:           response.employee.password,
        confirmPassword:    response.employee.confirmPassword,
        email:              response.employee.email,
        dateOfBirth:        response.employee.dateOfBirth,
        phoneNumber:        response.employee.phoneNumber,
        role_id:            response.employee.role_id,
    };
}
