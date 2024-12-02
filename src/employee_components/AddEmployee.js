import React, { useState } from 'react';
import apiClient from '../apiClient';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css'; // Import custom CSS

export const AddEmployee = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('Employee');
  const [salary, setSalary] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [department, setDepartment] = useState('');
  const [success, setSuccess] = useState(null);

  const positions = ['HR', 'Manager', 'Employee', 'Intern'];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const employeeData = {
      first_name: firstname,
      last_name: lastname,
      email,
      position,
      salary,
      date_of_joining: dateOfJoining,
      department,
    };

    try {
      const token = localStorage.getItem('token');
      await apiClient.post('/api/v1/emp/employees', employeeData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFirstname('');
      setLastname('');
      setEmail('');
      setPosition('Employee');
      setSalary('');
      setDateOfJoining('');
      setDepartment('');
      setSuccess('Employee added successfully!');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="add-employee-container">
      <h2 className="add-employee-title">Add Employee</h2>

      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit} className="add-employee-form">
        <div className="form-group">
          <label htmlFor="firstname" className="form-label">First Name:</label>
          <input
            type="text"
            id="firstname"
            className="form-input"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname" className="form-label">Last Name:</label>
          <input
            type="text"
            id="lastname"
            className="form-input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="position" className="form-label">Position:</label>
          <select
            id="position"
            className="form-select"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          >
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="salary" className="form-label">Salary:</label>
          <input
            type="number"
            id="salary"
            className="form-input"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfJoining" className="form-label">Date of Joining:</label>
          <input
            type="date"
            id="dateOfJoining"
            className="form-input"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department" className="form-label">Department:</label>
          <input
            type="text"
            id="department"
            className="form-input"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="primary-button">
            Add Employee
          </button>
          <button type="button" onClick={handleCancel} className="secondary-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
