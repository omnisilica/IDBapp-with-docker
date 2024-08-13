import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";

import "./AdminDashboard.css";
import AdminDashboardEmployeeTable from "./AdminDashboardEmployeeTable";
import { CloseButton } from "./CloseButton";
import { useLocation, useNavigate } from "react-router-dom";

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
  roles: {
    role: {
      id: string;
      name: string;
    };
    permissions: [];
  }[];
}

interface viewOption {
  active: boolean;
  label: string;
  description: string;
  viewName: string;
}

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const registrationStatus = location.state?.registrationStatus;
  const [employees, setEmployees] = useState<employee[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const MAX_PAGINATION: number = 10;
  const [currView, setCurrView] = useState<string>("usersEmployees");
  const [viewOptions, setViewOptions] = useState<viewOption[]>([
    {
      active: true,
      label: "Users/Employees",
      description:
        "Create, update or delete employee. Manage user access privileges and roles.",
      viewName: "usersEmployees",
    },
    {
      active: false,
      label: "Request Management",
      description:
        "Process requests",
      viewName: "accessPermissions",
    },
    {
      active: false,
      label: "Fraud",
      description:
        "Investigate and resolve fraudulent transactions. reissue debit cards",
      viewName: "fraud",
    },
    {
      active: false,
      label: "Reporting",
      description:
        "Generate reports on account activities, request bank statements",
      viewName: "reporting",
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminLoggedInCheck = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!adminLoggedInCheck || adminLoggedInCheck.role_id != 2) {
      navigate("/login-employee");
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
  };

  const getEmployeeData = async (
    token: string | null
  ): Promise<void | employee[]> => {
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
      });
  };

  const getRoleData = async (token: string | null): Promise<void | roles> => {
    const bearer: string = "Bearer " + token;
    return apiClient
      .get<roleRequestData>("/roles", {
        headers: {
          Authorization: bearer,
        },
      })
      .then((res) => {
        const roleRefData = res.data;
        const roleDataContainer: roles = {};
        for (let r of roleRefData.roles) {
          roleDataContainer[parseInt(r.role.id)] = r.role.name;
        }
        return roleDataContainer;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setEmployeeRoles = (
    employeeData: void | employee[],
    roleData: void | roles
  ): void => {
    if (
      typeof employeeData !== "undefined" &&
      typeof roleData !== "undefined"
    ) {
      for (let employee of employeeData) {
        employee["role"] = roleData[employee.role_id];
      }

      setEmployees(employeeData);
    }
  };

  const setPage = (pageNumber: number): void => {
    setCurrPage(pageNumber);
  };

  const setDisplay = (view: string): void => {
    const updatedOptions = viewOptions.map((option) => ({
      ...option,
      active: option.viewName === view,
    }));
    setViewOptions(updatedOptions);
    setCurrView(view);
  };

  const [show, setShow] = useState(true);
  const [error, setError] = useState("");

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 5000); // After 5 seconds set the show value to false
    return () => {
      clearTimeout(timeId);
    };
  }, [error]);

  return (
    <>
      <div className="adminDashboardNav">
        <div className="col-12 text-center">
          <h1><b>Admin Dashboard</b></h1>
        </div>
      </div>

      <div className="accountDiv adminContainer">
        {registrationStatus && show && (
          <div className="custom-div-alert">
            <div className="alert alert-success" role="alert">
              <span className="custom-div-alert-message">
                <strong>Registration Successful!</strong>
              </span>
              <CloseButton />
            </div>
          </div>
        )}

        <div className="col-12 adminContainer">
          <div className="employeeTable">
            {currView === "usersEmployees" && (
              <AdminDashboardEmployeeTable
                elements={employees}
                setPage={(pageNumber: number) => setPage(pageNumber)}
                maxPagination={MAX_PAGINATION}
                currPage={currPage}
              />
            )}
            {currView === "accessPermissions" && (
              <h1>Access/Permissions Placeholder</h1>
            )}
            {currView === "fraud" && <h1>Fraud Placeholder</h1>}
            {currView === "reporting" && <h1>Reporting Placeholder</h1>}
          </div>

          <div className="radioBox">
            <div className="card border shadow bg-white mb-2 px-2 py-3 radioContainer">
              {viewOptions &&
                viewOptions.map((v) => {
                  return (
                    <div key={viewOptions.indexOf(v)}>
                      <div className="adminDashboardRadio mb-1">
                        <input
                          onChange={() => setDisplay(v.viewName)}
                          className="m-0"
                          type="radio"
                          id="usersEmployees"
                          checked={v.active}
                        />
                        <label className="m-0 ms-1" htmlFor="usersEmployees">
                          {v.label}
                        </label>
                      </div>
                      <p className="ms-1">{v.description}</p>
                    </div>
                  );
                })}
            </div>
            {/* <div className="card border shadow bg-white mb-2 py-3 px-2">
              <h6 className="card-subtitle mb-2 text-body-secondary text-decoration-underline">
                External Links
              </h6>
              <div className="ms-1 externalLinkContainer">
                <a
                  href="https://www.google.com"
                  className="card-link ms-0"
                  target="_blank"
                >
                  Google
                </a>
                <a
                  href="https://www.yahoo.com"
                  className="card-link ms-0"
                  target="_blank"
                >
                  Yahoo
                </a>
                <a
                  href="https://www.microsoft.com"
                  className="card-link ms-0"
                  target="_blank"
                >
                  Microsoft
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
