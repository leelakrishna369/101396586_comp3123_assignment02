import 'bulma/css/bulma.min.css'; 
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient';

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

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const handleInputChange = debounce((e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    }, 300);

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
        <div className="container mt-4">
            <div className="columns">
                <div className="column is-half">
                    <button className="button is-primary" onClick={handleAddButton}>
                        Add Employee
                    </button>
                </div>
                <div className="column is-half has-text-right">
                    <button className="button is-light" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <form onSubmit={handleSearch} className="box mt-4">
                <div className="columns">
                    <div className="column">
                        <label className="label">Department</label>
                        <input
                            type="text"
                            name="department"
                            defaultValue={searchParams.department}
                            onChange={handleInputChange}
                            className="input"
                        />
                    </div>
                    <div className="column">
                        <label className="label">Position</label>
                        <div className="select is-fullwidth">
                            <select
                                name="position"
                                defaultValue={searchParams.position}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Position</option>
                                {positions.map((pos) => (
                                    <option key={pos} value={pos}>
                                        {pos}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="column is-narrow">
                        <button type="submit" className="button is-primary is-fullwidth">
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={handleRefresh}
                            className="button is-light is-fullwidth mt-2"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>

            {error && <p className="notification is-danger">{error}</p>}
            {loading && <p className="notification is-info">Loading...</p>}

            <h2 className="title is-4">Employee Dashboard</h2>

            {employeelist.length === 0 && !loading && (
                <p className="has-text-centered">No employees found. Try refreshing or updating your search criteria.</p>
            )}

            {employeelist.length > 0 && (
                <table className="table is-fullwidth is-striped">
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
                                        className="button is-small is-info"
                                        onClick={() => handleView(employee._id)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="button is-small is-warning mx-2"
                                        onClick={() => handleUpdate(employee._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="button is-small is-danger"
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
