import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";

import CustomPagination from "./CustomPagination";
import { useNavigate } from "react-router-dom";

interface employee {
  id: number;
  firstName: string;
  lastName: string;
  role_id: number;
  role: string;
  email: string;
}

interface roles {
  [key: number]: string;
}

// This is the format of the data returned from the
//   backend by the "roles" request.
interface roleRequestData {
  "roles": {
    "role": {
      "id": string;
      "name": string;
    }
    "permissions": [];
  }[]
}

const TellerDashboard = () => {

  const [employees, setEmployees] = useState<employee[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const MAX_PAGINATION: number = 2;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    //this piece of code checks if the they are logged in and their role is teller before accessing this page
    const tellerLoggedInCheck=JSON.parse(localStorage.getItem("loggedInUser"))
    if(!tellerLoggedInCheck||tellerLoggedInCheck.role_id!=3){
      navigate('/login-employee')
    }

    if (token) {
      try {
        fetchData(token);
      } catch (e) {
        console.log("FATAL ERROR: Please log out and try logging back in.");
      }
    }
  }, []);

  const fetchData = async (token: string) => {
    try {
      const employeeData: void | employee[] = await getEmployeeData(token);
      const roleData: void | roles = await getRoleData(token);
      setEmployeeRoles(employeeData, roleData);
    } catch (error) {
      console.log("Unable to fetch data");
    }
  }

  const getEmployeeData = async (token: string | null): Promise<void | employee[]> => {
    const bearer: string = "Bearer " + token;
    return apiClient
      .get<employee[]>("/employees", {
        headers: {
          Authorization: bearer,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getRoleData = async (token: string | null): Promise<void | roles> => {
    const bearer: string = "Bearer " + token;
    return apiClient
      .get<roleRequestData>("/roles", {
        headers: {
          Authorization: bearer,
        },
      })
      .then((res) => {
        const roleRefData = res.data
        const roleDataContainer: roles = {}
        for (let r of roleRefData.roles) {
          roleDataContainer[parseInt(r.role.id)] = r.role.name
        }
        return roleDataContainer;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const setEmployeeRoles = (employeeData: void | employee[], roleData: void | roles): void => {
    if (typeof employeeData !== 'undefined' && typeof roleData !== 'undefined') {

      for (let employee of employeeData) {
        employee["role"] = roleData[employee.role_id];
      }

      setEmployees(employeeData);
    }
  }

  const setPage = (pageNumber: number): void => {
    setCurrPage(pageNumber);
  }

  return (
    <div className="accountDiv">
      <h1 className="row center bold">Teller Dashboard</h1>
      <button className="btn btn-outline-primary mx-2 shadow-sm" onClick={() => navigate("/searchProfile")}>Search Customer</button>
    </div>
  );
};

export default TellerDashboard;
