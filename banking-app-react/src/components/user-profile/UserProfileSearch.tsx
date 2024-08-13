import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfileSearch: React.FC = () => {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/userProfile/${email}`);
    };

    return (
        <div className="container">
            <div className="form-group">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="form-control"
                />
                <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
            </div>

            {user && (
                <div className="mt-4">
                    <h2>User Profile</h2>
                    <p className="lead">Email: {user.email}</p>
                    {/* Display other user information here */}
                </div>
            )}
        </div>
    );
};

export default UserProfileSearch;
