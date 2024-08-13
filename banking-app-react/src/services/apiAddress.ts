import { getToken } from "../Utility";
import apiClient from "./api-client";

export function getAddress(addressId) {
    return apiClient
    	.get(`/addresses/${addressId}`, { headers: { Authorization: "Bearer " + getToken() } })
    	.then((response) => response.data.address);
}