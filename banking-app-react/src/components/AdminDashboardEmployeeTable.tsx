import React, { useState } from 'react'
import CustomPagination from './CustomPagination'

interface employee {
  id: number
  firstName: string
  lastName: string
  role_id: number
  role: string
  email: string
}
const employeesData: employee[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    role_id: 2,
    role: 'Admin',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    role_id: 3,
    role: 'Teller',
    email: 'jane.smith@example.com',
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Johnson',
    role_id: 2,
    role: 'Admin',
    email: 'emily.johnson@example.com',
  },
  {
    id: 4,
    firstName: 'Michael',
    lastName: 'Brown',
    role_id: 1,
    role: 'Employee',
    email: 'michael.brown@example.com',
  },
  {
    id: 5,
    firstName: 'Chris',
    lastName: 'Davis',
    role_id: 1,
    role: 'Employee',
    email: 'chris.davis@example.com',
  },
  {
    id: 6,
    firstName: 'Jessica',
    lastName: 'Miller',
    role_id: 3,
    role: 'Teller',
    email: 'jessica.miller@example.com',
  },
  {
    id: 7,
    firstName: 'David',
    lastName: 'Wilson',
    role_id: 3,
    role: 'Teller',
    email: 'david.wilson@example.com',
  },
  {
    id: 8,
    firstName: 'Sarah',
    lastName: 'Moore',
    role_id: 2,
    role: 'Admin',
    email: 'sarah.moore@example.com',
  },
  {
    id: 9,
    firstName: 'James',
    lastName: 'Taylor',
    role_id: 1,
    role: 'Employee',
    email: 'james.taylor@example.com',
  },
  {
    id: 10,
    firstName: 'Linda',
    lastName: 'Anderson',
    role_id: 3,
    role: 'Teller',
    email: 'linda.anderson@example.com',
  },
]
interface Props {
  elements: employee[]
  setPage: (pageNumber: number) => void
  maxPagination: number
  currPage: number
}

function AdminDashboardEmployeeTable({
  elements,
  setPage,
  maxPagination,
  currPage,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [employees, setEmployees] = useState<employee[]>(employeesData)

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <>
      <div
        className='topBar'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          marginTop: '20px',
        }}
      >
        <div className='searchBarContainer'>
          <input
            type='text'
            className='searchBar'
            placeholder='Search                       &#128269;'
            style={{ width: '200px' }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <a href='/create-admin-teller' className='btn-outline-light'>
          Create a New Employee User
        </a>
      </div>
      <table className='adminDashboardEmployeeTable table table-bordered m-0'>
        <thead>
          <tr>
            <th scope='col' className='col-1'>
              ID
            </th>
            <th scope='col' className='col-3'>
              First Name
            </th>
            <th scope='col' className='col-3'>
              Last Name
            </th>
            <th scope='col' className='col-3'>
              Email
            </th>
            <th scope='col' className='col-2'>
              Role
            </th>
            <th scope='col' className='col-2'></th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <div className='button-group'>
                <button>Edit</button>
                <button>Deactivate</button>
              </div>
            </tr>
          ))}
          {/* TODO: finish fetch real data from database, and then filter the employee object array */}
          {elements &&
            elements.map((e) => {
              let eIndex: number = elements.indexOf(e)
              if (
                eIndex >= currPage * maxPagination &&
                eIndex < currPage * maxPagination + maxPagination
              ) {
                return (
                  <tr key={e.id}>
                    <td className='col-1'>{e.id}</td>
                    <td className='col-3'>{e.firstName}</td>
                    <td className='col-3'>{e.lastName}</td>
                    <td className='col-3'>{e.email}</td>
                    <td className='col-2'>{e.role}</td>
                    <td className='col-2'>
                      <button>Edit</button> {/* Edit button */}
                      <button>Deactivate</button> {/* Delete button */}
                    </td>
                  </tr>
                )
              }
            })}
        </tbody>
      </table>
      <CustomPagination
        elements={elements}
        setPage={(pageNumber: number) => setPage(pageNumber)}
        maxPagination={maxPagination}
        currPage={currPage}
      />

      <a href='/home' className='btn-outline-light'>
        Back
      </a>

      {/* <div className="button-group">
        <button>Back</button>
      </div> */}
    </>
  )
}

export default AdminDashboardEmployeeTable
