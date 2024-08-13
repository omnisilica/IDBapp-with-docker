import React, { useEffect, useState  } from "react";
import {Table,Button} from "react-bootstrap";
//import Button from "react-bootstrap/Button";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./BARequestOverview.css";
const BARequestOverview = () => {
    let navigate = useNavigate();
    return (
        <>

        <p className="title">Business Account Request Overview</p>
            <div>
                
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Reference #</th>
                            <th>Status</th>
                            <th>Request Date</th>
                            <th>Customer Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>000001</td>
                            <td>PENDING FOR APPROVAL</td>
                            <td>2024-03-11</td>
                            <td>John Doe</td>
                            <td><Button variant="primary">View</Button></td>
                        </tr>
                        <tr>
                            <td>000002</td>
                            <td>PENDING FOR APPROVAL</td>
                            <td>2024-03-11</td>
                            <td>William Smith</td>
                            <td><Button variant="primary">View</Button></td>
                        </tr>
                        <tr>
                            <td>000003</td>
                            <td>PENDING FOR APPROVAL</td>
                            <td>2024-03-11</td>
                            <td>William Smith</td>
                            <td><Button variant="primary">View</Button></td>
                        </tr>
                        <tr>
                            <td>000004</td>
                            <td>APPROVED</td>
                            <td>2024-03-04</td>
                            <td>William Smith</td>
                            <td><Button variant="primary">View</Button></td>
                        </tr>
                        <tr>
                            <td>000005</td>
                            <td>REJECTED</td>
                            <td>2024-03-03</td>
                            <td>John Doe</td>
                            <td><Button variant="primary">View</Button></td>
                        </tr>
            
                    
                    </tbody>
                </Table> 

                <div className="button-container">
                <Button variant="primary">Prev</Button>
                <div className="space"></div>
                <Button variant="primary">Next</Button>
                </div>
            </div>
        </>
    )
}


export default BARequestOverview;