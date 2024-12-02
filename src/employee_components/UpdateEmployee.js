import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import './UpdateEmployee.css'; // Custom CSS

export const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateEmployee, setUpdateEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const positions = ['HR', 'Manager', 'Employee', 'Intern'];

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await apiClient.get(`/api/v1/emp/employees/${id}`);
        setUpdateEmployee(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authentication token is missing. Please log in again.');
        return;
      }

      await apiClient.put(`/api/v1/emp/employees/${id}`, updateEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Employee updated successfully!');
      navigate('/employeelist');
    } catch (err) {
      alert('Failed to update employee. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateEmployee((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <p className="loading-message">Loading employee details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!updateEmployee) {
    return <p className="no-data-message">No employee data available.</p>;
  }

  return (
    <div className="update-employee-container">
      <div className="update-employee-box">
        <h2 className="update-employee-title">Update Employee</h2>
        <form onSubmit={handleSubmit} className="update-employee-form">
          <div className="form-field">
            <label htmlFor="first_name" className="form-label">
              First Name:
            </label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              value={updateEmployee.first_name || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="last_name" className="form-label">
              Last Name:
            </label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              value={updateEmployee.last_name || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={updateEmployee.email || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <select
              id="position"
              name="position"
              value={updateEmployee.position || ''}
              onChange={handleChange}
              className="form-select"
              required
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="salary" className="form-label">
              Salary:
            </label>
            <input
              id="salary"
              type="number"
              name="salary"
              value={updateEmployee.salary || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="department" className="form-label">
              Department:
            </label>
            <input
              id="department"
              type="text"
              name="department"
              value={updateEmployee.department || ''}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="primary-button">
              Update Employee
            </button>
            <button
              type="button"
              onClick={() => navigate('/employeelist')}
              className="secondary-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
