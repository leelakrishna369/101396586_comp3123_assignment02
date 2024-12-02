import 'bulma/css/bulma.min.css'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient';

export const EmployeeList = () => {
    const [employeelist, setEmployeeList] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({ department: '', position: '' });
    const navigate = useNavigate();

    const positions = ['HR', 'Manager', 'Employee', 'Intern'];

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await apiClient.get('/api/v1/emp/employees', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmployeeList(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await apiClient.delete(`/api/v1/emp/employees/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEmployeeList(employeelist.filter((employee) => employee._id !== id));
            alert('Employee deleted successfully!');
        } catch (err) {
            alert('Failed to delete the employee.');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const query = new URLSearchParams(searchParams).toString();
            const response = await apiClient.get(`/api/v1/emp/emp/search?${query}`);
            setEmployeeList(response.data);
        } catch (err) {
            setError('Failed to search employees.');
        }
    };

    const handleRefresh = async () => {
        try {
            setSearchParams({ department: '', position: '' });
            const response = await apiClient.get('/api/v1/emp/employees');
            setEmployeeList(response.data);
        } catch (error) {
            alert('Failed to refresh employee list.');
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

    const HandleUpdate = (id) => {
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
                            value={searchParams.department}
                            onChange={handleInputChange}
                            className="input"
                        />
                    </div>
                    <div className="column">
                        <label className="label">Position</label>
                        <div className="select is-fullwidth">
                            <select
                                name="position"
                                value={searchParams.position}
                                onChange={handleInputChange}
                            >
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

            <h2 className="title is-4">Employee Dashboard</h2>

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
                                    onClick={() => HandleUpdate(employee._id)}
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
        </div>
    );
};
