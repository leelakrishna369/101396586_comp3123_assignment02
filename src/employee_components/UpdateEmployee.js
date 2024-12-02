import 'bulma/css/bulma.min.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

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
    return <p>Loading employee details...</p>;
  }

  if (error) {
    return <p className="notification is-danger">{error}</p>;
  }

  if (!updateEmployee) {
    return <p>No employee data available.</p>;
  }

  return (
    <div className="container is-max-desktop mt-5">
      <div className="box">
        <h2 className="title is-4 has-text-centered">Update Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="first_name" className="label">
              First Name:
            </label>
            <div className="control">
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={updateEmployee.first_name || ''}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="last_name" className="label">
              Last Name:
            </label>
            <div className="control">
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={updateEmployee.last_name || ''}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <div className="control">
              <input
                id="email"
                type="email"
                name="email"
                value={updateEmployee.email || ''}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="position" className="label">
              Position:
            </label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  id="position"
                  name="position"
                  value={updateEmployee.position || ''}
                  onChange={handleChange}
                  required
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="salary" className="label">
              Salary:
            </label>
            <div className="control">
              <input
                id="salary"
                type="number"
                name="salary"
                value={updateEmployee.salary || ''}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="department" className="label">
              Department:
            </label>
            <div className="control">
              <input
                id="department"
                type="text"
                name="department"
                value={updateEmployee.department || ''}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className="buttons is-centered">
            <button type="submit" className="button is-primary">
              Update Employee
            </button>
            <button
              type="button"
              onClick={() => navigate('/employeelist')}
              className="button is-light"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
