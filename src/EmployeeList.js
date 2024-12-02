import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient';
import './EmployeeList.css'; // Custom CSS for EmployeeList

export const EmployeeList = () => {
    const [employeelist, setEmployeeList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({ department: '', position: '' });
    const navigate = useNavigate();

    const positions = ['HR', 'Manager', 'Employee', 'Intern'];

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await apiClient.get('/api/v1/emp/employees', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployeeList(response.data);
                setError(null);
            } catch (error) {
                setError('Failed to fetch employees.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const token = localStorage.getItem('token');
                await apiClient.delete(`/api/v1/emp/employees/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployeeList(employeelist.filter((employee) => employee._id !== id));
                alert('Employee deleted successfully!');
            } catch (err) {
                setError('Failed to delete the employee.');
            }
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const query = new URLSearchParams(searchParams).toString();
            const response = await apiClient.get(`/api/v1/emp/emp/search?${query}`);
            setEmployeeList(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to search employees.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setLoading(true);
        try {
            setSearchParams({ department: '', position: '' });
            const response = await apiClient.get('/api/v1/emp/employees');
            setEmployeeList(response.data);
            setError(null);
        } catch (error) {
            setError('Failed to refresh employee list.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddButton = () => {
        navigate('/employees/AddEmployee');
    };

    const handleView = (id) => {
        navigate(`/employees/${id}`);
    };

    const handleUpdate = (id) => {
        navigate(`/employees/${id}/UpdateEmployee`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="employee-list-container">
            <div className="header">
                <button className="primary-button" onClick={handleAddButton}>
                    Add Employee
                </button>
                <button className="secondary-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <div className="form-group">
                    <label>Department</label>
                    <input
                        type="text"
                        name="department"
                        value={searchParams.department}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Position</label>
                    <select
                        name="position"
                        value={searchParams.position}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="">Select Position</option>
                        {positions.map((pos) => (
                            <option key={pos} value={pos}>
                                {pos}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="primary-button">
                    Search
                </button>
                <button type="button" onClick={handleRefresh} className="secondary-button">
                    Reset
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {loading && <p className="loading-message">Loading...</p>}

            <h2>Employee Dashboard</h2>

            {employeelist.length === 0 && !loading && (
                <p>No employees found. Try refreshing or updating your search criteria.</p>
            )}

            {employeelist.length > 0 && (
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeelist.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button
                                        className="info-button"
                                        onClick={() => handleView(employee._id)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="update-button"
                                        onClick={() => handleUpdate(employee._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
