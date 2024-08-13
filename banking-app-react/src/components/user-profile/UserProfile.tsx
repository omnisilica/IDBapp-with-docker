import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = ({ email }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/customers/${email}`);


                const data = await response.json();
                setUser(data);


            } catch (error) {
                console.error('Error fetching user:', error);

            }
        };

        fetchUser();
    }, [email]);

    if (!user) {
        return (
            <div className="d-flex justify-content-center">


                <div className="spinner-border" role="status">

                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-3">User Profile</h2>

            <h3 className="mb-3">User Information</h3>
            <div className="card">


                <div className="card-body">
                    <p className="card-text">



                        <strong>Username:</strong> {user.username}
                    </p>
                    <p className="card-text">



                        <strong>Email:</strong> {user.email}
                    </p>
                    <p className="card-text">
                        <strong>First Name:</strong> {user.firstName}
                    </p>
                    <p className="card-text">



                        <strong>Last Name:</strong> {user.lastName}
                    </p>
                    <p className="card-text">

                        <strong>Phone Number:</strong> {user.phoneNumber}
                    </p>
                </div>
            </div>

            <div className="mt-5">

                <h3 className="mb-3">Address Information</h3>
                <div className="card">



                    <div className="card-body">
                        <p className="card-text">


                            <strong>Address-One:</strong> {user.address.address_one}
                        </p>
                        <p className="card-text">

                            <strong>Address-Two:</strong> {user.address.address_two}
                        </p>
                        <p className="card-text">

                            <strong>City:</strong> {user.address.city}
                        </p>

                        <p className="card-text">
                            <strong>Province:</strong> {user.address.province}
                        </p>
                        <p className="card-text">

                            <strong>Postal Code:</strong> {user.address.postal_code}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
