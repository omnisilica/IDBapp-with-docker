import { getToken } from "../Utility";
import apiClient from "./api-client";

export function getAccountBalance(accountNumber) {
    return apiClient
    	.get(`/accounts/balance/${accountNumber}`, { headers: { Authorization: "Bearer " + getToken() } })
    	.then((response) => response.data.balance);
}