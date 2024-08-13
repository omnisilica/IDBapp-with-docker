import { Address } from "./Address";
import { getAddress } from "../services/apiAddress";

export interface UserProfile {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: Address;
    income_type: string;
    income_amount: number;
}

export function digestUserProfile (response) : UserProfile {
    return {
        id:             response.customer.id || response.customer._id,
        username:       response.customer.username,
        firstName:      response.customer.firstName,
        lastName:       response.customer.lastName,
        email:          response.customer.email,
        dateOfBirth:    response.customer.dateOfBirth,
        phoneNumber:    response.customer.phoneNumber,
        address:        response.address || response.customer.address,
        income_type:    response.customer.income_type,
        income_amount:    response.customer.income_amount,
    };
}